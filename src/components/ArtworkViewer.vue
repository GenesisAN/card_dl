<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  artwork: Object,
});

const isLiked = ref(false);

const toggleLike = () => {
  isLiked.value = !isLiked.value;
};
</script>

<template>
  <div class="artwork-viewer">
    <div class="artwork-image">
      <img :src="artwork.imageUrl" :alt="artwork.title" />
    </div>
    <div class="artwork-info">
      <h2>{{ artwork.title }}</h2>
      <div class="author-info">
        <img :src="artwork.author.avatarUrl" alt="Author Avatar" />
        <span>{{ artwork.author.name }}</span>
      </div>
      <button @click="toggleLike">
        {{ isLiked ? "Unlike" : "Like" }}
        {{ isLiked ? "❤️" : "🤍" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.artwork-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.artwork-image img {
  max-width: 100%;
  border-radius: 5px;
}

.artwork-info {
  margin-top: 20px;
  text-align: center;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

button {
  margin-top: 20px;
  padding: 5px 15px;
  border: none;
  background-color: #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #ddd;
}
</style>
