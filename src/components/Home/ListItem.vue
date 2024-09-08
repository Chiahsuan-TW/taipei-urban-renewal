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
    <span>{{ location.stop_name }}</span>
    <p>
      <span>{{ location.distance }}</span>
      <span>km</span>
    </p>
  </div>
</template>

<style scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border: 1px solid gray;
  border-radius: 0.5rem;
}

.list-item span:not(:last-child) {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
