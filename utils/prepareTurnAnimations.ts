import { LoopOnce, type AnimationClip, type AnimationMixer } from "three";

export function prepareTurnAnimations(animations: AnimationClip[], mixer: AnimationMixer) {
  const rawAnimations = animations.filter((animation) => {
    return (
      animation.name.includes("Turn list") && animation.name !== "Turn list 1"
    );
  });

  const readyAnimations = rawAnimations.map((rawAnimation) => {
    const animation = mixer.clipAction(rawAnimation);
    animation.setLoop(LoopOnce, 1);
    animation.clampWhenFinished = true;

    return animation;
  });

  return readyAnimations;
}