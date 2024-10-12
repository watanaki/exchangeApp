<template>
  <el-container>
    <el-main>
      <el-card v-if="article" class="article-detail">
        <h1>{{ article.title }}</h1>
        <p>{{ article.content }}</p>
      </el-card>
      <div v-else class="no-data">文章获取失败</div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import axios from '../axios';
import { useRoute } from "vue-router";
import { ElMessage } from 'element-plus';

interface Article {
  _id: string;
  title: string;
  preview: string;
  content: string;
}

const article = ref<Article | null>(null);
const route = useRoute();

const fetchArticle = async () => {
  const { id } = route.params;

  try {
    article.value = (await axios.get<Article>(`/articles/${id}`)).data;
  } catch (error) {
    article.value = null;
    ElMessage.warning('Failed to fetch article');
  }
};

onBeforeMount(fetchArticle);

</script>

<style scoped>
.article-detail {
  margin: 20px 0;
}

.no-data {
  text-align: center;
  font-size: 12em;
  color: #999;
}
</style>