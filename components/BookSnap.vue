<script setup lang="ts">
import type { AnimationClip, AnimationMixer, Object3D, Scene } from "three";

const { animations, mesh, mixer } = defineProps<{
  mesh: Object3D;
  animations: AnimationClip[];
  scene: Scene;
  mixer: AnimationMixer;
}>();

const showNavigation = useShowNavigation();

const openBook = async () => {
  const turnFirstPage = prepareActionOfOpening(animations, mixer);

  await turnFirstPage();
  showNavigation.value = true
};
</script>

<template>
  <primitive :object="mesh" @click="openBook" />
</template>
