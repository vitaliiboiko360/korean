<script setup>
const { syllable } = defineProps(['syllable']);
const emit = defineEmits(['updateSyllable']);
</script>

<template>
  <q-item
    v-ripple
    clickable
    @click="emit('updateSyllable')"
    :class="$style.qItemSyllable"
  >
    <q-item-section :class="$style.qItemSection">{{ syllable }}</q-item-section>
  </q-item>
</template>

<style module>
.qItemSyllable {
  width: 4rem;
  height: 3.8rem;
  border-color: #d9d9d9;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  font-size: 1.6rem;
  user-select: none;
  margin: 0.5rem;
}

.qItemSection {
  align-items: center;
}
</style>
