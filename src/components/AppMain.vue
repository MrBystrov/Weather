<template>
    <main class="main flex" v-if="store.currentCity && store.currentWeather">
        <h1 class="visually-hidden">
            Weather forcast application
        </h1>
        <div class="main__general main-item">
            <h2 class="main__city title">{{ store.currentCity !== null ? store.currentCity.name : 'Chose your city' }}
            </h2>
            <p class="main__time text">{{ correctTime(new Date().getTime() + (store.currentWeather?.utc_offset_seconds / 60)) }}</p>
            <p class="main__date text">{{ formatter.format(currentDate)  }}</p>
        </div>
        <div class="main__weather-hourly hourly main-item">
            <h2 class="hourly-title title">Hourly weather forecast</h2>
            <ul class="hourly__temp list-reset flex">
                <li class="hourly__item flex" v-for="hour in 24" :key="hour">
                    <span class="hourly__item-time">{{ correctTime(store.currentWeather?.hourly.time[hour])   }}</span>
                    <span class="hourly__temp">{{ store.currentWeather?.hourly.temperature_2m[hour] !==undefined ?  Math.round(store.currentWeather?.hourly.temperature_2m[hour]) : ''}}&ordm;</span>
                    <span class="hourly__wind">{{ store.currentWeather?.hourly.wind_speed_10m[hour] ? Math.round(store.currentWeather?.hourly.wind_speed_10m[hour]) : '' }}km/h</span>
                </li>
            </ul>
        </div>
        <div class="main__weather-now now main-item ">
            <h2 class="now__title title">Actual weather</h2>

            <div class="now__content flex">
                <div class="now__item-temp temp flex">
                    <span class="temp__actual">{{ Math.round(store.currentWeather?.current.temperature_2m) }}&ordm;C</span>
                    <span class="temp__feels">Feels like: {{
                        Math.round(store.currentWeather?.current.apparent_temperature)}}&ordm;</span>
                   </div>
                <img :src="`./src/assets/img/icons/${store.currentWeather?.current.weather_code }.svg`" alt="Weather state"
                    class="now__weather">
                <ul class="now__other other list-reset flex">
                    <li class="other__item other__humidity flex">
                        <span class="other__info"> {{ store.currentWeather?.current.relative_humidity_2m }} </span>
                        <span class="other__title text">Humidity</span>
                    </li>
                    <li class="other__item other__wind flex">
                        <span class="other__info">{{ store.currentWeather?.current.wind_speed_10m }} km/h</span>
                        <span class="other__title text">Wind</span>
                    </li>
                    <li class="other__item other__wind-dir flex">
                        <span class="other__info">{{ store.currentWeather?.current.wind_direction_10m }}Deg</span>
                        <span class="other__title text">Wind direction</span>
                    </li>
                    <li class="other__item other__pressure flex">
                        <span class="other__info">{{ store.currentWeather?.current.surface_pressure!== undefined ?  Math.round(store.currentWeather?.current.surface_pressure) : '' }}hPa
                        </span>
                        <span class="other__title text">Pressure</span>
                    </li>
                </ul>
            </div>
            
            
        </div>

        <div class="main__weekly-cont main-item">
            <h2 class="weekly-title title">
                Weekly weather forecast
            </h2>
            <ul class="main__weekly-temp weekly list-reset flex">
                <li class="weekly__item flex" v-for="day  in 6" :key="day">
                    <span class="weekly__item-temp">{{
                        store.currentWeather?.daily.temperature_2m_max[day] !== undefined ? Math.round(store.currentWeather?.daily.temperature_2m_max[day]) : ''}}&ordm;</span>
                    <img :src="`/src/assets/img/icons/${store.currentWeather?.current.weather_code }.svg`"
                        alt="Weather condition">
                    <p class="weekly__item-date">{{ store.currentWeather?.daily.time[day] }}</p>
                </li>
            </ul>
        </div>
    </main>
</template>

<script setup lang="ts">
    import {useAppStore} from '../stores/store'
    import type { ICity } from '../types/types';

    const store = useAppStore()
    const currentDate = store.currentWeather?.current.time

    const props = defineProps<{
        city: ICity
    }>()

    function correctTime(time: any) {
        let hrs: number = new Date(time).getHours();
        let mins = new Date(time).getMinutes()
        if (hrs < 10 ) {
            hrs = '0' + hrs 
        } 
        if (mins < 10 ) {
            mins = '0' + mins
        } 
        
        
        return hrs + ':' + mins
    }

    let formatter = new Intl.DateTimeFormat("ru", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
});
 
</script>

<style scoped>
    .main {
        gap: 30px;
        align-items: stretch;
        
    }
    .main-item {
        min-height: 330px;
        flex: 0 0 35%;
        background-color: var(--block-bg);
    }
    .main__general {
        padding: 50px 107px;
    }
    
    .main__time, .main__weather-now {
        font-size: 96px;
    }
    .main__weather-hourly, .main__weekly-cont, .main__weather-now {
        
        padding: 13px 40px;
        flex-grow: 1;
        
    }
    .main__weather-hourly, .main__weekly-cont, .main__general, .main__weather-now{
        box-shadow: 10px 10px 4px 0 rgba(0, 0, 0, 0.5);
        border-radius: 30px;
    }
    .hourly__item {
        padding: 12px 7px;
        border-radius: 10px;
        flex-direction: column;
        row-gap: 20px;
        background-color: var(--sec-bg);
    }
    .now__content {
        gap: 20px;
        flex-wrap: nowrap;
    }
    .now__other {

        gap: 20px;
        font-size: 18px;
    }
    .temp__actual {
        font-size: 48px;
    }
    .other__item {
        flex: 0 0 40%;
        padding-top: 75px;
        flex-direction: column;
        background-repeat: no-repeat;
        background-position: center 3px;
    }
    .other__humidity {
        background-image: url('../assets/img/icons/humidity.svg');
    }
    .other__wind {
        background-image: url('../assets/img/icons/wind.svg');
    }
    .other__wind-dir {
        background-image: url('../assets/img/icons/wind.svg');
    }
    .other__pressure {
        background-image: url('../assets/img/icons/pressure.svg');
    }
    .other__info {
        font-weight: 700;
        font-size: 30px;
    }
    .hourly__temp {
        justify-content: start;
        gap: 10px;
    }
    .now__image {
        width: 50px;
        height: 50px;
    }
    .now__weather {

        width: 100px;
        height: 100px;
    }
    .temp {
        flex-direction: column;
         font-size: 24px;
    }
    .main__weekly-cont {
        flex-grow: 0;
    }
    .weekly {
        align-items: start;
        flex-direction: column;
        font-size: 20px;
    }
    .weekly__item {
        gap: 30px;
    }
</style>