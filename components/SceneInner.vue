<script setup lang="ts">
const { scene, nodes, animations } = await useGLTF("/models/book.glb");
const { button_rotater: bookSnapMesh } = nodes;
const { mixer } = useAnimations(animations, scene);
</script>

<template>
  <TresPerspectiveCamera :position="[0, 1.2, 0]" :look-at="[0, 0, 0]" />
  <OrbitControls />
  <LightSources />

  <Suspense>
    <BookSnap
      :mesh="bookSnapMesh"
      :animations="animations"
      :scene="scene"
      :mixer="mixer"
    />
  </Suspense>

  <Suspense>
    <primitive :object="scene" />
  </Suspense>

  <PageNavigation :mixer="mixer" />
</template>
