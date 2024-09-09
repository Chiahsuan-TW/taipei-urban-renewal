<script setup>
defineProps({
  locationList: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="list-item" v-for="(location, index) in locationList" :key="index">
    <span class="stop-name">{{ location.stop_name }}</span>
    <p class="distance">
      <span>{{ location.distance }}</span>
      <span>km</span>
    </p>
  </div>
</template>

<style scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid gray;
  border-radius: 0.5rem;
  background-color: white;
}

.distance {
 color: #3961a2
}

.list-item span:not(:last-child) {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
