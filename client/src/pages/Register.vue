<template>
  <div class="mx-auto mt-24 max-w-lg">
    <h2 class="text-4xl font-bold text-blue-600">Register a new account</h2>
    <p class="mb-8">
      Already have an account?
      <RouterLink
        class="text-blue-600 underline"
        :to="{ name: RouteName.LOGIN }"
        >Login</RouterLink
      >
    </p>
    <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4">
      <input
        type="text"
        v-model="fields.name"
        placeholder="Name"
        class="rounded-md border-2 border-blue-200 bg-transparent py-2 px-4 invalid:border-red-400 invalid:placeholder:text-red-400 focus:outline-none focus:ring-2"
        minlength="4"
      />
      <input
        type="email"
        v-model="fields.email"
        placeholder="Email"
        class="rounded-md border-2 border-blue-200 bg-transparent py-2 px-4 invalid:border-red-400 invalid:placeholder:text-red-400 focus:outline-none focus:ring-2"
      />
      <input
        type="password"
        v-model="fields.password"
        placeholder="Password"
        class="rounded-md border-2 border-blue-200 bg-transparent py-2 px-4 invalid:border-red-400 invalid:placeholder:text-red-400 focus:outline-none focus:ring-2"
        min="6"
      />
      <button
        type="submit"
        class="rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-500"
      >
        Submit
      </button>
    </form>
    <p
      v-if="!!error"
      class="mt-4 flex items-center justify-center space-x-2 rounded-md border border-red-600 bg-red-200 py-2 px-4 text-red-600"
    >
      <fa :icon="faExclamationTriangle"></fa>
      <span v-if="error === 'unfilled'">All fields required</span>
      <span v-if="error === 'email_exists'">That email already exists</span>
      <span v-else>An unknown error occured</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { RouteName } from "../router";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import axios from "../axios";
import type { AxiosError } from "axios";
import useAuthStore, { User } from "../stores/authStore";
import { useRouter } from "vue-router";

const fields = reactive({
  name: "",
  email: "",
  password: "",
});

const authStore = useAuthStore();
const router = useRouter();

const error = ref<null | "unfilled" | "email_exists" | "other">(null);

async function handleSubmit() {
  if (!(fields.name && fields.email && fields.password)) {
    error.value = "unfilled";
    return;
  }
  error.value = null;

  try {
    const { data } = await axios.post<{ token: string; user: User }>(
      "/auth/register",
      fields
    );
    authStore.saveUser(data.token, data.user);
    router.push({ name: RouteName.DASHBOARD });
  } catch (err) {
    console.log(err);
    const errorResponse = (err as AxiosError<{ message: string } | null>)
      .response?.data;
    if (errorResponse && errorResponse.message === "INVALID_EMAIL") {
      error.value = "email_exists";
      return;
    }
    error.value = "other";
  }
}
</script>
