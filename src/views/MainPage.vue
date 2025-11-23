<template>
  <div class="page-container">
    <Header />

    <main class="main-content">
      <div class="posts-container">

        <div class="spacer"></div>

        <Post v-for="p in posts" :key="p.id" :post="p" />

        <div class="spacer"></div>

      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import Post from "../components/Post.vue"
import { mapState } from "vuex"

export default {
  name: "MainPage",
  components: { Header, Footer, Post },

  computed: {
    ...mapState(["posts"])
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
</style>
