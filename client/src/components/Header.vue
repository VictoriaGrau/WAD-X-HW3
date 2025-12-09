<template>
  <header class="header">
    <nav class="nav-container">
      <div class="logo">
        <img src="assets/headerIMG.jpeg" alt="Logo" class="logo-img" />
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link" exact active-class="active-link">
          Main Page
        </router-link>
        <!-- Show Login and Sign Up when not logged in -->
        <router-link v-if="!isLoggedIn" to="/login" class="nav-link" exact active-class="active-link">
          Log In
        </router-link>
        <router-link v-if="!isLoggedIn" to="/signup" class="nav-link" exact active-class="active-link">
          Sign Up
        </router-link>
        <!-- Show Logout when logged in -->
        <button v-if="isLoggedIn" @click="handleLogout" class="nav-link logout-btn">
          Log Out
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token')
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #1f2545;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 10px 10px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 50px;
  width: auto;
  border-radius: 8px;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  background-color: #3C467B;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #50589C;
}

.active-link {
  background-color: #272e51;
  font-weight: 600;
  color: #fff;
}

.logout-btn {
  border: none;
  cursor: pointer;
  font-size: inherit;
}
</style>