export interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  attach(id: number): number;
}

export interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap(): void;
}

export function createFBO(
  gl: WebGL2RenderingContext,
  width: number,
  height: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number
): FBO {
  gl.activeTexture(gl.TEXTURE0);

  const texture = gl.createTexture();
  if (!texture) throw new Error('Failed to create texture');
  
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, null);

  const fbo = gl.createFramebuffer();
  if (!fbo) throw new Error('Failed to create framebuffer');
  
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.viewport(0, 0, width, height);
  gl.clear(gl.COLOR_BUFFER_BIT);

  let texId = -1;
  return {
    texture,
    fbo,
    width,
    height,
    attach(id: number) {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    }
  };
}

export function createDoubleFBO(
  gl: WebGL2RenderingContext,
  width: number,
  height: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number
): DoubleFBO {
  let fbo1 = createFBO(gl, width, height, internalFormat, format, type, param);
  let fbo2 = createFBO(gl, width, height, internalFormat, format, type, param);

  return {
    width,
    height,
    texelSizeX: 1.0 / width,
    texelSizeY: 1.0 / height,
    read: fbo1,
    write: fbo2,
    swap() {
      const temp = this.read;
      this.read = this.write;
      this.write = temp;
    }
  };
}

export function resizeDoubleFBO(
  target: DoubleFBO,
  width: number,
  height: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number
): DoubleFBO {
  target.width = width;
  target.height = height;
  target.texelSizeX = 1.0 / width;
  target.texelSizeY = 1.0 / height;

  const gl = target.read.texture.gl as WebGL2RenderingContext;
  gl.deleteFramebuffer(target.read.fbo);
  gl.deleteFramebuffer(target.write.fbo);
  gl.deleteTexture(target.read.texture);
  gl.deleteTexture(target.write.texture);

  return createDoubleFBO(gl, width, height, internalFormat, format, type, param);
}

export function blit(target: WebGLFramebuffer | null) {
  gl.bindFramebuffer(gl.FRAMEBUFFER, target);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}