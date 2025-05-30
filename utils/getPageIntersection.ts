import type { Object3D, Raycaster } from "three";

export function getPageIntersection(raycaster: Raycaster, pageMesh: Object3D) {
  const intersections = raycaster.intersectObject(pageMesh, true);
  /**
   * Page mesh is flat.
   * This means that intersection can be only once, therefore array should have only 1 element.
   */
  return intersections[0] ?? null;
}
