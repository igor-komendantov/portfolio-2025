<script setup lang="ts">
import type { AnimationMixer } from "three";
import { Html, type GLTFResult } from "@tresjs/cientos";

const { mixer, gltf } = defineProps<{
  mixer: AnimationMixer;
  gltf: GLTFResult;
}>();

const scene = useScene();

const isPrevAvailable = computed(() => {
  return scene.value.pageStep !== 0;
});
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
        <h1>{{ isPrevAvailable }}</h1>
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
