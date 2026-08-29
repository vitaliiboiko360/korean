<script setup>
const { prop } = defineProps(['prop']);

const isShuffle = defineModel('isShuffle');
const isRepeat = defineModel('isRepeat');
const isPlaying = defineModel('isPlaying');

const playAudioButtonInfo = {
  labelIsPlaying: 'Playing...',
  labelNotPlaying: 'Play Audio',
  iconIsPlaying:
    'M200-312v-336l240 168-240 168Zm320-8v-320h80v320h-80Zm160 0v-320h80v320h-80Z|0 -960 960 960',
  iconNotPlaying: 'play_arrow',
};

const labelPlayAudio = computed(() => {
  if (isPlaying.value) {
    return playAudioButtonInfo.labelIsPlaying;
  }
  return playAudioButtonInfo.labelNotPlaying;
});

const iconPlayAudio = computed(() => {
  if (isPlaying.value) {
    return playAudioButtonInfo.iconIsPlaying;
  }
  return playAudioButtonInfo.iconNotPlaying;
});

onMounted(() => {
  //   console.log(prop);
});
</script>

<template>
  <div :class="$style.outerDiv">
    <div :class="$style.innerRow">
      <QBtn
        @click="() => (isPlaying = !isPlaying)"
        push
        :label="labelPlayAudio"
        :icon="iconPlayAudio"
      />
      <QBtn
        @click="() => (isShuffle = !isShuffle)"
        :class="{ [$style.buttonIsActive]: isShuffle }"
        push
        label="Shuffle"
        icon="shuffle"
      />
      <QBtn
        @click="() => (isRepeat = !isRepeat)"
        :class="{ [$style.buttonIsActive]: isRepeat }"
        push
        label="Loop"
        icon="M380-300v-360l280 180-280 180ZM480-40q-108 0-202.5-49.5T120-228v108H40v-240h240v80h-98q51 75 129.5 117.5T480-120q115 0 208.5-66T820-361l78 18q-45 136-160 219.5T480-40ZM42-520q7-67 32-128.5T143-762l57 57q-32 41-52 87.5T123-520H42Zm214-241-57-57q53-44 114-69.5T440-918v80q-51 5-97 25t-87 52Zm449 0q-41-32-87.5-52T520-838v-80q67 6 128.5 31T762-818l-57 57Zm133 241q-5-51-25-97.5T761-705l57-57q44 52 69 113.5T918-520h-80Z|0 -960 960 960"
      />
    </div>
  </div>
</template>

<style module>
.outerDiv {
  display: flex;
  flex-direction: column;
}
.innerRow {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.buttonIsActive {
  background-color: #d1dffd !important;
  color: rgb(2, 63, 134) !important;
}
</style>
