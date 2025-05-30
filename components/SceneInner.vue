<script setup lang="ts">
const scene = useScene();
const gltf = await useGLTF("/models/book.glb");
scene.value.gltfStatus = 'ready';

const { mixer } = useAnimations(gltf.animations, gltf.scene);

usePhotoClickHandler(gltf);
usePrepareTurnAnimations(gltf, mixer);
handleLinksOnMeshes(gltf);
</script>

<template>
  <TresPerspectiveCamera :position="[0, 1.2, 0.3]" :look-at="[0, 0, 0]" />
  <LightSources />

  <BookSnap :gltf="gltf" :mixer="mixer" />

  <primitive :object="gltf.scene" />
</template>
