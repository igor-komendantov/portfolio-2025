<script setup lang="ts">
import type { GLTFResult } from "@tresjs/cientos";
// const gltf = await useGLTF("/models/book.glb");
const { gltf } = defineProps<{
  gltf: GLTFResult;
}>();
const { button_rotater: bookSnapMesh } = gltf.nodes;
const { mixer } = useAnimations(gltf.animations, gltf.scene);
const scene = useScene();
scene.value.gltf = shallowRef(gltf);
</script>

<template>
  <TresPerspectiveCamera :position="[0, 1.2, 0]" :look-at="[0, 0, 0]" />
  <OrbitControls />
  <LightSources />

  <Suspense>
    <BookSnap :mixer="mixer" />
  </Suspense>

  <Suspense>
    <primitive :object="gltf.scene" />
  </Suspense>

  <!-- <PageNavigation :mixer="mixer" /> -->
</template>
