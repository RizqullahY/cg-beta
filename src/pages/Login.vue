<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow-lg p-4" style="width: 300px">
      <!-- If user is logged in, show logout button -->
      <div v-if="isLoggedIn">
        <h3 class="text-center mb-4">Welcome</h3>
        <button class="btn btn-danger w-100" @click="logout">Logout</button>
      </div>

      <!-- If user is not logged in, show login button -->
      <div v-else>
        <h3 class="text-center mb-4">Login</h3>
        <button class="btn btn-primary w-100" @click="login">Login with Google</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { googleTokenLogin } from "vue3-google-login";
import { useRouter } from "vue-router";

// State for login status
const isLoggedIn = ref(false);

const router = useRouter();

// Check if the user is already logged in (on component mount)
onMounted(() => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    isLoggedIn.value = true; // Mark as logged in if accessToken exists
  }
});

// Login function
const login = () => {
  googleTokenLogin()
    .then((response) => {
      localStorage.setItem("accessToken", response.access_token); // Store accessToken
      isLoggedIn.value = true; // Update login state
      router.push("/game"); // Redirect to the game page after login
      window.location.reload(); // Reload to trigger reactivity
    })
    .catch((err) => {
      console.error("Google login error:", err);
    });
};

// Logout function
const logout = () => {
  localStorage.removeItem("accessToken"); // Remove accessToken on logout
  isLoggedIn.value = false; // Update login state
  router.push("/"); // Redirect to login page after logout
};
</script>

<style scoped>
.card {
  max-width: 400px;
  margin: auto;
}
</style>
