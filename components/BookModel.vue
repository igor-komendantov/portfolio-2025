<script setup lang="ts">

const {
  scene: model,
  animations,
} = await useGLTF("/models/book.glb");

const { actions, mixer } = useAnimations(animations, model);
</script>

<template>
  <primitive :object="model" />
</template>
