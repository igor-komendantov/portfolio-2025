import type { AnimationClip } from "three";

export const findAnimation = (name: string, animations: AnimationClip[]) => {
  const animation = animations.find((animation) => animation.name === name);
  if (!animation) {
    throw Error(`Animation "${name}" not found`);
  }

  return animation;
};
