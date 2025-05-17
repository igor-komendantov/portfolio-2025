import type { GLTFResult } from "@tresjs/cientos";

export const useScene = () => {
  return useState("scene", () => ({
    showNavigation: false,
    // this field says about 2 currently visible pages of book
    pageStep: 0,
    gltf: null as null | GLTFResult
  }));
};
