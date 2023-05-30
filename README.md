# NuxtBridge Proxy Sample

## 起動

- Dockerビルド＆起動

```
docker build . -t nuxt-bridge-proxy-sample && docker run --rm -p 8080:3000 -e NUXT_PUBLIC_MY_DOMAIN='http://localhost:8080' nuxt-bridge-proxy-sample
```

- 画面表示 (テストの為、ポート番号を変更)

```
http://localhost:8080/
```

## Proxy設定

- `http-proxy-middleware` で Proxy を行う方針。
- fromNodeMiddleware で取得できる middleware を使って適用する。

```.ts
// server-middleware/proxy.ts

import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

// Proxy先はRuntimeConfigで設定変更できるよう考慮
const { proxyTarget } = useRuntimeConfig();

const proxyMiddleware = createProxyMiddleware({
  target: proxyTarget,
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/api': '/',
  },
  pathFilter: ['/api/**'],
  on: {
    proxyReq: fixRequestBody,
  },
  logger: console,
});

export default fromNodeMiddleware((req, res, next) => {
  proxyMiddleware(req, res, next);
});
```

## API呼び出し

- useFetch利用時、リクエスト先URLにFQDNを指定しないと、SSR時にエラーが発生する。(<a href="https://github.com/nuxt/nuxt/issues/12720">恐らく内部の不具合</a>)
- その為、SSRでは内部ホスト `http://localhost:3000/*` に、CSR時はドメイン指定を省略 `/*` に、リクエスト先URLを変更する必要がある。
- これを簡易にやる為、`plugins/apiDomain.ts` でリクエスト先のFQDNを取得する処理を用意している。

```.ts
// plugins/apiDomain.ts
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  // CSR時にドメインを省略させて $axios.$get すると、何故かNuxtの自ホスト (localhost:3000) にリクエストしてしまう。
  // その為、明示的にRuntimeConfigで公開時の自ドメインを明示的に設定する事にする。（ちょっと煩雑...）
  nuxtApp.provide('apiDomain', () => nuxtApp.ssrContext ? 'http://localhost:3000' : config.public.myDomain);
});
```

```.vue
// pages/ditto.vue
<script lang="ts" setup>
const { $axios, $apiDomain } = useNuxtApp();
const data = ref({});

(async () => {
  data.value = await $axios.$get(`${$apiDomain()}/api/v2/pokemon/ditto`);
})();
</script>
```
