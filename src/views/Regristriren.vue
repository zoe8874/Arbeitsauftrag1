<template>
  <div class="contact-container">
    <div class="contact-header">
      <h1>Register</h1>
    </div>

    <form @submit.prevent="handleRegister" class="contact-form">
      <div class="form-group">
        <label>Username *</label>
        <input v-model="formData.username" required />
      </div>

      <div class="form-group">
        <label>Vorname *</label>
        <input v-model="formData.firstname" required />
      </div>

      <div class="form-group">
        <label>Nachname *</label>
        <input v-model="formData.lastname" required />
      </div>

      <div class="form-group">
        <label>Passwort *</label>
        <input type="password" v-model="formData.password" required />
      </div>

      <div class="form-group">
        <label>Sprache *</label>
        <select v-model="formData.language" required>
          <option value="de">Deutsch</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <button type="submit" class="submit-button" :disabled="submitting">
        {{ submitting ? "Wird registriert..." : "Register" }}
      </button>

      <p v-if="message" :style="{ color: success ? 'green' : 'red', marginTop: '1rem' }">
        {{ message }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = reactive({
  username: "",
  firstname: "",
  lastname: "",
  password: "",
  language: "de",
});

const submitting = ref(false);
const message = ref("");
const success = ref(false);

const handleRegister = async () => {
  if (submitting.value) return;

  submitting.value = true;
  message.value = "";

  try {
    const response = await fetch(
      "https://ipt71.kuno-schuerch.bbzwinf.ch/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Register fehlgeschlagen");
    }

    success.value = true;
    message.value = "Registration erfolgreich! Weiter zum Login...";

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (error) {
    success.value = false;
    message.value = "Registration fehlgeschlagen.";
  } finally {
    submitting.value = false;
  }
};
</script>


<style scoped>


.contact-header {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-header h1 {
  color: #2f3a2f;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.contact-subtitle {
  color: #4f5b4a;
  font-size: 1.1rem;
}



.contact-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}



.contact-info {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 576px) {
  .contact-info {
    grid-template-columns: repeat(2, 1fr);
  }
}












.form-group input[type="email"],
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #cfd8c0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  background-color: #ffffff;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #6a7f62;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}



.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-group label {
  cursor: pointer;
  user-select: none;
}



.submit-button {
  width: 100%;
  padding: 1rem;
  background-color: #4f6448;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  
}




</style>