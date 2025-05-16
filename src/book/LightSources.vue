<template>
  <TresAmbientLight :intensity="0.7" />

  <TresDirectionalLight :position="[3, 5, 2]" :intensity="2" cast-shadow />
  <TresDirectionalLight :position="[-3, 2, -2]" :intensity="0.8" />
  <TresDirectionalLight :position="[0, 5, -5]" :intensity="0.5" />
</template>
