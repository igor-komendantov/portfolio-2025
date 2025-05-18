import type { AnimationClip } from "three";

export function shiftAnimationClipToZero(clip: AnimationClip): AnimationClip {
  const newClip = clip.clone();

  const firstKeyTime = Math.min(
    ...newClip.tracks.map((track) => track.times[0])
  );

  for (const track of newClip.tracks) {
    for (let i = 0; i < track.times.length; i++) {
      track.times[i] -= firstKeyTime;
    }
  }

  newClip.resetDuration();
  return newClip;
}
