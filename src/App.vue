<!-- src/App.vue -->
<template>
    <div class="container">
      <h1>🚀 Electron + Vue 3</h1>
      <p>Десктоп-приложение на современном стеке</p>
      
      <div class="info-card">
        <h3>Информация о системе</h3>
        <p><strong>Платформа:</strong> {{ systemInfo.platform }}</p>
        <p><strong>Node.js версия:</strong> {{ systemInfo.nodeVersion }}</p>
        <p><strong>Vue версия:</strong> {{ vueVersion }}</p>
      </div>
      
      <div class="counter">
        <h3>Счётчик для демонстрации реактивности</h3>
        <p>Значение: {{ counter }}</p>
        <button @click="increment">+1</button>
        <button @click="decrement">-1</button>
        <button @click="reset">Сброс</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const counter = ref(0);
  const vueVersion = '3.x';
  const systemInfo = ref({
    platform: 'unknown',
    nodeVersion: 'unknown'
  });
  
  function increment() {
    counter.value++;
  }
  
  function decrement() {
    counter.value--;
  }
  
  function reset() {
    counter.value = 0;
  }
  
  onMounted(() => {
    // Получаем данные из Electron через preload
    if (window.electronAPI) {
      systemInfo.value = {
        platform: window.electronAPI.platform,
        nodeVersion: window.electronAPI.nodeVersion
      };
    }
  });
  </script>
  
  <style scoped>
  .container {
    font-family: system-ui, -apple-system, sans-serif;
    text-align: center;
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .info-card {
    background: #f5f5f5;
    border-radius: 12px;
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .counter {
    margin-top: 2rem;
  }
  
  button {
    margin: 0 0.25rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    background: #42b883;
    color: white;
    border: none;
    border-radius: 6px;
  }
  
  button:hover {
    background: #33a06f;
  }
  </style>