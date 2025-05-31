<script setup lang="ts">
const scene = useScene();
</script>

<template>
  <transition name="fade">
    <div v-show="scene.gltfStatus === 'ready'">
      <TresCanvas clear-color="#DD9D6F" window-size>
        <Suspense>
          <SceneInner />
        </Suspense>
      </TresCanvas>
      <PageNavigation />

      <SceneAlert/>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
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
