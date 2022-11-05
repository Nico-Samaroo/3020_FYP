import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { auth } from "../axios";

export type User = {
  email: string;
  name: string;
};

export const LS_TOKEN_KEY = "token";

const useAuthStore = defineStore("auth", {
  state: () => ({ user: null as User | null, isInitialized: false }),
  actions: {
    // fetch user info from server if authenticated
    async initialize() {
      const token = localStorage.getItem(LS_TOKEN_KEY);
      if (!token) {
        this.isInitialized = true;
        return Promise.resolve();
      }
      try {
        try {
          const { data } = await auth(token).get("/user");
          this.user = JSON.parse(data);
        } catch (err) {
          const status = (err as AxiosError<{ message: string } | null>)
            .response?.status;
          if (status === 401) localStorage.removeItem(LS_TOKEN_KEY);
        }
      } finally {
        return (this.isInitialized = true);
      }
    },

    saveUser(token: string, user: User) {
      localStorage.setItem(LS_TOKEN_KEY, token);
      this.user = user;
    },
    deleteUser() {
      localStorage.removeItem(LS_TOKEN_KEY);
      this.user = null;
    },
  },
});

export default useAuthStore;
