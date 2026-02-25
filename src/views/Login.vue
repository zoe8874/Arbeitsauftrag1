<template>
  <div class="contact-container">
    <div class="contact-header">
      <h1>Login</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-group">
        <label>Username *</label>
        <input type="text" v-model="formData.username" required />
      </div>

      <div class="form-group">
        <label>Passwort *</label>
        <input type="password" v-model="formData.password" required />
      </div>

      <button type="submit" class="submit-button">
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
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.token) {
      throw new Error("Login fehlgeschlagen");
    }

    localStorage.setItem("token", data.token);

    router.push("/");
  } catch (err) {
    error.value =
      "Login fehlgeschlagen. Benutzername oder Passwort falsch.";
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