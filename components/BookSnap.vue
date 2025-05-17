<script setup lang="ts">
import type { AnimationClip, AnimationMixer, Object3D, Scene } from "three";

const { mixer } = defineProps<{
  // mesh: Object3D;
  // animations: AnimationClip[];
  // scene: Scene;
  mixer: AnimationMixer;
}>();

const scene = useScene();

const openBook = async () => {
  const turnFirstPage = prepareActionOfOpening(scene.value.gltf.animations, mixer);

  await turnFirstPage();
  scene.value.showNavigation = true
};
</script>

<template>
  <primitive :object="scene.gltf?.nodes.button_rotater" @click="openBook" />
</template>
