import type { GLTFResult } from "@tresjs/cientos";
import { Raycaster, Vector2 } from "three";

export function handleLinksOnMeshes(gltf: GLTFResult) {
  const scene = useScene();
  const { camera, renderer } = useTres();
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  const appConfig = useNuxtApp();

  const meshesOfPages = getMeshesOfContactPages(gltf);

  let handleClickOnCanvas: ((event: MouseEvent) => void) | null = null;

  function copyEmail() {
    navigator.clipboard.writeText(appConfig.$config.public.email);
    console.log("copied");
  }

  function openLinkedIn() {
    window.open(appConfig.$config.public.linkedIn, "_blank");
  }

  function openGithub() {
    window.open(appConfig.$config.public.github, "_blank");
  }

  watch(
    () => scene.value.pageStep,
    (pageStep) => {
      if (!renderer.value.domElement) {
        throw new Error("Canvas element of Three.js is null");
      }

      const isContactPageOpened = pageStep === 8;

      if (!isContactPageOpened) {
        return;
      }

      handleClickOnCanvas = (event: MouseEvent) => {
        if (!camera.value || !renderer.value) return;

        // Throw a ray from cursor through book
        setRayFromMouse(
          event,
          camera.value,
          renderer.value.domElement,
          raycaster,
          mouse
        );

        /**
         * Check whether ray pierced certain page.
         * Pierced page === clicked page.
         */

        const emailPageIntersection = getPageIntersection(
          raycaster,
          meshesOfPages.emailPageMesh
        );
        if (emailPageIntersection) {
          const emailPagePoint = meshesOfPages.emailPageMesh.worldToLocal(
            // NOTE: i removed method clone() because anyway i will remove this ray after handling a click. Cloning doesn't have sense
            // TODO: remove ray after handling a click
            emailPageIntersection.point
          );

          // email
          const isEmailButtonClicked = rectangleContainsVector3(
            emailPagePoint,
            appConfig.$config.public.linksLocalCoordinates.email
          );

          if (isEmailButtonClicked) {
            copyEmail();
          }
          return;
        }

        const linksPageIntersection = getPageIntersection(
          raycaster,
          meshesOfPages.linksPageMesh
        );

        if (linksPageIntersection) {
          const linksPagePoint = meshesOfPages.linksPageMesh.worldToLocal(
            linksPageIntersection.point
          );

          // linked in
          const isLinkedInClicked = rectangleContainsVector3(
            linksPagePoint,
            appConfig.$config.public.linksLocalCoordinates.linkedIn
          );

          if (isLinkedInClicked) {
            openLinkedIn();
            return;
          }

          // gh
          const isGithubClicked = rectangleContainsVector3(
            linksPagePoint,
            appConfig.$config.public.linksLocalCoordinates.github
          );

          if (isGithubClicked) {
            openGithub();
            return;
          }
        }
      };

      window.addEventListener("click", handleClickOnCanvas);
    }
  );

  onUnmounted(() => {
    if (handleClickOnCanvas) {
      window.removeEventListener("click", handleClickOnCanvas);
    }
  });
}
