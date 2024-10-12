<template>
  <el-container class="auth_container">
    <el-form :model="form" class="auth-form" @submit.prevent="login">
      <el-form-item label="用户名" label-width="80px">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="margin: auto;" type="primary" native-type="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from "../store/auth";
import { ElMessage } from "element-plus";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  username: '',
  password: '',
});

const login = async () => {
  const { username, password } = form.value;
  if (!(username && password)) return alert('请输入用户名和密码!');
  try {
    await authStore.login(username, password);
    router.push({ name: 'news' });
  } catch (error) {
    ElMessage.error('Login failed!');
  }
};


</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}

.auth-form {
  /* width: 100%; */
  max-width: 360px;
  padding: 20px;
  background-color: #f0f0ed;
  border-radius: 4px;
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
}
</style>
