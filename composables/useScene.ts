export const useScene = () => {
  return useState("scene", () => ({
    showNavigation: false,
    // this field indicates about 2 currently visible pages of book
    pageStep: 0,
    turnNextPage: null as null | (() => void),
    turnPrevPage: null as null | (() => void),

    isPrevAvailable: false,
    isNextAvailable: true,
    turning: false,
    gltfStatus: "idle" as "idle" | "loading" | "ready",

    alert: {
      content: null as null | string,
      visible: false
    },
  }));
};
