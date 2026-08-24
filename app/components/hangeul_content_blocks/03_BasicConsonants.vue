<script setup>
import CommonVowelPairs from '../CommonVowelPairs.vue';
</script>

<template>
  <div>
    <p class="text-h6 q-pt-md">Basic Consonants</p>
    <p class="text-h6">giyeok</p>
    <SyllableBlockSmall :syllable="`ㄱ`" />
    <p>
      Pronunciation is similar to English sound
      <HighlightedTextSpan text="g" /> or <HighlightedTextSpan text="k" /> but
      neither exactly of those, rather it has its own sound.
    </p>
    <p>Position your tounge to pronounce giyeok sound</p>
    <Video videoSrc="/hangeul_basic_consonants/giyeok.mp4" />
    <p>&nbsp;</p>
    <p>Pair giyeok consonant with common vowels.</p>
    <ClientOnly>
      <CommonVowelPairs :letter="`ㄱ`" />
    </ClientOnly>
    <p></p>
    <p class="text-h6">nieun</p>
    <SyllableBlockSmall :syllable="`ㄴ`" />
    <p>
      Similar to English sound
      <HighlightedTextSpan text="n" />
    </p>
    <p>Pair nieun consonant with vowels.</p>
    <ClientOnly>
      <CommonVowelPairs :letter="`ㄴ`" />
    </ClientOnly>
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
