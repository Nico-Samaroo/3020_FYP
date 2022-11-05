<template>
  <h1
    v-if="authStore.user"
    class="max-w-lg border-l-8 border-blue-500 bg-gradient-to-r from-blue-500 to-pink-800 bg-clip-text py-8 pl-12 text-6xl font-bold leading-10 text-transparent"
  >
    Welcome, {{ authStore.user.name }}
  </h1>
</template>

<script setup lang="ts">
import useAuthStore from "../stores/authStore";
const authStore = useAuthStore();
</script>
