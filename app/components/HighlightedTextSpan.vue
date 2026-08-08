<script setup>
const { text } = defineProps(['text']);
</script>

<template>
  <span :class="$style.outerSpan"
    ><span :class="$style.leftBracket">[</span
    ><span :class="$style.highlightedText">{{ text }}</span
    ><span :class="$style.rightBracket">]</span></span
  >
</template>

<style module>
.leftBracket {
  color: #8b8b8b;
}
.rightBracket {
  color: #8b8b8b;
}
.highlightedText {
  color: #252525;
  padding: 0 5px;
  border-radius: 2px;
}
.outerSpan {
  background-color: #e9e9e9;
  font-size: 1.2rem;
}
</style>
