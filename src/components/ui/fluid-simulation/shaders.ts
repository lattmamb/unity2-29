import type { Material, Program } from './types';

export function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
  keywords: string[] = []
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');

  const defineKeywords = keywords.map(keyword => `#define ${keyword}\n`).join('');
  const shaderSource = defineKeywords + source;

  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`Shader compile error: ${gl.getShaderInfoLog(shader)}`);
  }

  return shader;
}

export function createShaderProgram(
  gl: WebGL2RenderingContext,
  vertexShader: string,
  fragmentShader: string,
  keywords: string[] = []
): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create shader program');

  const vs = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader, keywords);

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`);
  }

  gl.deleteShader(vs);
  gl.deleteShader(fs);

  return program;
}

export class ProgramImpl implements Program {
  program: WebGLProgram;
  uniforms: { [key: string]: WebGLUniformLocation };
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
    const hash = hashCode(keywords.join());
    let program = this.programs[hash];
    
    if (!program) {
      const glProgram = createShaderProgram(
        this.gl,
        this.vertexShader,
        this.fragmentShaderSource,
        keywords
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

function hashCode(s: string): number {
  if (s.length === 0) return 0;
  
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  return hash;
}