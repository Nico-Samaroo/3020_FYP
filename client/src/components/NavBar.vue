<template>
  <nav class="flex py-2 px-8 shadow" v-if="!$route.meta.isLayoutDisabled">
    <div class="ml-auto">
      <button
        @click="logout"
        v-if="authStore.user"
        class="font-semibold text-red-600 hover:underline"
      >
        Logout
      </button>
      <router-link
        v-else
        class="pl-4 font-semibold text-gray-600 hover:underline"
        :to="{ name: RouteName.LOGIN }"
      >
        Login
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { RouteName } from "../router";
import useAuthStore from "../stores/authStore";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

function logout() {
  authStore.deleteUser();
  if (route.meta.requiresAuth) router.push({ name: RouteName.LOGIN });
}
</script>
