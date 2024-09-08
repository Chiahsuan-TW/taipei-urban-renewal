<script setup>
import L from 'leaflet'
import { onMounted, ref } from 'vue'
import {
  useGoogleAvatarStorage,
  useFacebookAvatarStorage
} from '@/utils/composables/useLocalStorage'

// 預設帶新北市板橋座標
const DEFAULT_COORDINATES = [25.009, 121.459]

const map = ref(null)
const marker = ref(null)
onMounted(() => {
  map.value = initMap()
  marker.value = addMarker(DEFAULT_COORDINATES, map.value)
  bindPopup()
})

function initMap() {
  const mapConfig = {
    center: DEFAULT_COORDINATES,
    zoom: 13,
    zoomControl: true,
    layers: [
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      })
    ]
  }
  return L.map('map', mapConfig)
}

// Marker
function addMarker(coordinates) {
  if (map.value === null) return
  return L.marker(coordinates).addTo(map.value)
}

// Popup
function bindPopup() {
  if (marker.value === null) return

  const googleStrage = useGoogleAvatarStorage()
  const facebookStorage = useFacebookAvatarStorage()
  const googleAvatar = googleStrage.getLocalStorageData()
  const facebookAvatar = facebookStorage.getLocalStorageData()

  const popupContent = `
<p class="popup-text">目前的位置</p>
<div class="avatar-group">
    <img class="avatar" src="${googleAvatar}" alt="Google Avatar" />
    <img class="avatar" src="${facebookAvatar}" alt="Facebook Avatar"/>
  </div>
`

  marker.value.bindPopup(popupContent).openPopup()
}
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 30rem;
}

:deep(.popup-text) {
  font-weight: 500;
}

:deep(.avatar-group) {
  display: flex;
  gap: 0.5rem;
}

:deep(.avatar) {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
</style>
