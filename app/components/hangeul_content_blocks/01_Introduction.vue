<script setup></script>

<template>
  <div>
    <p class="text-h6 q-pt-md">
      Hangeul <span :class="$style.headerSpan">한글</span>
    </p>
    <p>
      한글 (Hangeul) is the writing system of the Korean language. Hangeul
      letters are written in the square blocks called syllable.
    </p>
    <p>
      The simplest syllable could be formed of two letters. As the vowel letters
      "ㅏ", "ㅓ", "ㅣ", "ㅗ", "ㅜ", "ㅡ" could not form a complete syllable just
      by a single vowel letter, they have to be paired with the consonant letter
      "ㅇ".
    </p>
    <blockquote>
      The Korean letter "ㅇ" (called
      <span style="font-style: italic">ieung</span>), it has two different
      pronunciations depending on where it sits in a syllable block: it is
      silent at the start of a block (as it is in the following examples), and
      it sounds like "ng" at the bottom.
      <p>
        When you add letter "ㅇ" before a vowel it remains silent and acts as a
        consonant placeholder for the vowel sound.
      </p>
    </blockquote>
    <p>
      For example syllable with two letters: the vowel letter "ㅓ" and the
      consonant letter "ㅇ". The letter "ㅓ" is vertical and could fill up the
      height and the letter "ㅇ" is written in prolonged shape to reflect that
      placement as well. So the syllable is formed by placing the two letters
      from left to right to fit the box.
    </p>
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
        <div :class="$style.syllableBoxInnerSyllable">아</div>
      </div>
    </div>
    <p>&nbsp;</p>
    <p>
      A syllable could be formed with the horizontally long vowel "ㅜ". The
      letter are placed one on top and the other at the bottom to fit the
      syllable box.
    </p>
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
        <div :class="$style.syllableBoxInnerSyllable">우</div>
      </div>
    </div>
    <p>&nbsp;</p>
    <p>
      Example with three letters, the firsl letter is consonant "ㅅ", the second
      is vowel "ㅏ" and the third is consonant "ㄴ". To fit three letters into
      the box the upper two letters are written in a slightly shorter form, and
      the third consonant placed below the first two letters above.
    </p>
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
        <div :class="$style.syllableBoxInnerSyllable">산</div>
      </div>
    </div>
    <p>&nbsp;</p>
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
  width: 200px;
  height: 200px;
  border: 1px dashed #dddedf;
  position: relative;

  & > div {
    flex: 1;
  }
}
.syllableBoxInnerLine {
  display: flex;
  & > div {
    flex: 1;
    border: 1px dotted #dddddd6a;
  }
}
.syllableBoxInnerSyllable {
  position: absolute;
  font-size: 8rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
