<script setup lang="ts">
const { scene: model, nodes, animations } = await useGLTF("/models/book.glb");

const { actions, mixer } = useAnimations(animations, model);

console.clear()
console.log("Model", model);
console.log("nodes", nodes);
console.log("animations", animations);
</script>

<template>
  <primitive :object="model" />
</template>
