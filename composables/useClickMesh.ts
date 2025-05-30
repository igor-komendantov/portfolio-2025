import type { GLTFResult } from "@tresjs/cientos";

interface UseClickMeshArgs {
  gltf: GLTFResult;
  meshName: string;
  cursorPointer: boolean;
  cordinates: {
    topLeft: {
      x: number;
      z: number;
    };
    bottomRight: {
      x: number;
      z: number;
    };
  };
  onClick: () => void;
  active: boolean;
}

export function useClickMesh(args: UseClickMeshArgs) {
    
}
