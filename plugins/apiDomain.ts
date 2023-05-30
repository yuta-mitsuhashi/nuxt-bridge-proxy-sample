export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('apiDomain', () => nuxtApp.ssrContext ? 'http://localhost:3000' : '');
});
