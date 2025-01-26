import { Material, Program } from './types';

export function createShaderProgram(
  gl: WebGL2RenderingContext,
  vertexShader: string,
  fragmentShader: string
): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create shader program');

  const vs = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Could not link shader program: ${gl.getProgramInfoLog(program)}`);
  }

  return program;
}

export function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
  keywords?: string[]
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');

  const processedSource = addKeywords(source, keywords);
  gl.shaderSource(shader, processedSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`Could not compile shader: ${gl.getShaderInfoLog(shader)}`);
  }

  return shader;
}

function addKeywords(source: string, keywords?: string[]): string {
  if (!keywords) return source;
  
  const keywordsString = keywords
    .map(keyword => `#define ${keyword}\n`)
    .join('');
  
  return `${keywordsString}${source}`;
}

export class MaterialImpl implements Material {
  gl: WebGL2RenderingContext;
  vertexShader: string;
  fragmentShaderSource: string;
  programs: { [key: number]: Program };
  activeProgram: Program | null;
  uniforms: { [key: string]: WebGLUniformLocation };

  constructor(gl: WebGL2RenderingContext, vertexShader: string, fragmentShaderSource: string) {
    this.gl = gl;
    this.vertexShader = vertexShader;
    this.fragmentShaderSource = fragmentShaderSource;
    this.programs = {};
    this.activeProgram = null;
    this.uniforms = {};
  }

  setKeywords(keywords: string[]): void {
    let hash = 0;
    for (let i = 0; i < keywords.length; i++) {
      hash += hashCode(keywords[i]);
    }

    let program = this.programs[hash];
    if (!program) {
      const glProgram = createShaderProgram(
        this.gl,
        this.vertexShader,
        this.fragmentShaderSource
      );
      program = new ProgramImpl(this.gl, glProgram);
      this.programs[hash] = program;
    }

    if (program === this.activeProgram) return;

    this.uniforms = program.uniforms;
    this.activeProgram = program;
  }

  bind(): void {
    if (this.activeProgram) {
      this.gl.useProgram(this.activeProgram.program);
    }
  }
}

export class ProgramImpl implements Program {
  uniforms: { [key: string]: WebGLUniformLocation };
  program: WebGLProgram;
  gl: WebGL2RenderingContext;

  constructor(gl: WebGL2RenderingContext, program: WebGLProgram) {
    this.gl = gl;
    this.program = program;
    this.uniforms = this.getUniforms();
  }

  private getUniforms(): { [key: string]: WebGLUniformLocation } {
    const uniforms: { [key: string]: WebGLUniformLocation } = {};
    const uniformCount = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORMS);
    
    for (let i = 0; i < uniformCount; i++) {
      const uniformInfo = this.gl.getActiveUniform(this.program, i);
      if (uniformInfo) {
        const location = this.gl.getUniformLocation(this.program, uniformInfo.name);
        if (location) {
          uniforms[uniformInfo.name] = location;
        }
      }
    }
    
    return uniforms;
  }

  bind(): void {
    this.gl.useProgram(this.program);
  }
}

function hashCode(s: string): number {
  if (s.length === 0) return 0;
  
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}