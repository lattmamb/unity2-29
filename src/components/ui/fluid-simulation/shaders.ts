import { Material, Program } from './types';

export function createShaderProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create shader program');

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
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
  vertexShader: WebGLShader;
  fragmentShaderSource: string;
  programs: { [key: number]: WebGLProgram };
  activeProgram: WebGLProgram | null;
  uniforms: { [key: string]: WebGLUniformLocation };

  constructor(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShaderSource: string) {
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
      const fragmentShader = compileShader(
        this.gl,
        this.gl.FRAGMENT_SHADER,
        this.fragmentShaderSource,
        keywords
      );
      program = createShaderProgram(this.gl, this.vertexShader, fragmentShader);
      this.programs[hash] = program;
    }

    if (program === this.activeProgram) return;

    this.uniforms = getUniforms(this.gl, program);
    this.activeProgram = program;
  }

  bind(): void {
    if (this.activeProgram) {
      this.gl.useProgram(this.activeProgram);
    }
  }
}

export class ProgramImpl implements Program {
  uniforms: { [key: string]: WebGLUniformLocation };
  program: WebGLProgram;
  gl: WebGL2RenderingContext;

  constructor(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    this.gl = gl;
    this.program = createShaderProgram(gl, vertexShader, fragmentShader);
    this.uniforms = getUniforms(gl, this.program);
  }

  bind(): void {
    this.gl.useProgram(this.program);
  }
}

function getUniforms(gl: WebGL2RenderingContext, program: WebGLProgram): { [key: string]: WebGLUniformLocation } {
  const uniforms: { [key: string]: WebGLUniformLocation } = {};
  const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  
  for (let i = 0; i < uniformCount; i++) {
    const uniformInfo = gl.getActiveUniform(program, i);
    if (uniformInfo) {
      const location = gl.getUniformLocation(program, uniformInfo.name);
      if (location) {
        uniforms[uniformInfo.name] = location;
      }
    }
  }
  
  return uniforms;
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