<template>
  <div class="page-container">
    <Header />

    <main class="main-content">
      <div class="posts-container">

        <div class="action-buttons">
          <button @click="goToAddPost" class="add-post-btn">
            Add New Post
          </button>
          <button @click="logout" class="logout-btn">
            Logout
          </button>
        </div>

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
    },
    goToAddPost() {
    this.$router.push('/add-post')
    },
    
    logout() {
      localStorage.removeItem('token')
      
      this.$router.push('/login')
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
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.add-post-btn {
  background-color: #2d3560;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.add-post-btn:hover {
  background-color: #1f2545;
  transform: translateY(-2px);
}

.logout-btn {
  background-color: #c53030;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.logout-btn:hover {
  background-color: #9b2c2c;
  transform: translateY(-2px);
}
</style>