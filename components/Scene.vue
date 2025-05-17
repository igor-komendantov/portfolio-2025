<script setup lang="ts">
const { scene, nodes, animations } = await useGLTF("/models/book.glb");
const { button_rotater: bookSnapMesh } = nodes;

</script>

<template>
  <TresCanvas clear-color="#DD9D6F" window-size>
    <InitAnimationMixer :animations="animations" :scene="scene"/>
    <TresPerspectiveCamera :position="[0, 1.2, 0]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <LightSources />

    <Suspense>
      <BookSnap :mesh="bookSnapMesh" :animations="animations"  />
    </Suspense>

    <Suspense>
      <primitive :object="scene" />
    </Suspense>

    <!-- <PageNavigation
      :mesh="bookSnapMesh"
      :animations="animations"
    /> -->
  </TresCanvas>
</template>
