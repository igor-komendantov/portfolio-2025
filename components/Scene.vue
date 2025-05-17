<script setup lang="ts">
const gltf = await useGLTF("/models/book.glb");
</script>

<template>
  <TresCanvas clear-color="#DD9D6F" window-size>
    <Suspense>
      <SceneInner :gltf="gltf" />
    </Suspense>
  </TresCanvas>
</template>
