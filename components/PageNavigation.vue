<script setup lang="ts">
const scene = useScene();
</script>

<template>
  <div class="nav">
    <div class="nav-prev">
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

    <transition name="fade">
      <div
        class="nav-next-wrapper"
        v-show="scene.showNavigation && scene.isNextAvailable"
      >
        <div class="nav-label">
          <transition name="fade">
            <span
              :class="{ 'page-step-hidden': scene.turning }"
              class="page-step"
              >{{ scene.pageStep }}</span
            >
          </transition>
          / 8
        </div>

        <button
          class="nav-button"
          @click="scene.turnNextPage"
          :disabled="!scene.isNextAvailable || scene.turning"
        >
          <img src="/images/button-next.svg" width="170" />
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.page-step {
  transition: opacity 0.5s ease;
  opacity: 1;
}
.page-step.page-step-hidden {
  opacity: 0;
}

/* ------------------ */

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

.nav-prev {
  justify-self: start;
  align-self: end;
}

.nav-next-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-self: end;
  gap: 1rem;
}

.nav-label {
  font-size: 2.3rem;
  border-radius: 4px;
  text-align: left;
  width: 100%;
  padding-left: 1rem;
  font-family: Arial;
  font-weight: 500;
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
</style>
