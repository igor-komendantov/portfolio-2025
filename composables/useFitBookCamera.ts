import { Box3, type Object3D, Vector3, type PerspectiveCamera } from "three";
import { onMounted, onUnmounted, nextTick } from "vue";
import { useTres } from "@tresjs/core";

export function useFitBookCamera(cover: Object3D) {
  const { camera } = useTres();

  const updateCamera = () => {
    const cam = camera.value as PerspectiveCamera;
    if (!cam) return;

    // Получаем размер обложки
    const box = new Box3().setFromObject(cover);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());

    // Удваиваем ширину (по X)
    const fullWidth = size.x * 2.1; // 2.0 — это открытая книга, 0.1 — запас
    const fullHeight = size.y * 1.1; // немного запаса по высоте

    const fov = cam.fov * (Math.PI / 180);
    const aspect = cam.aspect;

    const distanceY = fullHeight / 2 / Math.tan(fov / 2);
    const distanceX = fullWidth / 2 / (aspect * Math.tan(fov / 2));
    const distance = Math.max(distanceX, distanceY);

    // Наклон как у тебя: немного сверху
    const dir = new Vector3(0, 1.2, 0.3).normalize();
    const position = center.clone().add(dir.multiplyScalar(distance));

    cam.position.copy(position);
    cam.lookAt(center);
    cam.updateProjectionMatrix();
  };

  const safeUpdateCamera = () => {
    nextTick(() => {
      requestAnimationFrame(() => {
        updateCamera();
      });
    });
  };

  onMounted(() => {
    window.addEventListener("resize", updateCamera);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateCamera);
  });

  return {
    updateCamera: safeUpdateCamera,
  };
}
