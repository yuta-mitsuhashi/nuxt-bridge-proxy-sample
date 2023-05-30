<template>
  <div>
    <p>called api.</p>
    <hr>
    <pre>{{ data }}</pre>
  </div>
</template>

<script lang="ts" setup>
const { $axios } = useNuxtApp();
const data = ref({});

(async () => {
  data.value = await $axios.$get('http://localhost:3000/api/v2/pokemon/ditto');
})();
</script>
