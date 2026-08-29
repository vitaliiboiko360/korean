<script setup>
const { prop } = defineProps(['prop']);

const pauseBetween = defineModel('pauseBetween');
const emit = defineEmits(['reorder']);

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

const reorderButtonInfo = {
  icon: 'M120-40q-33 0-56.5-23.5T40-120v-720q0-33 23.5-56.5T120-920h720q33 0 56.5 23.5T920-840v720q0 33-23.5 56.5T840-40H120Zm440-120h240v-240h-80v102L594-424l-57 57 127 127H560v80Zm-344 0 504-504v104h80v-240H560v80h104L160-216l56 56Zm151-377 56-56-207-207-56 56 207 207Z|0 -960 960 960',
};

onMounted(() => {
  //   console.log(prop);
});
</script>

<template>
  <div :class="$style.outerDiv">
    <div :class="$style.innerRow">
      <QBtn
        v-if="false"
        @click="() => emit('reorder')"
        :class="({ [$style.buttonIsActive]: false }, $style.buttonReorder)"
        push
        label="Reorder"
        :icon="reorderButtonInfo.icon"
      />
      <div :class="$style.pauseColumn">
        <QItemLabel :class="$style.labelPause"
          >pause between in sec.</QItemLabel
        >
        <div :class="$style.pauseColumnSliderRow">
          <QSlider v-model="pauseBetween" :min="0" :max="3" />
          <!--            label-always
            switch-label-side-->
        </div>
      </div>
      <QInput
        :class="$style.pauseColumnInputField"
        v-model="pauseBetween"
        dense
        item-aligned
        outlined
        label-slot
        ><template v-slot:label></template
      ></QInput>
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
  gap: 10px;
  align-items: center;
}
.buttonIsActive {
  background-color: #d1dffd !important;
  color: rgb(2, 63, 134) !important;
}
.pauseColumn {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.labelPause {
  margin-top: 0.4rem;
  font-weight: 500;
  font-size: 14px; /* Quasar's standard QBtn font size */
  text-transform: uppercase; /* Match default QBtn uppercase styling */
  letter-spacing: 0.08928em; /* Material Design button letter spacing */
}
.buttonReorder {
  height: min-content;
  :global(.q-icon) {
    svg {
      transform: rotate(90deg);
    }
  }
}
.pauseColumnSliderRow {
  display: flex;
  flex-direction: row;
  margin-left: 3rem;
  margin-right: 3rem;
}
.pauseColumnInputField {
  width: auto;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  :global(.q-field__native) {
    padding-top: 0px !important;
    width: 1rem;
    text-align: center;
  }
}
</style>
