<template>
<div class="not-found">
  <i class="fas fa-exclamation-triangle fa-5x error"></i>
  <h1>404 錯誤</h1>
  <p>找不到此頁面</p>
</div>
</template>

<style scoped>
.not-found {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.error {
  color: #d61212;
}
</style>