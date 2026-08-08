<script setup>
const { letter, syllable, onUpdateSyllable } = defineProps([
  'syllable',
  'letter',
  'onUpdateSyllable',
]);
</script>

<template>
  <div :class="$style.containerDiv">
    <SyllableButton @updateSyllable="onUpdateSyllable" :syllable="syllable" />
    <Letter @updateSyllable="onUpdateSyllable" :letter="letter" />
  </div>
</template>

<style module>
.containerDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min-content;
  height: min-content;

  :first-child {
    margin-bottom: 0;
  }
}
</style>
