import { Material, Program } from '../types';

export function createFBO(
  gl: WebGL2RenderingContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number
) {
  gl.activeTexture(gl.TEXTURE0);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.viewport(0, 0, w, h);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const texelSizeX = 1.0 / w;
  const texelSizeY = 1.0 / h;

  return {
    texture,
    fbo,
    width: w,
    height: h,
    texelSizeX,
    texelSizeY,
    attach(id: number) {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    },
  };
}

export function createDoubleFBO(
  gl: WebGL2RenderingContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number
) {
  let fbo1 = createFBO(gl, w, h, internalFormat, format, type, param);
  let fbo2 = createFBO(gl, w, h, internalFormat, format, type, param);

  return {
    width: w,
    height: h,
    texelSizeX: fbo1.texelSizeX,
    texelSizeY: fbo1.texelSizeY,
    get read() {
      return fbo1;
    },
    set read(value) {
      fbo1 = value;
    },
    get write() {
      return fbo2;
    },
    set write(value) {
      fbo2 = value;
    },
    swap() {
      const temp = fbo1;
      fbo1 = fbo2;
      fbo2 = temp;
    },
  };
}

export function resizeFBO(
  gl: WebGL2RenderingContext,
  target: any,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number,
  baseVertexShader: string,
  copyShader: string,
  Program: any
) {
  const newFBO = createFBO(gl, w, h, internalFormat, format, type, param);
  const program = new Program(gl, baseVertexShader, copyShader);
  program.bind();
  gl.uniform1i(program.uniforms.uTexture, target.attach(0));
  blit(gl, newFBO);
  return newFBO;
}

export function resizeDoubleFBO(
  gl: WebGL2RenderingContext,
  target: any,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number
) {
  if (target.width === w && target.height === h) return target;
  target.read = resizeFBO(gl, target.read, w, h, internalFormat, format, type, param);
  target.write = createFBO(gl, w, h, internalFormat, format, type, param);
  target.width = w;
  target.height = h;
  target.texelSizeX = 1.0 / w;
  target.texelSizeY = 1.0 / h;
  return target;
}

export function blit(gl: WebGL2RenderingContext, target?: any) {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  if (target == null) {
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  } else {
    gl.viewport(0, 0, target.width, target.height);
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
  }
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
}