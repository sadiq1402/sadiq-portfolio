import * as THREE from "three";

// three.js cannot parse oklch, so let the browser resolve the token to rgb
export const readToken = (el, name) => {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = getComputedStyle(el).getPropertyValue(name).trim();
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return new THREE.Color(r / 255, g / 255, b / 255);
};
