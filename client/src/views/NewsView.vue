<template>
  <el-container class="news-content">
    <el-main>
      <el-card v-if="articles && articles.length" v-for="article in articles" :key="article._id" class="article-card">
        <h2>{{ article.title }}</h2>
        <p>{{ article.preview }}</p>
        <el-button text @click="viewDetail(article._id)">阅读更多</el-button>
      </el-card>

      <div v-else class="no-data">No data</div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import axios from "../axios";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../store/auth";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

interface Article {
  _id: string;
  title: string;
  preview: string;
  content: string;
}

const articles = ref<Article[]>([]);
const authStore = useAuthStore();
const router = useRouter();

const fetchArticles = async () => {
  try {
    const res = await axios.get<Article[]>("/articles");
    articles.value = res.data;
  } catch (error) {
    console.error("Failed to fetch articles" + error);
  }
}

const viewDetail = (id: string) => {
  if (!authStore.isAuthorized) return ElMessage.error('Please login to browse articles');

  router.push({
    name: 'newsDetail',
    params: { id },
  })

}

onMounted(() => {
  fetchArticles();
})

</script>

<style scoped>
.article-card {
  margin: 20px 0;
}

.news-content {
  align-items: normal !important;
}
</style>