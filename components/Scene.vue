<script setup lang="ts">
import {
  AnimationClip,
  AnimationMixer,
  LoopOnce,
  Raycaster,
  Vector2,
} from "three";

const { scene: model, nodes, animations } = await useGLTF("/models/book.glb");

const { mixer } = useAnimations(animations, model);

const { button_rotater: lockerMesh, ...restMeshes } = nodes;

function findAnimation(name: string, animations: AnimationClip[]) {
  const animation = animations.find((animation) => animation.name === name);
  if (!animation) {
    throw Error(`Animation "${name}" not found`);
  }

  return animation;
}

const openBook = prepareActionOfOpening(animations, mixer);

function prepareActionOfOpening(
  animations: AnimationClip[],
  mixer: AnimationMixer
) {
  const unlockButton = mixer.clipAction(
    findAnimation("Open locker", animations)
  );
  unlockButton.setLoop(LoopOnce, 1);
  unlockButton.clampWhenFinished = true;

  const turnFirstPage = mixer.clipAction(
    findAnimation("Turn list 1", animations)
  );
  turnFirstPage.setLoop(LoopOnce, 1);
  turnFirstPage.clampWhenFinished = true;

  return () => {
    unlockButton.play();
    turnFirstPage.play();
  };
}
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
