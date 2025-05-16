<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import LightSources from "./LightSources.vue";
import PageNavigation from "./PageNavigation.vue";

import { LoopOnce, Raycaster, Vector2 } from "three";
import { ref, onMounted, onBeforeUnmount } from "vue";

const { scene: model, nodes, animations } = await useGLTF("/models/book.glb");
const { actions, mixer } = useAnimations(animations, model);

const { renderer, camera } = useTresContext();
const raycaster = new Raycaster();
const mouse = new Vector2();

const clickableNode = nodes.button_rotater;
const hovered = ref(false);

function onPointerMove(event: MouseEvent) {
  const rect = renderer.value.domElement.getBoundingClientRect();

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera.value);
  const intersects = raycaster.intersectObject(clickableNode, true);

  hovered.value = intersects.length > 0;
  renderer.value.domElement.style.cursor = hovered.value
    ? "pointer"
    : "default";
}

function onClick() {
  if (!hovered.value) return;
  const unlockClip = animations[1];
  const unlock = mixer.clipAction(unlockClip);
  unlock.setLoop(LoopOnce);
  unlock.clampWhenFinished = true;
  unlock.play();

  const openClip = animations[0];
  const open = mixer.clipAction(openClip);
  open.setLoop(LoopOnce);
  open.clampWhenFinished = true;
  open.play();
  console.log(animations);
}

onMounted(() => {
  renderer.value.domElement.addEventListener("pointermove", onPointerMove);
  renderer.value.domElement.addEventListener("click", onClick);
});

onBeforeUnmount(() => {
  renderer.value.domElement.removeEventListener("pointermove", onPointerMove);
  renderer.value.domElement.removeEventListener("click", onClick);
});
</script>

<template>
  <TresCanvas clear-color="#DD9D6F" window-size>
    <TresPerspectiveCamera :position="[0, 1.2, 0]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <LightSources />

    <Suspense>
      <primitive :object="model" />
    </Suspense>

    <PageNavigation />
  </TresCanvas>
</template>
