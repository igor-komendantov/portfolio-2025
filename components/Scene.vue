<script setup lang="ts">

</script>

<template>
  <TresCanvas clear-color="#DD9D6F" window-size>
    <Suspense>
      <SceneInner />
    </Suspense>
  </TresCanvas>
  <PageNavigation />
</template>
