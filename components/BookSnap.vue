<script setup lang="ts">
import type { AnimationClip, Object3D, Scene } from "three";

const { animations, mesh, scene } = defineProps<{
  mesh: Object3D;
  animations: AnimationClip[];
  scene: Scene;
}>();

const { mixer } = useAnimations(animations, scene);
const openBook = prepareActionOfOpening(animations, mixer);
</script>

<template>
  <primitive :object="mesh" @click="openBook" />
</template>
