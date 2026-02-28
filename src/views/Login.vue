<template>
  <div class="contact-container">
    <div class="contact-header">
      <h1>Login</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="Login-form">
      <div class="form-group">
        <label>Username </label>
        <input type="text" v-model="formData.username" required />
      </div>

      <div class="form-group">
        <label>Passwort </label>
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
.Login-form{
  max-width :70%;
  min-width: 200px;
  margin :10px auto;
  padding: 5%;
  background-color: #4f6448;
  border-radius: 8px;

}

input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 20px;
}

.form-group {
margin-top: 1rem;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 20px;
 
}

.contact-header {
  text-align: center;
  
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

label {
  color: #2f3a2f;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

.submit-button {
  background-color: #2f3a2f;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(14, 16, 15, 0.683);
}














</style>