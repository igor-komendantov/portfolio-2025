<script setup lang="ts">

const { scene: model, nodes, animations } = await useGLTF("/models/book.glb");

const { mixer } = useAnimations(animations, model);

const { button_rotater: lockerMesh, ...restMeshes } = nodes;

const openBook = prepareActionOfOpening(animations, mixer);
</script>

<template>
  <TresCanvas clear-color="#DD9D6F" window-size>
    <TresPerspectiveCamera :position="[0, 1.2, 0]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <LightSources />

    <Suspense>
      <primitive :object="lockerMesh" @click="openBook" />
    </Suspense>

    <Suspense>
      <primitive :object="restMeshes" />
    </Suspense>
    <PageNavigation />
  </TresCanvas>
</template>
