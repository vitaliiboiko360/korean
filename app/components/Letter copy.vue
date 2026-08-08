<script setup>
const { letter } = defineProps(['letter']);
const emit = defineEmits(['updateSyllable']);
</script>

<template>
  <q-item
    v-ripple
    clickable
    @click="emit('updateSyllable')"
    :class="$style.qItemLetter"
  >
    <q-item-section :class="$style.qItemSection">{{ letter }}</q-item-section>
  </q-item>
</template>

<style module>
.qItemLetter {
  width: 3.7rem;
  height: 3.5rem;
  border-color: #e1e1e2;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  font-size: 1.3rem;
  user-select: none;
  margin: 0.5rem;
}

.qItemSection {
  align-items: center;
}
</style>
