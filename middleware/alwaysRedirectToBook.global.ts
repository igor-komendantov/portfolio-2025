export default defineNuxtRouteMiddleware((to) => {
  const bookPagePath = "/book";

  if (to.path !== bookPagePath) {
    return navigateTo(bookPagePath);
  }
});
