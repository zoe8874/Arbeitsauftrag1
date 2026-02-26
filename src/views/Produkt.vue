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
    <h1>Online Buchshop</h1>

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
  display: flex;
  flex-direction: wrap-reverse;
}

.produkte {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
img {
  width: 50%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}

.produkt {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
}

.preis {
  font-weight: bold;
}
</style>