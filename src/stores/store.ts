import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ICity } from '@/types/types'
import type { ICityWeather } from '@/types/types'

export const useAppStore = defineStore('counter', () => {
  const currentCity = ref<Partial<ICity>>({admin1:"Krasnodarskiy Kray",
    admin1_id:542415,
    country:"Russia",
    country_code:"RU",
    country_id:2017370,
    elevation:28,
    feature_code:"PPLA",
    id:542420,
    latitude:45.04484,
    longitude:38.97603,
    name:"Krasnodar",
    population:649851,
    timezone:"Europe/Moscow"})
  
  async function getCity (url: string): Promise<ICity> {
    const response = await fetch (url) 
    return response.json()
  }

  const currentWeather = ref<ICityWeather>()

  const isInputClear = ref(true)
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }
  const cityWeather = ref({})

  const colorMode = ref<boolean>(true)

  async function getCityWeather(url: string): Promise<ICityWeather> {
    const response = await fetch(url)
    return response.json() 
  }

   

  return { currentCity, getCityWeather, getCity, isInputClear, currentWeather, colorMode }
})
