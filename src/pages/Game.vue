<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "axios";

const username = ref("");
const gameStarted = ref(false);
const gameEnded = ref(false);
const timeLeft = ref(5);
const score = ref(0);
const timer = ref();

const googleScriptURL =
  "https://script.google.com/macros/s/AKfycbx1_yyLmcFHADThpTBkTs8RHQ7iBhLXAxWbrIljKfy_noQ_JVoMJv7SHX7XzqJ38nF-CQ/exec";

const canStartGame = computed(() => username.value.length >= 3);

const startGame = () => {
  if (!canStartGame.value) return;

  gameStarted.value = true;
  score.value = 0;
  timeLeft.value = 5;

  timer.value = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      endGame();
    }
  }, 1000);
};

const incrementScore = () => {
  if (gameStarted.value && !gameEnded.value) {
    score.value++;
  }
};

const endGame = async () => {
  if (timer.value) clearInterval(timer.value);
  gameEnded.value = true;
};



const resetGame = () => {
  username.value = "";
  gameStarted.value = false;
  gameEnded.value = false;
  score.value = 0;
  timeLeft.value = 5;
};
</script>

<template>
  <div class="game-container d-flex justify-content-center align-items-center min-vh-100">
    <div class="text-center">
      <!-- Start Screen -->
      <div v-if="!gameStarted && !gameEnded" class="start-screen">
        <h1 class="display-4">Click Counter Game</h1>
        <input
          v-model="username"
          class="form-control mb-3"
          placeholder="Masukkan nama (minimal 3 karakter)"
          :class="{
            'is-invalid': username.length > 0 && username.length < 3
          }"
        />
        <button
          @click="startGame"
          :disabled="!canStartGame"
          class="btn btn-primary"
        >
          Start
        </button>
      </div>

      <!-- Game Screen -->
      <div v-if="gameStarted && !gameEnded" class="game-screen">
        <div class="stats mb-3">
          <div class="h5">Time: {{ timeLeft }} second</div>
          <div class="h5">Score: {{ score }}</div>
        </div>
        <button
          @click="incrementScore"
          class="btn btn-success btn-lg"
          style="width: 200px; height: 200px; border-radius: 50%; font-size: 1.5rem;"
        >
          Click Me!
        </button>
      </div>

      <!-- End Screen -->
      <div v-if="gameEnded" class="end-screen">
        <h2 class="display-4">Game Ended!</h2>
        <p class="lead">{{ username }}, Your Score: {{ score }}</p>
        <button @click="resetGame" class="btn btn-info">Play Again</button>
      </div>
    </div>
  </div>
</template>


