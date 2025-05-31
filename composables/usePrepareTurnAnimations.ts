import type { GLTFResult } from "@tresjs/cientos";
import { LoopOnce, type AnimationMixer } from "three";

export function usePrepareTurnAnimations(
  gltf: GLTFResult,
  mixer: AnimationMixer
) {
  const scene = useScene();

  const turnActions = prepareTurnAnimations(gltf.animations, mixer);

  function turnNextPage() {
    if (!scene.value.isNextAvailable) {
      throw Error(
        `Action "turnNextPage" should not be called since isNextAvailable is false`
      );
    }
    scene.value.turning = true;

    const indexOfAnimation = scene.value.pageStep - 1;
    const animation = turnActions[indexOfAnimation];

    if (indexOfAnimation < 0 || !animation) {
      throw Error(
        `Error while searching animation. Supposed index: ${indexOfAnimation}.`
      );
    }

    const onAnimationFinished = (event: any) => {
      if (event.action === animation) {
        mixer.removeEventListener("finished", onAnimationFinished);
        scene.value.turning = false;
        scene.value.pageStep++;
      }
    };

    mixer.addEventListener("finished", onAnimationFinished);
    animation.play();

    scene.value.isPrevAvailable = true;

    const isLastActionInArray = turnActions.length - 1 === indexOfAnimation;
    // Truth means there is nothing more to turn in further call of turnNextPage()
    if (isLastActionInArray) {
      scene.value.isNextAvailable = false;
    }
  }

  function turnPrevPage() {
    if (!scene.value.isPrevAvailable) {
      throw Error(
        `Action "turnPrevPage" should not be called since isPrevAvailable is false`
      );
    }
    scene.value.turning = true;

    const indexOfAnimation = scene.value.pageStep - 2;
    const animation = turnActions[indexOfAnimation];

    if (indexOfAnimation < 0 || !animation) {
      throw Error(
        `Error while searching animation. Supposed index: ${indexOfAnimation}.`
      );
    }

    animation.stop();
    animation.setLoop(LoopOnce, 1);
    animation.clampWhenFinished = true;
    animation.timeScale = -1;
    animation.reset();
    animation.time = animation.getClip().duration;

    const onAnimationFinished = (event: any) => {
      if (event.action === animation) {
        animation.stop();
        animation.timeScale = 1;
        animation.reset();
        scene.value.turning = false;
        scene.value.pageStep--;
        mixer.removeEventListener("finished", onAnimationFinished);
      }
    };

    mixer.addEventListener("finished", onAnimationFinished);
    animation.play();

    scene.value.isNextAvailable = true;
    if (indexOfAnimation === 0) {
      scene.value.isPrevAvailable = false;
    }
  }

  scene.value.turnNextPage = turnNextPage;
  scene.value.turnPrevPage = turnPrevPage;
}
