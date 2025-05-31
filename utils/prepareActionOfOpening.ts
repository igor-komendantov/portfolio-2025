import { LoopOnce, type AnimationClip, type AnimationMixer } from "three";

export const prepareActionOfOpening = (
  animations: AnimationClip[],
  mixer: AnimationMixer
) => {
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

  return {
    unlockButton,
    turnFirstPage
  }
};
