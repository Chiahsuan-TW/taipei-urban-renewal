<script setup>
// Components
import Map from '@/components/Home/Map.vue'
import ListItem from '@/components/Home/ListItem.vue'
// Base
import { ref } from 'vue'
// Api
import { getCoordinates, getUrbanRenewalLocation } from '@/api/home.js'

const address = ref('')
const coordinates = ref({ lat: NaN, lng: NaN })

async function searchHandler(address) {
  await getCoordinatesHandler(address)
  getUrbanRenewalLocationHandler(coordinates.value)
}

async function getCoordinatesHandler(address) {
  if (address === '') return

  const params = {
    address,
    key: import.meta.env.VITE_APP_GEOCODING_API_KEY
  }
  await getCoordinates(params).then((res) => {
    coordinates.value = res.data.results[0].geometry.location
  })
}

const locationList = ref([])
function getUrbanRenewalLocationHandler(coordinates) {
  getUrbanRenewalLocation(coordinates).then((res) => {
    locationList.value = res.data.result
  })
}
</script>

<template>
  <div>
    <Map :locationList="locationList" />

    <section>
      <input
        @keyup.enter="searchHandler(address)"
        v-model="address"
        placeholder="請輸入您要查詢的位置"
        type="text"
      />

      <div class="location-list">
        <ListItem :locationList="locationList" />
      </div>
    </section>
  </div>
</template>

<style scoped>
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
  padding: 0 1rem;
}

input {
  padding: 0.5rem;
  outline: none;
  min-width: 20rem;
  border-radius: 0.25rem;
  border: 0px;
  font-size: 1rem;
}
</style>
