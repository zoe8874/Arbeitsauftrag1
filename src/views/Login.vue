<template>
  <div class="contact-container">
    <div class="contact-header">
      <h1>Login</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="Login-form">
      <div class="form-group">
        <label>Username</label>
        <input type="text" v-model="formData.username" required />
      </div>

      <div class="form-group">
        <label>Passwort</label>
        <input type="password" v-model="formData.password" required />
      </div>

      <button type="submit" class="submit-button" :disabled="submitting">
        {{ submitting ? "Wird eingeloggt..." : "Login" }}
      </button>

      <p v-if="error" style="color:red; margin-top:1rem;">
        {{ error }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { isLoggedIn } from "../auth";

const router = useRouter();

const formData = reactive({
  username: "",
  password: "",
});

const submitting = ref(false);
const error = ref("");

const handleSubmit = async () => {
  if (submitting.value) return;

  if (!formData.username || !formData.password) {
    error.value = "Bitte alle Pflichtfelder ausfüllen.";
    return;
  }

  submitting.value = true;
  error.value = "";

  try {
    const response = await fetch(
      "https://ipt71.kuno-schuerch.bbzwinf.ch/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!data.success) {
      error.value = "Login fehlgeschlagen. Benutzername oder Passwort falsch.";
      return;
    }

 
    localStorage.setItem("user", JSON.stringify(data));
    isLoggedIn.value = true;
    router.push("/Produkt");

  } catch (err) {
    error.value = "Server Fehler. Bitte später erneut versuchen.";
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.contact-container {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.contact-header {
  text-align: center;
  margin-bottom: 2rem;
}

.contact-header h1 {
  color: #2f3a2f;
  font-size: 2.5rem;
  margin: 0;
}

.Login-form {
  width: 100%;
  max-width: 400px;
  background-color: #4f6448;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  color: white;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid transparent;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #2f3a2f;
  box-shadow: 0 0 0 3px rgba(47, 58, 47, 0.2);
}

.submit-button {
  width: 100%;
  background-color: #2f3a2f;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(14, 16, 15, 0.683);
  transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  background-color: #3f4f3f;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #ff6b6b;
  margin-top: 1rem;
  text-align: center;
  font-weight: bold;
}

@media (max-width: 768px) {
  .contact-header h1 {
    font-size: 2rem;
  }
  
  .Login-form {
    padding: 1.5rem;
  }
}
</style>