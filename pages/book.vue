<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
</script>

<template>
  <TresCanvas clear-color="#DD9D6F" window-size>
    <TresPerspectiveCamera :position="[0, 1.2, 0]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <BookModel />
    </Suspense>
  </TresCanvas>
</template>
