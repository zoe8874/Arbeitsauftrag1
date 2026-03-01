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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.shop-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.produkte {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.produkt {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #f0f0f0;
}

.produkt:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.produkt img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: 1.25rem;
  background: #fafafa;
  padding: 1rem;
}

.produkt h3 {
  margin: 0 0 0.75rem 0;
  color: #1a1a1a;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
}

.produkt p {
  margin: 0.35rem 0;
  color: #4a4a4a;
  font-size: 0.95rem;
  line-height: 1.5;
}

.produkt p:first-of-type {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.produkt p:last-of-type {
  flex: 1;
}

.preis {
  font-weight: 700;
  color: #2563eb;
  margin-top: 1rem;
  text-align: right;
  font-size: 1.35rem;
  letter-spacing: -0.01em;
  border-top: 1px solid #eaeaea;
  padding-top: 1rem;
}


.shop-container > p:first-of-type {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
  background: #f9f9f9;
  border-radius: 12px;
}

@media (max-width: 640px) {
  .shop-container {
    padding: 1rem;
  }
  
  .produkte {
    gap: 1rem;
  }
  
  .produkt {
    padding: 1rem;
  }
  
  .preis {
    font-size: 1.2rem;
  }
}
</style>