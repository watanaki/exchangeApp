<template>
  <el-container>
    <el-main>
      <el-card v-if="articles && articles.length" v-for="article in articles" :key="article._id" class="article-card">
        <h2>{{ article.title }}</h2>
        <p>{{ article.preview }}</p>
        <el-button text>阅读更多</el-button>
      </el-card>

      <div v-else class="no-data">No data</div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import axios from "../axios";
import { onMounted, ref } from "vue";

interface Article {
  _id: string;
  title: string;
  preview: string;
  content: string;
}

const articles = ref<Article[]>([]);

const fetchArticles = async () => {
  try {
    const res = await axios.get<Article[]>("/articles");
    articles.value = res.data;
  } catch (error) {
    console.error("Failed to fetch articles" + error);
  }
}

onMounted(() => {
  fetchArticles();
})

</script>

<style scoped>
.article-card {
  margin: 20px 0;
}
</style>