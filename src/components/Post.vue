<template>
  <div class="post-card">
    <div class="post-header">
      <img :src="post.authorAvatar" class="avatar" />
      <div>
        <h3 class="author">{{ post.author }}</h3>
        <p class="date">{{ post.date }}</p>
      </div>
    </div>

    <p class="content-text">{{ post.content }}</p>

    <img 
      v-if="post.image" 
      :src="post.image" 
      class="post-image" 
    />

    <button class="like-button" @click="likePost(post.id)">
      ❤️ {{ post.likes }}
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "Post",
  props: ["post"],
  methods: {
    ...mapActions(["likePost"])
  }
}
</script>

<style scoped>
.post-card {
  background-color: #636CCB;
  margin: 1rem 0;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.15);
  color: white;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: white;
}

.author {
  margin: 0;
  font-weight: 600;
}

.date {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.8;
}

.content-text {
  margin: 1rem 0;
  font-size: 1.1rem;
}

.post-image {
  width: 100%;
  border-radius: 12px;
  margin: 0.5rem 0;
}

.like-section {
  text-align: right;
}

.like-button {
  border: none;
  background: #2d3560;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  cursor: pointer;
}
.like-button:hover {
  background: #1f2545;
}
</style>
