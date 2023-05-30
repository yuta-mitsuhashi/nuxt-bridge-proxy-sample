<template>
  <div>
    <p>called api.</p>
    <hr>
    <pre>{{ data }}</pre>
  </div>
</template>

<script lang="ts" setup>
const { $axios, $apiDomain } = useNuxtApp();
const data = ref({});

(async () => {
  data.value = await $axios.$get(`${$apiDomain()}/api/v2/pokemon/ditto`);
})();
</script>
