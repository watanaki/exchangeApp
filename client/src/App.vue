<template>

  <div class="common-layout">

    <el-container>

      <el-header>

        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
          @select="handleSelect">

          <el-menu-item index="home"> 首页 </el-menu-item>
          <el-menu-item index="currencyExchange"> 兑换货币 </el-menu-item>
          <el-menu-item index="news"> 查看新闻 </el-menu-item>
          <el-menu-item index="login"> 登录 </el-menu-item>
          <el-menu-item index="register"> 注册 </el-menu-item>
          <el-menu-item index="logout"> 退出 </el-menu-item>

        </el-menu>

      </el-header>

      <el-main>
        <router-view class="content"></router-view>
      </el-main>

    </el-container>

  </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();




const activeIndex = ref(route.name?.toString() || 'home');

watch(route, (newRoute) => {
  activeIndex.value = newRoute.name?.toString() || 'home';
});

const handleSelect = (key: string) => {
  router.push({
    name: key,
  })

};

</script>

<style scoped>
.el-menu-demo {
  line-height: 60px;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}
</style>
