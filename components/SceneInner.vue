<script setup lang="ts">
import type { Group } from "three";
import { useGLTF } from "@tresjs/cientos";
import { useWindowSize } from "@vueuse/core";

const scene = useScene();
const gltf = await useGLTF("/models/book.glb");
scene.value.gltfStatus = "ready";

const { mixer } = useAnimations(gltf.animations, gltf.scene);

usePrepareTurnAnimations(gltf, mixer);

const appConfig = useNuxtApp();
const meshesOfPages = getMeshesOfClickablePages(gltf);

function copyEmail() {
  navigator.clipboard.writeText(appConfig.$config.public.email);
  scene.value.alert.content = "Copied";
  scene.value.alert.visible = true
}

function openLinkedIn() {
  window.open(appConfig.$config.public.linkedIn, "_blank");
}

function openGithub() {
  window.open(appConfig.$config.public.github, "_blank");
}

function openWWT() {
  window.open(appConfig.$config.public.wwt, "_blank");
}
useInteractiveZones([
  {
    step: 3,
    mesh: meshesOfPages.wwtPageMesh!,
    rect: appConfig.$config.public.linksLocalCoordinates.wwt,
    onClick: openWWT,
  },
  {
    step: 8,
    mesh: meshesOfPages.emailPageMesh,
    rect: appConfig.$config.public.linksLocalCoordinates.email,
    onClick: copyEmail,
  },
  {
    step: 8,
    mesh: meshesOfPages.linksPageMesh,
    rect: appConfig.$config.public.linksLocalCoordinates.github,
    onClick: openGithub,
  },
  {
    step: 8,
    mesh: meshesOfPages.linksPageMesh,
    rect: appConfig.$config.public.linksLocalCoordinates.linkedIn,
    onClick: openLinkedIn,
  },
]);

const groupRef = ref<Group | null>(null);
const { width } = useWindowSize();
watch(
  () => width.value,
  (width) => {
    const baseSize = 1920;
    const scale = Math.min(1, width / baseSize);
    groupRef.value?.scale.setScalar(scale);
  },
  { immediate: true }
);
</script>

<template>
  <TresPerspectiveCamera :position="[0, 1.2, 0.3]" :look-at="[0, 0, 0]" />
  <LightSources />

  <TresGroup ref="groupRef">
    <BookSnap :gltf="gltf" :mixer="mixer" />

    <primitive :object="gltf.scene" />
  </TresGroup>
</template>
