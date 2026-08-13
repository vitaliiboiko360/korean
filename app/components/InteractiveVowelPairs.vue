<script setup>
import hangeulCommonVowelSyllables from '~/assets/hangeul_common_vowel_syllables.json';
const { vowel = 'ㄴ' } = defineProps(['vowel']);

const vowelPairsInfo = hangeulCommonVowelSyllables[vowel];

const audioRef = useTemplateRef('audioRef');

const getAudioUrl = () =>
  `/vowel_pairs/${vowelPairsInfo.characterName}/${vowelPairsInfo.fileName}`;

onMounted(() => {
  console.log(JSON.stringify(vowelPairsInfo));
});
</script>

<template>
  <div>
    <audio ref="audioRef" :src="() => getAudioUrl()"></audio>
    <CommonVowelPairs :letter="vowel" />
  </div>
</template>

<style module>
.outerDiv {
  display: flex;
}
</style>
