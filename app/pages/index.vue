<script setup lang="ts">
import { useQuasar } from 'quasar';
import type { QBtnProps, QNotifyOptions } from 'quasar';
import Introduction from '~/components/hangeul_content_blocks/01_Introduction.vue';
import BasicVowels from '~/components/hangeul_content_blocks/02_BasicVowels.vue';

const { dialog, bottomSheet, loading, loadingBar, notify, dark, screen } =
  useQuasar();

loadingBar.setDefaults({
  color: 'green',
  size: '15px',
  position: 'bottom',
});

const themeIcon = computed(() => (dark.isActive ? 'dark_mode' : 'light_mode'));

const showBottomsheet = () =>
  bottomSheet({
    message: 'Bottom Sheet',
    actions: [
      {
        label: 'Drive',
        img: 'https://cdn.quasar.dev/img/logo_drive_128px.png',
        id: 'drive',
      },
      {
        label: 'Keep',
        img: 'https://cdn.quasar.dev/img/logo_keep_128px.png',
        id: 'keep',
      },
      {
        label: 'Google Hangouts',
        img: 'https://cdn.quasar.dev/img/logo_hangouts_128px.png',
        id: 'calendar',
      },
      {
        label: 'Calendar',
        img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png',
        id: 'calendar',
      },
    ],
  });

const random = <T extends string>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)];

type Position = Exclude<QNotifyOptions['position'], undefined>;

const buttons: QBtnProps[] = [
  {
    label: 'Bottomsheet',
    onClick: () => showBottomsheet(),
  },
  {
    label: 'Loading',
    onClick: () => {
      loading.show();
      setTimeout(() => {
        loading.hide();
      }, 1000);
    },
  },
  {
    label: 'LoadingBar',
    onClick: () => {
      loadingBar.start();
      setTimeout(() => {
        loadingBar.stop();
      }, 1000);
    },
  },
  {
    label: 'Dialog',
    onClick: () => dialog({ message: 'Hello World' }),
  },
  {
    label: 'Notify',
    onClick: () =>
      notify({
        message: 'Hello World',
        position: random<Position>([
          'left',
          'right',
          'center',
          'bottom',
          'top',
        ]),
      }),
  },
];

const hangeul = {
  vowels: [
    { hangeul: 'ㅏ', syllable: '아' },
    { hangeul: 'ㅓ', syllable: '어' },
    { hangeul: 'ㅣ', syllable: '이' },
    { hangeul: 'ㅗ', syllable: '오' },
    { hangeul: 'ㅜ', syllable: '우' },
    { hangeul: 'ㅡ', syllable: '으' },
  ],
  compoundVowels: [
    { hangeul: 'ㅐ', syllable: '애', baseHangeul: 'ㅏ' },
    { hangeul: 'ㅑ', syllable: '야', baseHangeul: 'ㅏ' },
    { hangeul: 'ㅒ', syllable: '얘', baseHangeul: 'ㅏ' },
    { hangeul: 'ㅔ', syllable: '에', baseHangeul: 'ㅓ' },
    { hangeul: 'ㅕ', syllable: '여', baseHangeul: 'ㅓ' },
    { hangeul: 'ㅖ', syllable: '예', baseHangeul: 'ㅓ' },
    { hangeul: 'ㅘ', syllable: '와', baseHangeul: 'ㅗ' },
    { hangeul: 'ㅙ', syllable: '왜', baseHangeul: 'ㅗ' },
    { hangeul: 'ㅚ', syllable: '외', baseHangeul: 'ㅗ' },
    { hangeul: 'ㅛ', syllable: '요', baseHangeul: 'ㅗ' },
    { hangeul: 'ㅝ', syllable: '워', baseHangeul: 'ㅜ' },
    { hangeul: 'ㅞ', syllable: '웨', baseHangeul: 'ㅜ' },
    { hangeul: 'ㅟ', syllable: '위', baseHangeul: 'ㅜ' },
    { hangeul: 'ㅠ', syllable: '유', baseHangeul: 'ㅜ' },
    { hangeul: 'ㅢ', syllable: '의', baseHangeul: 'ㅡ' },
  ],
  consonants: [
    { hangeul: 'ㄱ', syllable: '' },
    { hangeul: 'ㄴ', syllable: '' },
    { hangeul: 'ㄷ', syllable: '' },
    { hangeul: 'ㄹ', syllable: '' },
    { hangeul: 'ㅁ', syllable: '' },
    { hangeul: 'ㅂ', syllable: '' },
    { hangeul: 'ㅅ', syllable: '' },
    { hangeul: 'ㅇ', syllable: '' },
    { hangeul: 'ㅈ', syllable: '' },
    { hangeul: 'ㅊ', syllable: '' },
    { hangeul: 'ㅋ', syllable: '' },
    { hangeul: 'ㅌ', syllable: '' },
    { hangeul: 'ㅍ', syllable: '' },
    { hangeul: 'ㅎ', syllable: '' },
  ],
  doubleConsonants: [
    { hangeul: 'ㄲ', syllable: '', baseHangeul: 'ㄱ' },
    { hangeul: 'ㄸ', syllable: '', baseHangeul: 'ㄷ' },
    { hangeul: 'ㅃ', syllable: '', baseHangeul: 'ㅂ' },
    { hangeul: 'ㅆ', syllable: '', baseHangeul: 'ㅅ' },
    { hangeul: 'ㅉ', syllable: '', baseHangeul: 'ㅈ' },
  ],
};
</script>

<template>
  <q-page class="q-pl-lg">
    <Introduction />
    <BasicVowels />
  </q-page>
</template>

<style module></style>
