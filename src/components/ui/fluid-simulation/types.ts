export interface FluidConfig {
  SIM_RESOLUTION: number;
  DYE_RESOLUTION: number;
  CAPTURE_RESOLUTION: number;
  DENSITY_DISSIPATION: number;
  VELOCITY_DISSIPATION: number;
  PRESSURE: number;
  PRESSURE_ITERATIONS: number;
  CURL: number;
  SPLAT_RADIUS: number;
  SPLAT_FORCE: number;
  SHADING: boolean;
  COLOR_UPDATE_SPEED: number;
  PAUSED: boolean;
  BACK_COLOR: { r: number; g: number; b: number };
  TRANSPARENT: boolean;
  COLORFUL: boolean;
}

export interface Material {
  gl: WebGL2RenderingContext;
  vertexShader: WebGLShader;
  fragmentShaderSource: string;
  programs: { [key: number]: WebGLProgram };
  activeProgram: WebGLProgram | null;
  uniforms: { [key: string]: WebGLUniformLocation };
  setKeywords(keywords: string[]): void;
  bind(): void;
}

export interface Program {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  uniforms: { [key: string]: WebGLUniformLocation };
  bind(): void;
}

export interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: [number, number, number];
}