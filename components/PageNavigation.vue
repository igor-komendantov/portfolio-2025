<script setup lang="ts">
const scene = useScene();
</script>

<template>
  <div class="nav">
    <div>
      <transition name="fade">
        <button
          v-show="scene.showNavigation && scene.isPrevAvailable"
          class="nav-button"
          :disabled="!scene.isPrevAvailable || scene.turning"
          @click="scene.turnPrevPage"
        >
          <img src="/images/button-prev.svg" width="170" />
        </button>
      </transition>
    </div>

    <div>
      <transition name="fade">
        <button
          v-show="scene.showNavigation && scene.isNextAvailable"
          class="nav-button"
          @click="scene.turnNextPage"
          :disabled="!scene.isNextAvailable || scene.turning"
        >
          <img src="/images/button-next.svg" width="170" />
          <h1>{{ scene.pageStep }}</h1>
        </button>
      </transition>
    </div>
  </div>
</template>

<style scoped>
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

.nav-button {
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all ease-in 0.5s;
}
.nav-button:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}

.nav {
  position: absolute;
  z-index: 9999;
  bottom: 5rem;
  left: 1rem;
  right: 1rem;
  width: calc(100% - 2rem);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
}
.nav > *:first-child {
  justify-self: start; /* Прижать к левому краю своей колонки */
}

.nav > *:last-child {
  justify-self: end; /* Прижать к правому краю своей колонки */
}
</style>
