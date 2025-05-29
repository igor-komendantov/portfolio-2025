<script setup lang="ts">
import type { GLTFResult } from "@tresjs/cientos";
import type { AnimationMixer } from "three";

const { gltf, mixer } = defineProps<{
  gltf: GLTFResult;
  mixer: AnimationMixer;
}>();

const scene = useScene();

const turnFirstPage = prepareActionOfOpening(gltf.animations, mixer);

const openBook = async () => {
  await turnFirstPage();
  scene.value.showNavigation = true;
  scene.value.pageStep = 1;
};

onMounted(async () => {
  await openBook();
  scene.value.pageStep = 8;
});
</script>

<template>
  <primitive :object="gltf.nodes.button_rotater" @click="openBook" />
</template>
