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
  let handleMouseMoveOnCanvas: ((event: MouseEvent) => void) | null = null;

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
        // Удаляем обработчики, если ушли со страницы
        if (handleClickOnCanvas) {
          window.removeEventListener("click", handleClickOnCanvas);
          handleClickOnCanvas = null;
        }
        if (handleMouseMoveOnCanvas) {
          window.removeEventListener("mousemove", handleMouseMoveOnCanvas);
          handleMouseMoveOnCanvas = null;
        }
        document.body.style.cursor = "default";
        return;
      }

      // Клик
      handleClickOnCanvas = (event: MouseEvent) => {
        if (!camera.value || !renderer.value) return;

        setRayFromMouse(
          event,
          camera.value,
          renderer.value.domElement,
          raycaster,
          mouse
        );

        const emailPageIntersection = getPageIntersection(
          raycaster,
          meshesOfPages.emailPageMesh
        );
        if (emailPageIntersection) {
          const emailPagePoint = meshesOfPages.emailPageMesh.worldToLocal(
            emailPageIntersection.point
          );

          if (
            rectangleContainsVector3(
              emailPagePoint,
              appConfig.$config.public.linksLocalCoordinates.email
            )
          ) {
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

          if (
            rectangleContainsVector3(
              linksPagePoint,
              appConfig.$config.public.linksLocalCoordinates.linkedIn
            )
          ) {
            openLinkedIn();
            return;
          }

          if (
            rectangleContainsVector3(
              linksPagePoint,
              appConfig.$config.public.linksLocalCoordinates.github
            )
          ) {
            openGithub();
            return;
          }
        }
      };

      // Move (для курсора)
      handleMouseMoveOnCanvas = (event: MouseEvent) => {
        if (!camera.value || !renderer.value) return;

        setRayFromMouse(
          event,
          camera.value,
          renderer.value.domElement,
          raycaster,
          mouse
        );

        let pointerNeeded = false;

        const emailPageIntersection = getPageIntersection(
          raycaster,
          meshesOfPages.emailPageMesh
        );
        if (emailPageIntersection) {
          const point = meshesOfPages.emailPageMesh.worldToLocal(
            emailPageIntersection.point
          );

          if (
            rectangleContainsVector3(
              point,
              appConfig.$config.public.linksLocalCoordinates.email
            )
          ) {
            pointerNeeded = true;
          }
        }

        const linksPageIntersection = getPageIntersection(
          raycaster,
          meshesOfPages.linksPageMesh
        );
        if (linksPageIntersection) {
          const point = meshesOfPages.linksPageMesh.worldToLocal(
            linksPageIntersection.point
          );

          if (
            rectangleContainsVector3(
              point,
              appConfig.$config.public.linksLocalCoordinates.linkedIn
            ) ||
            rectangleContainsVector3(
              point,
              appConfig.$config.public.linksLocalCoordinates.github
            )
          ) {
            pointerNeeded = true;
          }
        }

        renderer.value.domElement.style.cursor = pointerNeeded
          ? "pointer"
          : "default";
      };

      window.addEventListener("click", handleClickOnCanvas);
      window.addEventListener("mousemove", handleMouseMoveOnCanvas);
    }
  );

  onUnmounted(() => {
    if (handleClickOnCanvas) {
      window.removeEventListener("click", handleClickOnCanvas);
    }
    if (handleMouseMoveOnCanvas) {
      window.removeEventListener("mousemove", handleMouseMoveOnCanvas);
    }
    document.body.style.cursor = "default";
  });
}
