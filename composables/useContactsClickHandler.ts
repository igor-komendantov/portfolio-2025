import type { GLTFResult } from "@tresjs/cientos";
import { Raycaster, Vector2 } from "three";

export function useContactsClickHandler(gltf: GLTFResult) {
  const scene = useScene();
  const { camera, renderer } = useTres();
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  let handleClick: ((event: MouseEvent) => void) | null = null;
  let handleMouseMove: ((event: MouseEvent) => void) | null = null;

  watch(
    () => scene.value.pageStep,
    (step, prevStep) => {
      const mesh = gltf.scene.getObjectByName("list_8_mesh") as Mesh;
      const domEl = renderer.value?.domElement;
      if (!mesh || !domEl) return;

      if (step === 8) {
        handleClick = (event: MouseEvent) => {
          if (!camera.value || !renderer.value) return;

          const rect = domEl.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera.value);
          const intersects = raycaster.intersectObject(mesh, true);
          if (intersects.length > 0) {
            const intersection = intersects[0];
            const localPoint = mesh.worldToLocal(intersection.point.clone());
            // console.log(localPoint);

            if (
              localPoint.z >= 0.037590497299288594 &&
              localPoint.z <= 0.17834934081423326 &&
              localPoint.x >= -0.393928821891629 &&
              localPoint.x <= 0.3698629609054239
            ) {
              navigator.clipboard.writeText("igor.komendantov.deal@gmail.com");
              console.log("copied");
            }
          }
        };

        handleMouseMove = (event: MouseEvent) => {
          if (!camera.value || !renderer.value) return;

          const rect = domEl.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera.value);
          const intersects = raycaster.intersectObject(mesh, true);
          if (intersects.length > 0) {
            const intersection = intersects[0];
            const localPoint = mesh.worldToLocal(intersection.point.clone());

            // if (localPoint.z > 0) {
            //   domEl.style.cursor = "pointer";
            //   return;
            // }
          }
          domEl.style.cursor = "default";
        };

        window.addEventListener("click", handleClick);
        window.addEventListener("mousemove", handleMouseMove);
      } else if (prevStep === 3) {
        if (handleClick) window.removeEventListener("click", handleClick);
        if (handleMouseMove)
          window.removeEventListener("mousemove", handleMouseMove);
        domEl.style.cursor = "default";
        handleClick = null;
        handleMouseMove = null;
      }
    }
  );

  onUnmounted(() => {
    if (handleClick) window.removeEventListener("click", handleClick);
    if (handleMouseMove)
      window.removeEventListener("mousemove", handleMouseMove);
    if (renderer.value?.domElement) {
      renderer.value.domElement.style.cursor = "default";
    }
  });
}
