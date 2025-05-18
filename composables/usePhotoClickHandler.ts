import type { GLTFResult } from "@tresjs/cientos";
import { onUnmounted } from "vue";
import { useTres } from "@tresjs/core";
import { Box3, Mesh, Raycaster, Vector2 } from "three";
// TODO: maybe refactor
export function usePhotoClickHandler(gltf: GLTFResult) {
  const scene = useScene();
  const { camera, renderer } = useTres();
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  watch(
    () => scene.value.pageStep,
    (step) => {
      if (step === 3) {
        const mesh = gltf.scene.getObjectByName("list_4_mesh") as Mesh;
        if (!mesh) {
          console.warn("Mesh not found");
          return;
        }

        const domEl = renderer.value?.domElement;
        if (!domEl) return;

        const handleClick = (event: MouseEvent) => {
          if (!camera.value || !renderer.value) return;

          const rect = domEl.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera.value);
          const intersects = raycaster.intersectObject(mesh, true);
          if (intersects.length > 0) {
            const intersection = intersects[0];
            const localPoint = mesh.worldToLocal(intersection.point.clone());

            if (localPoint.z > 0) {
              window.open("https://example.com", "_blank");
            } else {
              return;
            }
          }
        };

        const handleMouseMove = (event: MouseEvent) => {
          if (!camera.value || !renderer.value) return;

          const rect = domEl.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera.value);
          const intersects = raycaster.intersectObject(mesh, true);

          if (intersects.length > 0) {
            const intersection = intersects[0];
            const localPoint = mesh.worldToLocal(intersection.point.clone());

            if (localPoint.z > 0) {
              domEl.style.cursor = "pointer";
              return;
            }
          }
          domEl.style.cursor = "default";
        };

        window.addEventListener("click", handleClick);
        window.addEventListener("mousemove", handleMouseMove);

        onUnmounted(() => {
          window.removeEventListener("click", handleClick);
          window.removeEventListener("mousemove", handleMouseMove);
          domEl.style.cursor = "default";
        });
      }
    }
  );
}
