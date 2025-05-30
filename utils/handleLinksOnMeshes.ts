import type { GLTFResult } from "@tresjs/cientos";
import { type Mesh, Raycaster, Vector2 } from "three";

export function handleLinksOnMeshes(gltf: GLTFResult) {
  const scene = useScene();
  const { camera, renderer } = useTres();
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  const appConfig = useNuxtApp();

  const MESH_WITH_EMAIL_BUTTON = "list_8_mesh";
  const meshWithEmail = gltf.scene.getObjectByName(
    MESH_WITH_EMAIL_BUTTON
  ) as Mesh;

  const MESH_WITH_LINKS = "list_9_mesh";
  const meshWithLinks = gltf.scene.getObjectByName(MESH_WITH_LINKS) as Mesh;

  let handleClick: ((event: MouseEvent) => void) | null = null;

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

      handleClick = (event: MouseEvent) => {
        if (!camera.value || !renderer.value) return;

        // throw a ray from cursor through book
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
          meshWithEmail
        );
        const linksPageIntersection = getPageIntersection(
          raycaster,
          meshWithLinks
        );
        if (emailPageIntersection) {
          const emailPagePoint = meshWithEmail.worldToLocal(
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
            return;
          }
        }

        if (linksPageIntersection) {
          const linksPagePoint = meshWithLinks.worldToLocal(
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

      window.addEventListener("click", handleClick);
    }
  );

  onUnmounted(() => {
    if (handleClick) {
      window.removeEventListener("click", handleClick);
    }
  });
}
