import type { Camera, Raycaster, Vector2 } from "three";

export function setRayFromMouse(
  event: MouseEvent,
  camera: Camera,
  rendererDom: HTMLElement,
  raycaster: Raycaster,
  mouse: Vector2
) {
  const rect = rendererDom.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
}
