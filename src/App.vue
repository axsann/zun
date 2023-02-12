<script setup lang="ts">
import { computed, ref, Ref } from 'vue';
import Zundamon from './components/Zundamon.vue'
import topPageOutJson from './assets/output-json/top-page-out.json'

const audioRef = ref<HTMLAudioElement | null>(null);
const isSpeakingRef = ref<boolean>(false);

function onPlay() {
  if (!audioRef.value) return;
  audioRef.value.removeEventListener('play', onPlay);
  isSpeakingRef.value = true;
}
function onEnded() {
  if (!audioRef.value) return;
  audioRef.value.removeEventListener('ended', onEnded);
  isSpeakingRef.value = false;
}

function onCanplaythrough() {
  if (!audioRef.value) return;
  audioRef.value.removeEventListener('canplaythrough', onCanplaythrough);
  audioRef.value.play();
}

function onClickPlay() {
  const audioFile = Object.values(topPageOutJson)[0].audioFile;
  audioRef.value = new Audio(`/${audioFile}`);

  // 実体ファイルをロードします。
  audioRef.value.load();

  audioRef.value.addEventListener('play', onPlay);
  audioRef.value.addEventListener('ended', onEnded);

  // readyStateからロード状態を判断します。
  if (audioRef.value.readyState === 4) {
    audioRef.value.play();
  } else {
    // 再生可能状態でなければ再生可能状態になった時のイベント通知をセットします
    audioRef.value.addEventListener('canplaythrough', onCanplaythrough);
  }
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/img/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <button @click="onClickPlay">再生</button>
  <Zundamon :is-speaking="isSpeakingRef" size="70%" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
