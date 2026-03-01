<template>
  <div class="contact-container">
    <div class="contact-header">
      <h1>Register</h1>
    </div>

    <form @submit.prevent="handleRegister" class="Login-form">
      <div class="form-group">
        <label>Username</label>
        <input v-model="formData.username" required />
      </div>

      <div class="form-group">
        <label>Vorname</label>
        <input v-model="formData.firstname" required />
      </div>

      <div class="form-group">
        <label>Nachname</label>
        <input v-model="formData.lastname" required />
      </div>

      <div class="form-group">
        <label>Passwort</label>
        <input type="password" v-model="formData.password" required />
      </div>

      <div class="form-group">
        <label>Sprache</label>
        <select v-model="formData.language" required>
          <option value="de">Deutsch</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <button type="submit" class="submit-button" :disabled="submitting">
        {{ submitting ? "Wird registriert..." : "Register" }}
      </button>

      <p
        v-if="message"
        :style="{ color: success ? 'green' : 'red', marginTop: '1rem' }"
      >
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

const getErrorMessage = (reason) => {
  switch (reason) {
    case "username_not_valid":
      return "Username ist ungültig.";


    case "password_too_short":
      return "Passwort ist zu kurz.";

    case "firstname_too_short":
      return "Vorname ist zu kurz.";

    case "lastname_too_short":
      return "Nachname ist zu kurz.";

    default:
      return "Registration fehlgeschlagen.";
  }
};

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

    if (!data.success) {
      success.value = false;
      message.value = getErrorMessage(data.reason);
      return;
    }

    success.value = true;
    message.value = "Registration erfolgreich! Weiter zum Login...";

    setTimeout(() => {
      router.push("/login");
    }, 1500);

  } catch (error) {
    success.value = false;
    message.value = "Server Fehler. Bitte später erneut versuchen.";
  } finally {
    submitting.value = false;
  }
};
</script>


<style scoped>
.Login-form {
  max-width: 70%;
  min-width: 200px;
  margin: 10px auto;
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

label {
  color: #2f3a2f;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
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

select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 20px;
}
</style>