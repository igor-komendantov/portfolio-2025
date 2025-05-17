<script setup lang="ts">
import type { AnimationClip, Object3D } from "three";

const { animations, mesh } = defineProps<{
  mesh: Object3D;
  animations: AnimationClip[];
}>();

const scene = useState('scene')
const openBook = prepareActionOfOpening(animations, scene.value.animationMixer);
</script>

<template>
  <primitive :object="mesh" @click="openBook" />
</template>
