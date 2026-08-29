<script setup>
import { toRef, useTemplateRef } from 'vue';
const { letter: letterProp = 'ㄱ' } = defineProps(['letter']);
const letter = toRef(() => letterProp);
const audioTemplateRef = useTemplateRef('audioTemplateRef');

const isPlaying = defineModel('isPlaying', { default: false });
const isShuffle = defineModel('isShuffle', { default: false });
const isRepeat = defineModel('isRepeat', { default: false });

import commonVowelSyllable from '~/assets/hangeul_common_vowel_syllables.json';

const currentPlayingIndex = ref(-1);

const letterInfo = commonVowelSyllable[letter.value];

const audioSrc = `vowel_pairs/${letterInfo.characterName}/${letterInfo.audioFilename}`;

onMounted(() => {
  audioTemplateRef.value.load();
});

const timeUpdateEventListener = ref();
const onClickedIndex = (index, onComplete) => {
  if (isPlaying.value) {
    audioTemplateRef.value.pause();
    if (timeUpdateEventListener.value) {
      audioTemplateRef.value.removeEventListener(
        'timeupdate',
        timeUpdateEventListener.value,
      );
    }
  }
  let stopTime;
  if (index == letterInfo.audioPoints.length - 1) {
    stopTime = audioTemplateRef.value.duration;
  } else {
    stopTime = letterInfo.audioPoints[index + 1];
  }
  timeUpdateEventListener.value = (event) => {
    if (audioTemplateRef.value.currentTime >= stopTime) {
      audioTemplateRef.value.pause();
      currentPlayingIndex.value = -1;
      if (timeUpdateEventListener.value) {
        audioTemplateRef.value.removeEventListener(
          'timeupdate',
          timeUpdateEventListener.value,
        );
      }
      if (onComplete) {
        try {
          onComplete();
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  audioTemplateRef.value.addEventListener(
    'timeupdate',
    timeUpdateEventListener.value,
  );
  audioTemplateRef.value.pause();
  audioTemplateRef.value.currentTime = letterInfo.audioPoints[index];
  currentPlayingIndex.value = index;
  audioTemplateRef.value.play();
};

const currentIndex = ref(0);
const historyIndices = ref([]);

const audioPointsLength = commonVowelSyllable[letter.value].audioPoints.length;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function setCurrentIndexRandomIndex() {
  const maxNumberOfIteration = 100;
  let iterationNum = 0;
  while (true) {
    if (iterationNum++ > maxNumberOfIteration) break;
    let randomIndex = getRandomInt(audioPointsLength);
    if (historyIndices.value.indexOf(randomIndex) == -1) {
      historyIndices.value.push(randomIndex);
      currentIndex.value = randomIndex;
      break;
    }
  }
}
function setCurrentIndexNextSequenceIndex() {
  currentIndex.value = (currentIndex.value + 1) % audioPointsLength;
  const maxNumberOfIteration = audioPointsLength;
  let iterationNum = 0;
  while (true) {
    if (iterationNum++ > maxNumberOfIteration) break;
    let nextSequenceIndex = (currentIndex.value + 1) % audioPointsLength;
    if (historyIndices.value.indexOf(nextSequenceIndex) == -1) {
      historyIndices.value.push(nextSequenceIndex);
      currentIndex.value = nextSequenceIndex;
      break;
    }
  }
}

watch([isPlaying], () => {
  if (isPlaying.value) {
    let onComplete;
    onComplete = () => {
      historyIndices.value.push(currentIndex.value);
      if (historyIndices.value.length == audioPointsLength) {
        historyIndices.value = [];
        if (isRepeat.value == false) return;
      }
      if (isShuffle.value) {
        setCurrentIndexRandomIndex();
      } else {
        setCurrentIndexNextSequenceIndex();
      }
      onClickedIndex(currentIndex.value, onComplete);
    };
    onClickedIndex(currentIndex.value, onComplete);
  } else {
    audioTemplateRef.value.pause();
    if (timeUpdateEventListener.value) {
      audioTemplateRef.value.removeEventListener(
        'timeupdate',
        timeUpdateEventListener.value,
      );
    }
  }
});
</script>

<template>
  <div :class="$style.outerDiv">
    <CommonVowelPairsAudioControls
      v-model:isPlaying="isPlaying"
      v-model:isShuffle="isShuffle"
      v-model:isRepeat="isRepeat"
    />
    <audio ref="audioTemplateRef" :src="audioSrc" preload="metadata"></audio>
    <CommonVowelPairs
      @clickedIndex="onClickedIndex"
      :letter
      :currentPlayingIndex
    />
  </div>
</template>

<style module>
.outerDiv {
  display: flex;
  flex-direction: column;
}
</style>
