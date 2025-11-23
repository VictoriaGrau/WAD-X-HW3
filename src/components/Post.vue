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

    <img v-if="post.image" :src="post.image" class="post-image" />

    <div class="like-section">
      <button class="like-button" @click="incrementLike(post.id)">
        ❤️ {{ post.likes }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Post",
  props: ["post"],
  methods: {
    ...mapActions(["incrementLike"])
  }
};
</script>

<style scoped>
.post-card {
  background-color: #636CCB;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: 10px;
  color: white;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.author {
  margin: 0;
  font-size: 0.95rem;
}

.date {
  margin: 0;
  font-size: 0.75rem;
  color: #e0e0e0;
}

.post-image {
  width: 100%;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.content-text {
  margin: 0.5rem 0;
  font-size: 0.85rem;
}

.like-section {
  text-align: right;
  margin-top: 0.5rem;
}

.like-button {
  border: none;
  background: #2d3560;
  padding: 0.3rem 0.8rem;
  border-radius: 16px;
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.like-button:hover {
  background: #1f2545;
}
</style>
