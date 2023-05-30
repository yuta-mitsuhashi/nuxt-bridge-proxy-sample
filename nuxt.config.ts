import { defineNuxtConfig } from '@nuxt/bridge';

export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mock-nuxt-bridge',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  modules: [
    '@nuxtjs/axios'
  ],

  serverMiddleware: [
    { path: '/api/**', handler: '~/server-middleware/proxy.ts' }
  ],

  runtimeConfig: {
    proxyTarget: 'https://pokeapi.co/api/',
  },
});
