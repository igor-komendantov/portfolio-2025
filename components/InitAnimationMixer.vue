<script setup lang="ts">
import type { AnimationClip, Scene } from "three";

const { animations, scene } = defineProps<{
  animations: AnimationClip[];
  scene: Scene;
}>();

const { mixer } = useAnimations(animations, scene);

useState('scene', () => ({
    animationMixer: mixer
}))
</script>
