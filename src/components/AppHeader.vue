<template>
  <div class="container">
    {{ currentWeather }}
    <header class="header flex">
      <input type="text" class="header__search" placeholder="Chose your city" :value="cityName" @change="getCitiesList" />
      <div class="modal-bg" v-if="citiesList && !store.isInputClear">
        <ul class="header__cities-list flex">
          <li class="header__cities-title">
            <h3 class="title">Chose your city</h3>
          </li>
          <li v-for="city in citiesList" :key="city.id" class="header__cities-item city flex"
            @click="setCurrentCity(city)">
            <b class="city__name">{{ city.name }}</b>
            <span class="city__country">{{ city.country }}</span>
            <span class="city__country">{{ city.admin1 }}</span>
            <span class="city__timezone">{{ city.timezone }}</span>
          </li>
          <button class="modal-close btn" @click="store.isInputClear = true">CLOSE</button>
        </ul>
        
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { ICity } from '../types/types';
import { useAppStore } from '../stores/store'
import type { ICityWeather } from '../types/types';


const store = useAppStore()


const citiesList = ref<ICity>()
const currentCity = ref<ICity>()
const currentWeather = ref<ICityWeather | null>(null)


watch(currentCity, ()=> {
    store.currentCity = currentCity.value;
})

watch(currentCity, () => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=' + store.currentCity.latitude + '&longitude=' + store.currentCity.longitude + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,sunrise,sunset,wind_speed_10m_max&timezone=auto'
    )
        .then(res => res.json())
        .then(data => store.currentWeather = data)
}, { deep: true })

function updateCity(event: any) {
  fetch(
    'https://geocoding-api.open-meteo.com/v1/search?name=' +
      event.target.value +
      '&count=10&language=en&format=json'
  )
    .then((res) => res.json())
    .then((data) => (citiesList.value = data.results))
}

function getCitiesList(event: any) {
  updateCity(event)
  if(event.target.value !== '') {
    store.isInputClear = false
  }
}

function setCurrentCity(city: ICity){
    store.isInputClear = true
    currentCity.value = city
    emit('set-weather', currentWeather)
}

const emit = defineEmits(['get-cities', 'set-weather'])
const cityName = ref<string>('')


onMounted (() => {
  fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=' + store.currentCity.latitude + '&longitude=' + store.currentCity.longitude + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,sunrise,sunset,wind_speed_10m_max&timezone=auto'
  )
    .then(res => res.json())
    .then(data => store.currentWeather = data)
    
})
</script>

<style scoped>
.header {
  padding: 30px;
}
.header__checkbox-invis {
  appearance: none;
  position: absolute;
}
.header__checkbox-vis {
  position: relative;
  width: 76px;
  height: 38px;
  border-radius: 40px;
  background-color: #d9d9d9;
  border: 1px solid #000;
  border: none;
  cursor: pointer;
}
.header__checkbox-vis:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  background-color: black;
  width: 38px;
  height: 38px;
  border-radius: 100%;
  transition: transform 0.3s;
}

.header__checkbox-invis:checked + .header__checkbox-vis:after {
  transform: translate(38px, 0);
}
.header__search {
  flex-basis: 50%;
  padding: 20px 80px 20px 102px;
  color: var(--search-text);
  height: 62px;
  background-color: var(--main-bg);
  border-radius: 40px;
  box-shadow: 0 4px 40px 0 rgba(0, 0, 0, 0.25);
  border: none;
  background-image: url('../assets/img/icons/search 1.svg');
  background-repeat: no-repeat;
  background-position: 32px 50%;
  font-size: 22px;
}
.header__cities-list {
    flex-direction: column;
    align-items: start;
    justify-content: start;
    row-gap: 20px;
    position: absolute;
    min-width: 50%;
    min-height: 50%;
    padding: 30px;
    border-radius: 30px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--modal-bg);
}
.header__cities-item {
    column-gap: 20px;
    justify-content: start;
    cursor: pointer;
}
.header__cities-title::marker {
    list-style: none;
}
.modal-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
}
.modal-close {
  position: absolute;
  padding: 5px 10px;
  right: 20px;
  border: 1px solid var(--main-text);
}
</style>