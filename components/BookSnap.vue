<script setup lang="ts">
import type { GLTFResult } from "@tresjs/cientos";
import type { AnimationMixer } from "three";

const { gltf, mixer } = defineProps<{
  gltf: GLTFResult;
  mixer: AnimationMixer;
}>();

const scene = useScene();

const actionsOfOpening = prepareActionOfOpening(gltf.animations, mixer);

const openBook = async () => {
  const onAnimationFinished = (event: any) => {
    if (event.action === actionsOfOpening.turnFirstPage) {
      mixer.removeEventListener("finished", onAnimationFinished);
      scene.value.pageStep = 1;
      scene.value.showNavigation = true;
    }
  };

  mixer.addEventListener("finished", onAnimationFinished);
  actionsOfOpening.unlockButton.play();
  actionsOfOpening.turnFirstPage.play();
};
</script>

<template>
  <primitive :object="gltf.nodes.button_rotater" @click="openBook" />
</template>
