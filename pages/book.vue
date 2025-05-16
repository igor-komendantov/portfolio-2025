<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
</script>

<template>
    <TresCanvas clear-color="#DD9D6F" window-size>
      <TresPerspectiveCamera :position="[0, 1.2, 0]" :look-at="[0, 0, 0]" />
      <OrbitControls />

      <!-- Light -->
      <TresAmbientLight :intensity="0.7" />

      <TresDirectionalLight :position="[3, 5, 2]" :intensity="2" cast-shadow />
      <TresDirectionalLight :position="[-3, 2, -2]" :intensity="0.8" />
      <TresDirectionalLight :position="[0, 5, -5]" :intensity="0.5" />
      <!-- Light -->

      <Suspense>
        <BookModel />
      </Suspense>
    </TresCanvas>
</template>
