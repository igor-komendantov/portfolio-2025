<script setup lang="ts">
import {
  AnimationClip,
  AnimationMixer,
  LoopOnce,
  Raycaster,
  Vector2,
} from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
// initScene():
// - load glb file;
// - extract raw actions;
// - handle hovering locker
// - handle clicking a button

// const { scene: model, nodes, animations } = await useGLTF("/models/book.glb");

// const { mixer } = useAnimations(animations, model);

// const { renderer, camera } = useTresContext();
// const raycaster = new Raycaster();

// const mouse = new Vector2();

// const locker = nodes.button_rotater;
// const { button_rotater: locker, ...restMeshes } = nodes;

// const hovered = ref(false);

// function onPointerMove(event: MouseEvent) {
//   if (!camera.value) {
//     return;
//   }

//   const isLockerHovered = detectHovering(locker, event, camera);

//   hovered.value = isLockerHovered;
//   renderer.value.domElement.style.cursor = hovered.value
//     ? "pointer"
//     : "default";
// }

// function onClick() {
//   if (!hovered.value) return;
//   const unlockClip = animations[1];
//   const unlock = mixer.clipAction(unlockClip);
//   unlock.setLoop(LoopOnce);
//   unlock.clampWhenFinished = true;
//   unlock.play();

//   const openClip = animations[0];
//   const open = mixer.clipAction(openClip);
//   open.setLoop(LoopOnce);
//   open.clampWhenFinished = true;
//   open.play();
//   console.log(animations);
// }

// onMounted(() => {
//   renderer.value.domElement.addEventListener("pointermove", onPointerMove);
//   renderer.value.domElement.addEventListener("click", onClick);
// });

// onBeforeUnmount(() => {
//   renderer.value.domElement.removeEventListener("pointermove", onPointerMove);
//   renderer.value.domElement.removeEventListener("click", onClick);
// });

// function detectHovering(
//   target: any,
//   mouseEvent: MouseEvent,
//   camera: ComputedRef<Camera | undefined>
// ) {
//   const rect = renderer.value.domElement.getBoundingClientRect();

//   mouse.x = ((mouseEvent.clientX - rect.left) / rect.width) * 2 - 1;
//   mouse.y = -((mouseEvent.clientY - rect.top) / rect.height) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera.value);
//   const intersects = raycaster.intersectObject(target, true);

//   return intersects.length > 0;
// }

function openBook() {
  console.log(animations);

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

  unlockButton.play();
  turnFirstPage.play();
}

function findAnimation(name: string, animations: AnimationClip[]) {
  const animation = animations.find((animation) => animation.name === name);
  if (!animation) {
    throw Error(`Animation "${name}" not found`);
  }

  return animation;
}

const sceneStore = useState<null | {
  openBook: () => void;
  nodes: 
}>("book-scene", () => ({
  openBook() {},
  nodes: [] as 
}));
onMounted(() => {
  // const { scene: model, nodes, animations } = await useGLTF("/models/book.glb");
  // const { mixer } = useAnimations(animations, model);
  const loader = new GLTFLoader();
  loader.load("/models/book.glb", async (gltf) => {
    const { animations, scene } = gltf;
    const animationMixer = new AnimationMixer(gltf.scene);

    await prepareActionsOfOpening(animations, animationMixer);
  });

  // prepare opening actions()
  async function prepareActionsOfOpening(
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

    sceneStore.value.openBook = () => {
      unlockButton.play();
      turnFirstPage.play();
    };
  }

  // prepare other actions ()
  async function prepareRestActions() {}
  prepareRestActions();
});
</script>

<template>
  <primitive :object="locker" @click="openBook" />
</template>
