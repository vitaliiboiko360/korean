// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui'],
  css: ['assets/app.scss'],
  quasar: {
    plugins: [
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
      'Dark',
    ],
    extras: {
      font: 'roboto-font',
    },
    components: {
      defaults: {
        QBtn: {
          unelevated: true,
        },
      },
    },
  },
});
