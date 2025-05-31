import { Raycaster, Vector2, type Object3D, type Vector3 } from "three";

type Rect = {
  topLeft: { x: number; z: number };
  bottomRight: { x: number; z: number };
};

type InteractiveZone = {
  step: number;
  mesh: Object3D;
  rect: Rect;
  onClick?: () => void;
  cursor?: string;
};

export function useInteractiveZones(zones: InteractiveZone[]) {
  const scene = useScene();
  const { camera, renderer } = useTres();
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  let handleMouseMove: ((e: MouseEvent) => void) | null = null;
  let handleClick: ((e: MouseEvent) => void) | null = null;

  const getIntersection = (event: MouseEvent, mesh: Object3D) => {
    const dom = renderer.value?.domElement;
    if (!camera.value || !dom) return null;

    const rect = dom.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera.value);
    return raycaster.intersectObject(mesh, true)[0] ?? null;
  };

  const isInRect = (point: Vector3, rect: Rect) => {
    return (
      point.x >= rect.topLeft.x &&
      point.x <= rect.bottomRight.x &&
      point.z >= rect.topLeft.z &&
      point.z <= rect.bottomRight.z
    );
  };

  watch(
    () => scene.value.pageStep,
    (step) => {
      const dom = renderer.value?.domElement;
      if (!dom) return;

      if (handleMouseMove)
        window.removeEventListener("mousemove", handleMouseMove);
      if (handleClick) window.removeEventListener("click", handleClick);

      const activeZones = zones.filter((z) => z.step === step);
      if (activeZones.length === 0) return;

      handleMouseMove = (e) => {
        let found = false;

        for (const z of activeZones) {
          const hit = getIntersection(e, z.mesh);
          if (!hit) continue;
          const local = z.mesh.worldToLocal(hit.point.clone());

          if (isInRect(local, z.rect)) {
            dom.style.cursor = z.cursor ?? "pointer";
            found = true;
            break;
          }
        }

        if (!found) {
          dom.style.cursor = "default";
        }
      };

      handleClick = (e) => {
        for (const z of activeZones) {
          if (!z.onClick) continue;
          const hit = getIntersection(e, z.mesh);
          if (!hit) continue;
          const local = z.mesh.worldToLocal(hit.point.clone());

          const isPointInRect = isInRect(local, z.rect);

          if (isPointInRect) {
            z.onClick();
            break;
          }
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("click", handleClick);
    }
  );

  onUnmounted(() => {
    if (handleMouseMove) {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    if (handleClick) {
      window.removeEventListener("click", handleClick);
    }

    const dom = renderer.value?.domElement;
    if (dom && dom.style) {
      dom.style.cursor = "default";
    }
  });
}
