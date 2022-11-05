<template>
  <div v-if="authStore.isInitialized">
    <NavBar></NavBar>
    <RouterView></RouterView>
  </div>
  <div class="mt-12 flex items-center justify-center" v-else>
    <div class="grid w-max rounded-full bg-orange-500 p-1">
      <div
        class="col-start-1 row-start-1 flex h-10 w-10 animate-pulse items-center justify-center rounded-full text-white"
      >
        <fa :icon="faHourglassHalf"></fa>
      </div>
      <div
        class="col-start-1 row-start-1 animate-spin rounded-full border-4 border-white border-b-transparent"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./components/NavBar.vue";
import useAuthStore from "./stores/authStore";

const authStore = useAuthStore();
</script>

