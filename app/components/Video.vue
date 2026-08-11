<script setup>
import { VideoPlayer } from '@vue-player/vue';
const { videoSrc } = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <VideoPlayer :key="videoSrc" :src="videoSrc">
    <template #controls="{ state, player }">
      <VpPlayButton
        :is-playing="state.isPlaying"
        @click="state.isPlaying ? player.pause() : player.play()"
      />
    </template>
  </VideoPlayer>
</template>

<style module></style>
