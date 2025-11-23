<template>
  <div class="page-container">
    <Header />

    <main class="main-content">
      <div class="posts-container">

        <Post v-for="p in posts" :key="p.id" :post="p" />

        <div class="reset-container">
            <button class="reset-button" @click="resetLikes">
              Reset Likes
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
import { mapState, mapActions } from "vuex";

export default {
  name: "MainPage",
  components: { Header, Footer, Post },

  computed: {
    ...mapState(["posts"])
  },

  methods: {
    ...mapActions(["resetLikes"])
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

.nav-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.nav-link {
  color: white;
  font-weight: 600;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}

.spacer {
  height: 20px;
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
