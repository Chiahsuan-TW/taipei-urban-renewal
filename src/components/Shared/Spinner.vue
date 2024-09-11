<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <Transition name="fade">
    <div v-show="show" class="spinner">
      <i class="fas fa-circle-notch fa-spin fa-5x custom-icon"></i>
      <span class="spinner-text">
        <span>載入中...</span>
      </span>
    </div>
  </Transition>
</template>

<style scoped>
.spinner {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.75);
}

.spinner-text {
  font-weight: 500;
  color: gray;
  margin-top: 1rem;
}

.custom-icon {
  color: #3961a2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
