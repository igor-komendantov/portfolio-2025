<script setup lang="ts">
const gltf = await useGLTF("/models/book.glb");
const { mixer } = useAnimations(gltf.animations, gltf.scene);

usePhotoClickHandler(gltf);
usePrepareTurnAnimations(gltf, mixer);
useContactsClickHandler(gltf);
</script>

<template>
  <TresPerspectiveCamera :position="[0, 1.2, 0.3]" :look-at="[0, 0, 0]" />
  <LightSources />

  <Suspense>
    <BookSnap :gltf="gltf" :mixer="mixer" />
  </Suspense>

  <Suspense>
    <primitive :object="gltf.scene" />
  </Suspense>
</template>
