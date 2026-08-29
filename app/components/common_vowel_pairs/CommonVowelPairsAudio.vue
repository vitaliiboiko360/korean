<script setup>
import { toRef, useTemplateRef } from 'vue';
const { letter: letterProp = 'ㄱ' } = defineProps(['letter']);
const letter = toRef(() => letterProp);
const audioTemplateRef = useTemplateRef('audioTemplateRef');

const isPlaying = defineModel('isPlaying', { default: false });
const isShuffle = defineModel('isShuffle', { default: false });
const isLoop = defineModel('isLoop', { default: false });
const pauseBetween = defineModel('pauseBetween', { default: 0 });

import commonVowelSyllable from '~/assets/hangeul_common_vowel_syllables.json';

const currentPlayingIndex = ref(-1);

const letterInfo = commonVowelSyllable[letter.value];

const audioSrc = `vowel_pairs/${letterInfo.characterName}/${letterInfo.audioFilename}`;

onMounted(() => {
  audioTemplateRef.value.load();
});

const timeUpdateEventListener = ref();

const onClickedIndex = (index, onComplete) => {
  if (isPlaying.value == false) {
    audioTemplateRef.value.pause();
    if (timeUpdateEventListener.value) {
      audioTemplateRef.value.removeEventListener(
        'timeupdate',
        timeUpdateEventListener.value,
      );
    }
    return;
  }
  let stopTime;
  if (index == letterInfo.audioPoints.length - 1) {
    stopTime = audioTemplateRef.value.duration;
  } else {
    stopTime = letterInfo.audioPoints[index + 1];
  }
  timeUpdateEventListener.value = (event) => {
    if (
      audioTemplateRef.value &&
      audioTemplateRef.value.currentTime >= stopTime
    ) {
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

const onClickedIndexManual = (index) => {
  audioTemplateRef.value.pause();
  if (timeUpdateEventListener.value) {
    audioTemplateRef.value.removeEventListener(
      'timeupdate',
      timeUpdateEventListener.value,
    );
  }
  let stopTime;
  if (index == letterInfo.audioPoints.length - 1) {
    stopTime = audioTemplateRef.value.duration;
  } else {
    stopTime = letterInfo.audioPoints[index + 1];
  }
  timeUpdateEventListener.value = (event) => {
    if (
      audioTemplateRef.value &&
      audioTemplateRef.value.currentTime >= stopTime
    ) {
      audioTemplateRef.value.pause();
      currentPlayingIndex.value = -1;
      if (timeUpdateEventListener.value) {
        audioTemplateRef.value.removeEventListener(
          'timeupdate',
          timeUpdateEventListener.value,
        );
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
function isHistoryEnded() {
  if (isShuffle.value) {
    for (let i = 0; i < audioPointsLength; i++) {
      if (historyIndices.value.includes(i)) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }
  return (
    currentIndex.value >= audioPointsLength - 1 ||
    historyIndices.value.length >= audioPointsLength
  );
}
function setNextCurrentIndex() {
  if (isShuffle.value) {
    setCurrentIndexRandomIndex();
  } else {
    setCurrentIndexNextSequenceIndex();
  }
}

watch([isPlaying], () => {
  if (isPlaying.value) {
    if (isHistoryEnded()) {
      historyIndices.value = [];
      setNextCurrentIndex();
    }
    let onComplete;
    onComplete = async () => {
      if (isHistoryEnded()) {
        historyIndices.value = [];
        if (isLoop.value == false) {
          isPlaying.value = false;
          return;
        }
      }
      setNextCurrentIndex();
      await new Promise((resolve) =>
        setTimeout(resolve, pauseBetween.value * 1000),
      );
      onClickedIndex(currentIndex.value, onComplete);
    };
    onClickedIndex(currentIndex.value, onComplete);
  }
});
</script>

<template>
  <div :class="$style.outerDiv">
    <CommonVowelPairsAudioControls
      v-model:isPlaying="isPlaying"
      v-model:isShuffle="isShuffle"
      v-model:isLoop="isLoop"
      :class="$style.playbackControls"
    />
    <CommonVowelPairsAudioControlsSecond
      v-model:pauseBetween="pauseBetween"
      @reorder="() => {}"
      :class="$style.playbackControls"
    />
    <audio ref="audioTemplateRef" :src="audioSrc" preload="metadata"></audio>
    <CommonVowelPairs
      @clickedIndex="onClickedIndexManual"
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
.playbackControls {
  margin-bottom: 0.5rem;
}
.playbackControlsSecond {
  margin-bottom: 1rem;
}
</style>
