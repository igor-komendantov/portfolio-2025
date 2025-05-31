<script setup lang="ts">
const scene = useScene();

watch(
  () => scene.value.alert.visible,
  (isVisible) => {
    if (!isVisible) {
      return;
    }

    setTimeout(() => {
      scene.value.alert.visible = false;
    }, 4000);
  }
);
</script>

<template>
  <transition name="fade">
    <p class="scene-alert-label" v-show="scene.alert.visible">
      {{ scene.alert.content }}
      ✓
    </p>
  </transition>
</template>

<style>
.scene-alert-label {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 2.5rem;
  background: white;
  border-radius: 4rem;
  backdrop-filter: blur(10px);
  font-size: 2rem;
  font-family: Arial;
  color: green;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
