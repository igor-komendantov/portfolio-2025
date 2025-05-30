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
      const meshWithEmail = gltf.scene.getObjectByName("list_8_mesh") as Mesh;
      const meshWithLinks = gltf.scene.getObjectByName("list_9_mesh") as Mesh;
      const domEl = renderer.value?.domElement;
      if (!meshWithEmail || !domEl) return;

      if (step === 8) {
        handleClick = (event: MouseEvent) => {
          if (!camera.value || !renderer.value) return;

          const rect = domEl.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera.value);
          const emailIntersects = raycaster.intersectObject(
            meshWithEmail,
            true
          );
          const linksIntersects = raycaster.intersectObject(
            meshWithLinks,
            true
          );
          if (emailIntersects.length > 0) {
            const intersection = emailIntersects[0];
            const emailPagePoint = meshWithEmail.worldToLocal(
              intersection.point.clone()
            );

            // email
            if (
              emailPagePoint.z >= 0.037590497299288594 &&
              emailPagePoint.z <= 0.17834934081423326 &&
              emailPagePoint.x >= -0.393928821891629 &&
              emailPagePoint.x <= 0.3698629609054239
            ) {
              navigator.clipboard.writeText("email placeholder");
              console.log("copied");
            }
          }

          if (linksIntersects.length > 0) {
            const intersection = linksIntersects[0];
            const linksPagePoint = meshWithLinks.worldToLocal(
              intersection.point.clone()
            );

            console.log(
              linksPagePoint,
              linksPagePoint.x >= -0.002364559471120631 &&
                linksPagePoint.x <= -0.28894147175055396
            );
            // linked in
            if (
              linksPagePoint.x <= -0.002364559471120631 &&
              linksPagePoint.x >= -0.28894147175055396 &&
              linksPagePoint.z >= -0.06491567554876015 &&
              linksPagePoint.z <= 0.02791815187390262
            ) {
              window.open("https://linkedin.com", "_blank");
            }

            // gh
            if (
              linksPagePoint.z >= 0.15561072674615944 &&
              linksPagePoint.z <= 0.23959869589342925 &&
              linksPagePoint.x <= -0.05359185384468218 &&
              linksPagePoint.x >= -0.2860870724292083
            ) {
              window.open("https://linkedin.com", "_blank");
            }
          }
        };

        handleMouseMove = (event: MouseEvent) => {
          if (!camera.value || !renderer.value) return;

          const rect = domEl.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera.value);
          const intersects = raycaster.intersectObject(meshWithEmail, true);
          if (intersects.length > 0) {
            const intersection = intersects[0];
            const localPoint = meshWithEmail.worldToLocal(
              intersection.point.clone()
            );

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
