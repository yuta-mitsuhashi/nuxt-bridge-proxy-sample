import { defineNuxtConfig } from '@nuxt/bridge';

export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-bridge-proxy-sample',
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

  plugins: [
    '~/plugins/apiDomain',
  ],

  modules: [
    '@nuxtjs/axios'
  ],

  serverMiddleware: [
    { path: '/api/**', handler: '~/server-middleware/proxy' }
  ],

  runtimeConfig: {
    proxyTarget: 'https://pokeapi.co/api/',
  },
});
