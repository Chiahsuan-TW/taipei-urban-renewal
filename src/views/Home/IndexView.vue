<script setup>
// Components
import Map from '@/components/Home/Map.vue'
import ListItem from '@/components/Home/ListItem.vue'
import Spinner from '@/components/Shared/Spinner.vue'
// Base
import { ref, computed } from 'vue'
// Store
import { useLoadingStore } from '@/stores/loading'
// Api
import { getCoordinates, getUrbanRenewalLocation, getUrbanRenewalArea } from '@/api/home.js'

const loadingStore = useLoadingStore()
const isLoading = computed(() => loadingStore.getLoadingStatus())

getUrbanRenewalAreaHandler()

const address = ref('')
const coordinates = ref({ lat: NaN, lng: NaN })

async function searchHandler(address) {
  if (address === '') return
  await getCoordinatesHandler(address)
  getUrbanRenewalLocationHandler(coordinates.value)
}

async function getCoordinatesHandler(address) {
  const params = {
    address,
    key: import.meta.env.VITE_APP_GEOCODING_API_KEY
  }
  await getCoordinates(params).then((res) => {
    coordinates.value = res.data.results[0]?.geometry?.location
  })
}

const locationList = ref([])
async function getUrbanRenewalLocationHandler(coordinates) {
  if (coordinates === undefined) return window.alert('請輸入有效地址喔～')

  loadingStore.addLoadingKey()
  await getUrbanRenewalLocation(coordinates).then((res) => {
    locationList.value = res.data.result
  })
  loadingStore.removeLoadingKey()
}

const areaDataList = ref([])
async function getUrbanRenewalAreaHandler() {
  loadingStore.addLoadingKey()
  const params = {
    directory: 'tucheng.json'
  }
  await getUrbanRenewalArea(params).then((res) => {
    areaDataList.value = res.data.result.features.map((feature) => feature.geometry.coordinates[0])
  })
  loadingStore.removeLoadingKey()
}
</script>

<template>
  <div class="wrapper">
    <Map :locationList="locationList" :areaDataList="areaDataList" />

    <section>
      <input
        @keyup.enter="searchHandler(address)"
        v-model="address"
        placeholder="請輸入您要查詢的位置"
        type="text"
      />
      <button @click="searchHandler(address)" class="search" type="button">
        <i class="fas fa-search fa-lg"></i>
      </button>
      <div class="location-list">
        <ListItem :locationList="locationList" />
      </div>
    </section>
    
    <Spinner :show="isLoading" />
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
}

.search {
  border: none;
  cursor: pointer;
}

.location-list {
  margin-top: 1rem;
  height: calc(100dvh - 35rem);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

section {
  margin-top: 1rem;
  padding: 0 2rem;
}

input {
  padding: 0.5rem;
  outline: none;
  min-width: 20rem;
  border-radius: 0.25rem;
  font-size: 1rem;
}
</style>
