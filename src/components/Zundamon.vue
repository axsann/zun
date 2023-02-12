<script setup lang="ts">
import { ref } from 'vue'
import base from '../assets/img/zundamon-base.webp'
import bothArms from '../assets/img/zundamon-both-arms.webp'
import mame from '../assets/img/zundamon-mame.webp'
import hoppe from '../assets/img/zundamon-hoppe.webp'
import mouthClosed from '../assets/img/zundamon-mouth-closed.webp'
import eyeNormal from '../assets/img/zundamon-eye-normal.webp'
import eyebrowNormal from '../assets/img/zundamon-eyebrow-normal.webp'

defineProps<{ size: string }>()

const speaking = ref(false)

function onClick() {
  speaking.value = !speaking.value;
}

const count = ref(0)
</script>

<template>
  <div style="position: fixed;bottom: 438px;left: 0;right: 375px;display: flex;justify-content: flex-end;">
    <div @click="onClick" :class="{ 'puyon': speaking }" style="position: relative;">
      <img :src="base" style="position: absolute;" />
      <img :src="bothArms" style="position: absolute;" />
      <img :src="mame" style="position: absolute;" />
      <img :src="hoppe" style="position: absolute;" />
      <img :src="mouthClosed" style="position: absolute;" />
      <img :src="eyeNormal" style="position: absolute;" />
      <img :src="eyebrowNormal" style="position: absolute;" />
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.puyon {
  animation: puyon 1.2s infinite;
}

@keyframes puyon {
  0% {
    transform: scale(1.0, 1.0);
  }

  25% {
    transform: scale(1.0, 1.02);
    margin-top: -2%;
  }

  50% {
    transform: scale(1.0, 1.0);
    margin-top: 0;
  }

  75% {
    transform: scale(1.0, 1.02);
    margin-top: -2%;
  }

  100% {
    transform: scale(1.0, 1.0);
    margin-top: 0;
  }
}
</style>
