export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  nuxtApp.provide('apiDomain', () => nuxtApp.ssrContext ? 'http://localhost:3000' : config.public.myDomain);
});
