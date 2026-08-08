<script setup>
const { syllable } = defineProps(['syllable']);
</script>

<template>
  <div :class="$style.syllableBoxOuter">
    <div :class="$style.syllableBoxInner">
      <div :class="$style.syllableBoxInnerLine">
        <div></div>
        <div></div>
      </div>
      <div :class="$style.syllableBoxInnerLine">
        <div></div>
        <div></div>
      </div>
      <div :class="$style.syllableBoxInnerSyllable">{{ syllable }}</div>
    </div>
  </div>
</template>

<style module>
.qItemLetter {
  width: 2.5rem;
  height: 2.5rem;
  border-color: #ddddde;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  font-size: 1rem;
}
.headerSpan {
  font-size: 1.7rem;
  font-weight: bold;
}
.syllableBoxOuter {
  display: flex;
  align-items: center;
  justify-content: center;
}
.syllableBoxInner {
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100px;
  border: 1px dotted #dddddd49;
  border-radius: 2px;
  position: relative;
  background-color: #b3b2b20d;

  & > div {
    flex: 1;
  }
}
.syllableBoxInnerLine {
  display: flex;
  & > div {
    flex: 1;
    /* border: 1px dotted #dddddd6a; */
  }
}
.syllableBoxInnerSyllable {
  position: absolute;
  font-size: 5rem;
  font-weight: 600;
  colo: rgb(5, 26, 53);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
