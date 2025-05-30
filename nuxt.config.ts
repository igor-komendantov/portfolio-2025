// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@tresjs/nuxt"],
  runtimeConfig: {
    public: {
      email: "placeholder",
      linkedIn: "placeholder",
      github: "placeholder",

      // These coordinates are separated from urls, because urls should be overrided by ENV file.
      linksLocalCoordinates: {
        email: {
          topLeft: {
            x: -0.393928821891629,
            z: 0.037590497299288594,
          },
          bottomRight: {
            x: 0.3698629609054239,
            z: 0.17834934081423326,
          },
        },
        linkedIn: {
          topLeft: {
            x: -0.28894147175055396,
            z: -0.06491567554876015,
          },
          bottomRight: {
            x: -0.002364559471120631,
            z: 0.02791815187390262,
          },
        },
        github: {
          topLeft: {
            x: -0.2860870724292083,
            z: 0.15561072674615944,
          },
          bottomRight: {
            x: -0.05359185384468218,
            z: 0.23959869589342925,
          },
        },
      },
    },
  },
});
