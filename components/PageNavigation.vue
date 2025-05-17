<script setup lang="ts">
import type { AnimationMixer } from "three";
import { Html } from "@tresjs/cientos";

const { mixer } = defineProps<{
  mixer: AnimationMixer;
}>();
</script>

<template>
  <Html :position="[-1, 0, 0]">
    <img
      src="https://placehold.co/600x400/EEE/31343C"
      width="100"
      height="100"
    />
  </Html>

  <Html :position="[0.9, 0, 0]">
    <img
      src="https://placehold.co/600x400/EEE/31343C"
      width="100"
      height="100"
    />
  </Html>
</template>
