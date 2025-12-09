<template>
  <div class="page-container">
    <Header />

    <main class="main-content">
      <div class="posts-container">

        <Post v-for="p in posts" :key="p.id" :post="p" />

        <div class="reset-container">
          <button class="reset-button" @click="clearAllLikes" :disabled="isClearing">
            {{ isClearing ? 'Clearing...' : 'Reset All Likes' }}
          </button>
        </div>

      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import Post from "../components/Post.vue"
import { clearPostLikes } from "../services/api"

export default {
  name: "MainPage",
  components: { Header, Footer, Post },

  data() {
    return {
      isClearing: false
    }
  },

  computed: {
    posts() {
      return this.$store.state.posts
    }
  },

  methods: {
    async clearAllLikes() {
      if (this.isClearing) return
      this.isClearing = true

      try {
        const promises = this.posts.map(post =>
          clearPostLikes(post.id)
        )

        await Promise.all(promises)
        await this.$store.dispatch('fetchPosts')
        alert("All likes cleared!")
      } catch (err) {
        alert("Failed to clear some likes")
        console.error(err)
      } finally {
        this.isClearing = false
      }
    }
  },

  mounted() {
    this.$store.dispatch('fetchPosts')
  }
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #50589C;
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
}

.posts-container {
  width: 100%;
  max-width: 700px;
}

.reset-container {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.reset-button {
  padding: 0.75rem 2rem;
  background-color: #c53030;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.reset-button:hover {
  background-color: #9b2c2c;
}
</style>