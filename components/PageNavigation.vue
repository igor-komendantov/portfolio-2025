<script setup lang="ts">
import { Html, type GLTFResult } from "@tresjs/cientos";
import { LoopOnce, type AnimationMixer } from "three";

const { mixer, gltf } = defineProps<{
  mixer: AnimationMixer;
  gltf: GLTFResult;
}>();

const scene = useScene();

const isPrevAvailable = ref(false);
const isNextAvailable = ref(true);
const turning = ref(false);

const turnActions = prepareTurnAnimations(gltf.animations, mixer);

function turnNextPage() {
  if (!isNextAvailable.value) {
    throw Error(
      `Action "turnNextPage" should not be called since isNextAvailable is false`
    );
  }
  turning.value = true;

  const indexOfAnimation = scene.value.pageStep - 1;
  const animation = turnActions[indexOfAnimation];


  if (indexOfAnimation < 0 || !animation) {
    throw Error(
      `Error while searching animation. Supposed index: ${indexOfAnimation}.`
    );
  }

  scene.value.pageStep++;

  const onAnimationFinished = (event: any) => {
    if (event.action === animation) {
      mixer.removeEventListener("finished", onAnimationFinished);
      turning.value = false;
    }
  };

  mixer.addEventListener("finished", onAnimationFinished);
  animation.play();
  isPrevAvailable.value = true;

  const isLastActionInArray = turnActions.length - 1 === indexOfAnimation;
  // Truth means there is nothing more to turn in further call of turnNextPage()
  if (isLastActionInArray) {
    isNextAvailable.value = false;
  }
}

function turnPrevPage() {
  if (!isPrevAvailable.value) {
    throw Error(
      `Action "turnPrevPage" should not be called since isPrevAvailable is false`
    );
  }
  turning.value = true;

  const indexOfAnimation = scene.value.pageStep - 2;
  const animation = turnActions[indexOfAnimation];

  if (indexOfAnimation < 0 || !animation) {
    throw Error(
      `Error while searching animation. Supposed index: ${indexOfAnimation}.`
    );
  }

  scene.value.pageStep--;

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
      turning.value = false;
      mixer.removeEventListener("finished", onAnimationFinished);
    }
  };

  mixer.addEventListener("finished", onAnimationFinished);
  animation.play();

  isNextAvailable.value = true;
  if (indexOfAnimation === 0) {
    isPrevAvailable.value = false;
  }
}
</script>

<template>
  <Html :position="[-1, 0, 0.35]">
    <transition name="fade">
      <button
        class="nav-button"
        v-show="scene.showNavigation && isPrevAvailable"
        :disabled="!isPrevAvailable || turning"
        @click="turnPrevPage"
      >
        <img src="/images/button-prev.svg" width="170" />
      </button>
    </transition>
  </Html>

  <Html :position="[0.9, 0, 0.35]">
    <transition name="fade">
      <button
        class="nav-button"
        v-show="scene.showNavigation && isNextAvailable"
        @click="turnNextPage"
        :disabled="!isNextAvailable || turning"
      >
        <img src="/images/button-next.svg" width="170" />
      </button>
    </transition>
  </Html>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.nav-button {
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all ease-in 0.5s;
}
.nav-button:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>
