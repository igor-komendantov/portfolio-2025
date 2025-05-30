import type { Vector3 } from "three";

export function rectangleContainsVector3(
  vector: Vector3,
  rectangle: {
    topLeft: { x: number; z: number };
    bottomRight: { x: number; z: number };
  }
) {
  const isVectorInRectangle =
    vector.z >= rectangle.topLeft.z &&
    vector.z <= rectangle.bottomRight.z &&
    vector.x >= rectangle.topLeft.x &&
    vector.x <= rectangle.bottomRight.x;

  return isVectorInRectangle;
}
