precision highp float;
precision highp int;
#define HIGH_PRECISION
#define SHADER_VALUE ShaderMaterial

#define GLSLIFY 1
uniform sampler2D _MainTexture;
// uniform sampler2D uTexture;
uniform vec4 resolution;

uniform vec3 _Color;
varying vec2 vUv;
varying vec3 vWPos;

uniform float _Opacity;
uniform float _CameraFadeout;
varying float vDistanceToPlanet;
varying float vDistanceToCamera;

float saturate(float x)
{
  return clamp(x, 0.0, 1.0);
}
vec3 SRGBtoLinear(vec3 srgb) {
    vec3 linOut = pow(srgb.xyz, vec3(2.2));
    return vec3(linOut);
}
vec3 linearToSRGB(vec3 color) {
    return pow(color, vec3(1.0 / 2.2));
}

void main()
{
  vec2 uv = vUv*2.0-vec2(1.0);
  float strength = exp(-5.0*saturate(length(uv)));

  // vec3 col = texture2D(_MainTexture, vUv).rgb;


  // gl_FragColor = vec4(_Color, col.r);
  vec4 ttt = texture2D(uTexture, vUv);
  gl_FragColor = vec4(vUv,0.0,1.0);
}

