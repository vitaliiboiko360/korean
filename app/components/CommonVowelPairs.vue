<script setup>
import { toRef } from 'vue';
const { letter: letterProp = 'ㄱ' } = defineProps(['letter']);

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
    <div
      v-ripple
      v-for="(syllable, index) in commonVowelSyllable[letter].vowelPairs"
      :key="index"
      :class="$style.divRipple"
    >
      <SyllableBlockSmall :syllable="syllable" />
    </div>
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
}
</style>
