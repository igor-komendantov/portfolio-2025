import type { GLTFResult } from "@tresjs/cientos";

export function getMeshesOfContactPages(gltf: GLTFResult) {
  const appConfig = useNuxtApp();

  const emailPageMesh = gltf.scene.getObjectByName(
    appConfig.$config.public.meshWithEmail
  );
  const linksPageMesh = gltf.scene.getObjectByName(
    appConfig.$config.public.meshWithLinks
  );

  if (!emailPageMesh) {
    throw new Error("email page mesh is not found");
  }
  if (!linksPageMesh) {
    throw new Error("links page mesh is not found");
  }

  return {
    emailPageMesh,
    linksPageMesh,
  };
}
