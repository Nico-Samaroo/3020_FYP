<template>
  <div class="mx-auto mt-24 max-w-lg">
    <h2 class="text-4xl font-bold text-blue-600">Login to your account</h2>
    <p class="mb-8">
      Enter your details to login. Or
      <RouterLink
        class="text-blue-600 underline"
        :to="{ name: RouteName.REGISTER }"
        >Register now</RouterLink
      >
    </p>
    <form class="flex flex-col space-y-4" @submit.prevent="handleSubmit">
      <input
        type="email"
        placeholder="Email"
        class="rounded-md border-2 border-blue-200 bg-transparent py-2 px-4 invalid:border-red-400 invalid:placeholder:text-red-400 focus:outline-none focus:ring-2"
        v-model="fields.email"
      />
      <input
        type="password"
        placeholder="Password"
        class="rounded-md border-2 border-blue-200 bg-transparent py-2 px-4 invalid:border-red-400 invalid:placeholder:text-red-400 focus:outline-none focus:ring-2"
        minlength="6"
        v-model="fields.password"
      />
      <button
        type="submit"
        class="rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-500"
      >
        Submit
      </button>
      <p
        v-if="!!error"
        class="mt-4 flex items-center justify-center space-x-2 rounded-md border border-red-600 bg-red-200 py-2 px-4 text-red-600"
      >
        <fa :icon="faExclamationTriangle"></fa>
        <span v-if="error === 'unfilled'">All fields required</span>
        <span v-if="error === 'invalid_email'">That email doesn't exist</span>
        <span v-if="error === 'invalid_password'"
          >The password is incorrect</span
        >
        <span v-else>An unknown error occured</span>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { AxiosError } from "axios";
import axios from "../axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { RouteName } from "../router";
import type { User } from "../stores/authStore";
import useAuthStore from "../stores/authStore";

const fields = reactive({
  email: "",
  password: "",
});

const authStore = useAuthStore();
const router = useRouter();

const error = ref<
  null | "unfilled" | "invalid_email" | "invalid_password" | "other"
>(null);

async function handleSubmit() {
  if (!(fields.email && fields.password)) {
    error.value = "unfilled";
    return;
  }
  error.value = null;

  try {
    const { data } = await axios.post<{ token: string; user: User }>(
      "/auth/login",
      fields
    );
    authStore.saveUser(data.token, data.user);
    router.push({ name: RouteName.DASHBOARD });
  } catch (err) {
    console.log(err);
    const errorResponse = (err as AxiosError<{ message: string } | null>)
      .response?.data;
    if (errorResponse) {
      if (errorResponse.message === "INVALID_EMAIL")
        error.value = "invalid_email";
      if (errorResponse.message === "INVALID_PASSWORD")
        error.value = "invalid_password";
      return;
    }
    error.value = "other";
  }
}
</script>
