<script setup lang="ts">
import { LoopOnce, type AnimationMixer } from "three";
import { Html, type GLTFResult } from "@tresjs/cientos";

const { mixer, gltf } = defineProps<{
  mixer: AnimationMixer;
  gltf: GLTFResult;
}>();

const scene = useScene();

const isPrevAvailable = computed(() => {
  return scene.value.pageStep !== 0;
});

const turnActions = prepareTurnActions();
console.log(turnActions);
function prepareTurnActions() {
  const rawAnimations = gltf.animations.filter((animation) => {
    return (
      animation.name.includes("Turn list") && animation.name !== "Turn list 1"
    );
  });

  const readyActions = rawAnimations.map((animation) => {
    const action = mixer.clipAction(animation);
    action.setLoop(LoopOnce, 1);
    action.clampWhenFinished = true;

    return action;
  });

  return readyActions;
}
</script>

<template>
  <Html :position="[-1, 0, 0]">
    <transition name="fade">
      <button
        v-show="scene.showNavigation && isPrevAvailable"
        :disabled="!isPrevAvailable"
      >
        <img
          src="https://placehold.co/600x400/EEE/31343C"
          width="100"
          height="100"
        />
      </button>
    </transition>
  </Html>

  <Html :position="[0.9, 0, 0]">
    <transition name="fade">
      <button v-show="scene.showNavigation">
        <img
          src="https://placehold.co/600x400/EEE/31343C"
          width="100"
          height="100"
        />
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
</style>
