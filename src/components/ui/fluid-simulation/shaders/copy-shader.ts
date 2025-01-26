export const copyShader = `
  precision highp float;
  precision highp sampler2D;

  varying vec2 vUv;
  uniform sampler2D uTexture;

  void main () {
    gl_FragColor = texture2D(uTexture, vUv);
  }
`;