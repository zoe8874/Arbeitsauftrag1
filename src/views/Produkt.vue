<script setup>
import { ref, onMounted } from 'vue'

const produkte = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('https://ipt71.kuno-schuerch.bbzwinf.ch/product/list')
    if (!res.ok) throw new Error('Fehler beim Laden der Produkte')
    produkte.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>


<template>
  <div class="shop-container">
    

    <p v-if="loading">Lade Produkte...</p>
    <p v-if="error">{{ error }}</p>

    <div class="produkte">
      <div 
        v-for="produkt in produkte" 
        :key="produkt.id" 
        class="produkt"
      >
        <img v-if="produkt.image" :src="produkt.image" alt="Bild" />
        <h3>{{ produkt.title }}</h3>
        <p><strong>Autor:</strong> {{ produkt.author }}</p>
        <p>{{ produkt.description }}</p>
        <p class="preis">
          {{ Number(produkt.price ?? 0).toFixed(2) }} CHF
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.shop-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.produkte {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.produkt {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.produkt img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.produkt h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.produkt p {
  margin: 0.25rem 0;
  color: #666;
}

.preis {
  font-weight: bold;
  color: #2c3e50;
  margin-top: 0.5rem;
  text-align: right;
}
</style>