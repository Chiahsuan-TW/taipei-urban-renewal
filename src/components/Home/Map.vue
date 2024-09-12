<script setup>
// Base
import L from 'leaflet'
import { onMounted, ref, watch, computed } from 'vue'
// Store
import { useUserStore } from '@/stores/user'
// Util
import {
  useGoogleAvatarStorage,
  useFacebookAvatarStorage
} from '@/utils/composables/useSessionStorage'

const props = defineProps({
  locationList: {
    type: Array,
    required: true
  },
  areaDataList: {
    type: Array,
    required: true
  }
})

const { userCoordinates } = useUserStore()

// 若使用者不允許偵測位置則預設帶新北市土城區公所座標
const DEFAULT_COORDINATES = [24.972, 121.443]
const userCurrentLocation = computed(() => userCoordinates ?? DEFAULT_COORDINATES)

const map = ref(null)
const marker = ref(null)
onMounted(() => {
  map.value = initMap()
  marker.value = addMarker(userCurrentLocation.value, map.value)
  bindPopup()
})

function initMap() {
  const mapConfig = {
    center: userCurrentLocation.value,
    zoom: 16,
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
  const googleAvatar = googleStrage.getSessionStorageData()
  const facebookAvatar = facebookStorage.getSessionStorageData()

  const popupContent = `
<p class="popup-text">目前的位置</p>
<div class="avatar-group">
    <img class="avatar" src="${googleAvatar}" alt="Google Avatar" />
    <img class="avatar" src="${facebookAvatar}" alt="Facebook Avatar"/>
  </div>
`

  marker.value.bindPopup(popupContent, { minWidth: 120 }).openPopup()
}

watch(
  () => props.locationList,
  (newValues) => {
    newValues.forEach(({ latitude, longitude }) => {
      L.marker([latitude, longitude]).addTo(map.value)
    })
  }
)

watch(
  () => props.areaDataList,
  (newAreaDataList) => {
    addPolygons(newAreaDataList)
  }
)

function addPolygons(dataList) {
  const polygonList = dataList.map((coordinates) => {
    const polygon = coordinates.map(([longitude, latitude]) => [latitude, longitude])
    return L.polygon(polygon, { color: '#5d38bf', fillColor: '#a48afb', fillOpacity: 0.5 })
  })
  L.featureGroup(polygonList).addTo(map.value)
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
