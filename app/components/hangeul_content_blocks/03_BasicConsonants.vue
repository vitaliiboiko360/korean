<script setup>
import { ref, h } from 'vue';

import hangeul from '~/assets/hangeul.json';

const letterRef = ref('ㄱ');

function updateSyllable(newSyllable) {
  letterRef.value = newSyllable;
}

function renderSyllable(letter) {
  return h(
    SyllableButton,
    {
      onUpdateSyllable: () => updateSyllable(letter),
      syllable: letter,
    },
    () => SyllableButton,
  );
}
</script>

<template>
  <div>
    <p class="text-h6 q-pt-md">Basic Consonants</p>
    <p>The letter "giyeok"</p>
    <p>
      Pronunciation is similar to English sound
      <HighlightedTextSpan text="g" /> or <HighlightedTextSpan text="k" /> but
      neither exactly of those, rather it has its own sound.
    </p>
    <SyllableBlockSmall :syllable="`ㄱ`" />
    <p>Position of your tounge when pronounce this sound</p>
    <Video videoSrc="/hangeul_basic_consonants/giyeok.mp4" />
    <!-- <video src="~/assets/hangeul_basic_consonants/giyeok.mp4" controls /> -->
  </div>
</template>

<style module>
.tableOuter {
  display: flex;
}
.leftSideColumn {
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
.mainColumn {
  display: flex;
  flex-direction: column;
}
.leftCorner {
  min-width: 7rem;
  min-height: 6rem;
}
.leftSideContent {
  display: flex;
  flex-direction: column;
}
.mainColumnHeader {
  display: flex;
}
.syllableRows {
  display: flex;
  flex-direction: column;
}
</style>
