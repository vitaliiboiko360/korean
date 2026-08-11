<script setup>
const { prop } = defineProps(['prop']);

onMounted(() => {
  console.log(prop);
});
</script>

<template>
  <div :class="$style.outerDiv"></div>
</template>

<style module>
.outerDiv {
  display: flex;
}
</style>
