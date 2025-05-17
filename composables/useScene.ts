export const useScene = () => {
  return useState("scene", () => ({
    showNavigation: false,
    // this field indicates about 2 currently visible pages of book
    pageStep: 0,
  }));
};
