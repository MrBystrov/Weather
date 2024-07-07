<template>
  <div class="container">
    
    <app-header @set-wether="setCurrentWeather"></app-header>
    <app-main ></app-main>
    <div class="loading" v-if="!store.currentCity && !store.currentWeather">LOADING </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { onMounted } from "vue";
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
import AppModal from "./components/AppModal.vue"
import type { ICity } from './types/types'
import type { ICityWeather } from './types/types'

import { useAppStore } from './stores/store'
const store = useAppStore()
const currentWeather = ref<ICityWeather>()


function setCurrentWeather(weather: ICityWeather): void {
  currentWeather.value = weather
}

</script>



<style scoped></style>
