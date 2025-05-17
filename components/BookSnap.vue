<script setup lang="ts">
import type { GLTFResult } from "@tresjs/cientos";
import type { AnimationMixer } from "three";

const { gltf, mixer } = defineProps<{
  gltf: GLTFResult;
  mixer: AnimationMixer;
}>();

const scene = useScene();

const openBook = async () => {
  const turnFirstPage = prepareActionOfOpening(gltf.animations, mixer);

  await turnFirstPage();
  scene.value.showNavigation = true;
};
</script>

<template>
  <primitive :object="gltf.nodes.button_rotater" @click="openBook" />
</template>
