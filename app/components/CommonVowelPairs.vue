<script setup>
import { toRef } from 'vue';
import { shuffle as _shuffle } from 'lodash-es';
const { letter: letterProp = 'ㄱ', currentPlayingIndex } = defineProps([
  'letter',
  'currentPlayingIndex',
]);
const emit = defineEmits(['clickedIndex']);

const outerDivRef = useTemplateRef('outerDivRef');

const observer = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const items = entry.target.children;
    if (items.length < 2) return;

    const firstItemTop = items[0].offsetTop;
    let isWrapped = false;

    // Check if any element pushed to a new row
    for (let i = 1; i < items.length; i++) {
      if (items[i].offsetTop > firstItemTop) {
        isWrapped = true;
        break;
      }
    }

    // Toggle a class on the container based on wrap status
    if (isWrapped) {
      console.log('is Wrapped');
      //   entry.target.classList.add('isWrapped');
    } else {
      //   entry.target.classList.remove('isWrapped');
    }
  }
});

import commonVowelSyllable from '~/assets/hangeul_common_vowel_syllables.json';

const letter = toRef(() => letterProp);

onMounted(() => {
  // Start tracking the container
  observer.observe(outerDivRef.value);
  console.log(letter.value);
});
</script>

<template>
  <div ref="outerDivRef" :class="$style.outerDiv">
    <TransitionGroup>
      <div
        v-ripple
        v-for="(syllable, index) in commonVowelSyllable[letter].vowelPairs"
        @click="emit('clickedIndex', index)"
        :key="syllable"
        :class="[
          $style.divRipple,
          { [$style.activePlayingIndex]: index == currentPlayingIndex },
        ]"
      >
        <SyllableBlockSmall :syllable="syllable" />
      </div>
    </TransitionGroup>
  </div>
</template>

<style module>
.outerDiv {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  row-gap: 1rem;
}

.divRipple {
  position: relative;
  box-sizing: border-box;
  border: 2px dotted transparent;
}

.activePlayingIndex {
  border: 2px dotted rgb(131, 131, 149);
}
</style>
