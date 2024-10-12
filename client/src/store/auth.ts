import { defineStore } from "pinia";
import axios from "../axios";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const isAuthorized = computed(() => !!token.value);

  const login = async (username: string, password: string) => {

    try {
      const res = await axios.post('/auth/login', { username, password })
      token.value = res.data.token;
      localStorage.setItem('token', token.value || '');
    }
    catch (e) {
      throw e;
    }
  };

  const register = async (username: string, password: string) => {

    try {
      const res = await axios.post('/auth/register', { username, password })

      token.value = res.data.token;
      localStorage.setItem('token', token.value || '');
    }
    catch (e) {
      throw e;
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    token.value = null;
  };

  return {
    token,
    login,
    register,
    logout,
    isAuthorized,
  };

});