<script setup>
import { ref, h } from 'vue';

import hangeul from '~/assets/hangeul.json';
import LetterSyllable from '../LetterSyllable.vue';

const syllableRef = ref('으');

function updateSyllable(newSyllable) {
  syllableRef.value = newSyllable;
}

function renderSyllable(syllable, letter) {
  return h(
    LetterSyllable,
    {
      syllable: syllable,
      onUpdateSyllable: () => updateSyllable(syllable),
      letter: letter,
    },
    () => LetterSyllable,
  );
}
</script>

<template>
  <div>
    <p class="text-h6 q-pt-md">Basic Vowels</p>
    <p>Click on vowel and listen to how it sounds. Repeat after.</p>
    <div :class="$style.tableOuter">
      <div :class="$style.tableOuterFirstColumn">
        <div>Syllable</div>
        <div>Vowel Letter</div>
      </div>
      <div :class="$style.tableOuterSecondColumn">
        <component
          v-for="(vowel, index) in hangeul.vowels"
          :key="index"
          :is="() => renderSyllable(vowel.syllable, vowel.hangeul)"
        />
      </div>
    </div>
    <p>&nbsp;</p>
    <SyllableBlockWithDetails :syllable="syllableRef" />
  </div>
</template>

<style module>
.tableOuter {
  display: flex;
}
.tableOuterFirstColumn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > div {
    flex: 1;
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.tableOuterSecondColumn {
  display: flex;
}
</style>
