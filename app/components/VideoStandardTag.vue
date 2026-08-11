<script setup>
import { useTemplateRef } from 'vue';
const { videoSrc } = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
});

const isPlaying = ref(false);

const video = useTemplateRef('video');
const playButton = useTemplateRef('playButton');
const container = useTemplateRef('container');

// Click events for both the button and the video surface
function togglePlay() {
  if (video.value.paused || video.value.ended) {
    video.value.play();
    isPlaying.value = true;
  } else if (!video.value.paused) {
    video.value.pause();
    isPlaying.value = false;
  }
}

function onEndedOrPaused() {
  isPlaying.value = false;
}

onMounted(() => {
  console.log(videoSrc);
  playButton.value.addEventListener('click', togglePlay);
  video.value.addEventListener('click', togglePlay);
  video.value.addEventListener('ended', onEndedOrPaused);
  video.value.addEventListener('paused', onEndedOrPaused);
});
onUnmounted(() => {
  playButton.value.removeEventListener('click', togglePlay);
  video.value.removeEventListener('click', togglePlay);
  video.value.addEventListener('ended', onEndedOrPaused);
  video.value.addEventListener('paused', onEndedOrPaused);
});
</script>

<template>
  <div :class="$style.divOuter">
    <div ref="container" :class="$style.videoContainer">
      <video ref="video" :key="videoSrc" controls>
        <source :src="String(videoSrc)" type="video/mp4" />
      </video>
      <button
        ref="playButton"
        :class="[
          $style.playButton,
          { [$style.isPlayingButtonHide]: isPlaying },
        ]"
        aria-label="Play"
      ></button>
    </div>
  </div>
</template>

<style module>
.divOuter {
  display: flex;
  width: 100%;
}

/* Container to lock layout constraints */
.videoContainer {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  background-color: #000;
}

/* Ensure video expands to container dimensions */
.videoContainer video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Center the custom play button */
.playButton {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hover effects */
.playButton:hover {
  background-color: #ff0000;
  scale: 1.1;
}

/* CSS Pure Triangle Play Icon */
.playButton::before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px 0 15px 26px;
  border-color: transparent transparent transparent #ffffff;
  margin-left: 6px; /* Visual alignment compensation */
}

/* Hide button when video starts playing */
.isPlayingButtonHide {
  opacity: 0;
  pointer-events: none;
}
</style>
