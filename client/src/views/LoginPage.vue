<template>
  <div class="page-container">
    <Header />

    <main class="main-content">
      <div class="signup-panel">
        <div class="form-container">
          <!-- Email Field -->
          <div class="form-group-horizontal">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" v-model="email" class="form-input" placeholder="Enter your email" required />
          </div>

          <!-- Password Field -->
          <div class="form-group-horizontal">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-input" placeholder="Enter your password"
              required />
          </div>

          <!-- Login Button -->
          <div class="button-container">
            <button @click="handleLogin" :disabled="!isFormValid" class="signup-button"
              :class="{ 'disabled': !isFormValid }">
              Login
            </button>
          </div>

          <!-- Redirect to Signup -->
          <div class="redirect-container">
            <p style="color: white;">
              Don't have an account?
              <router-link to="/signup" style="color: #fefefe;">Sign up here</router-link>
            </p>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="error-container">
            <p class="error-title">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { login } from '../services/api.js'

export default {
  name: 'LoginPage',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  computed: {
    isFormValid() {
      return this.email && this.password
    }
  },
  methods: {
    async handleLogin() {
      if (!this.isFormValid) return;

      try {
        const res = await login(this.email, this.password);

        localStorage.setItem('token', res.token);

        this.email = '';
        this.password = '';
        this.errorMessage = '';

        this.$nextTick(() => {
          this.$router.replace('/');
        });

      } catch (err) {
        this.errorMessage = err.response?.data?.error || 'Login failed';
      }
    }
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
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
}

.signup-panel {
  background-color: #636CCB;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group-horizontal {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.form-label {
  color: white;
  font-weight: 500;
  font-size: 1rem;
  min-width: 100px;
  text-align: center;
  background-color: #50589C;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 2px solid #3C467B;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #3C467B;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s;
  box-sizing: border-box;
  background-color: #50589C;
  color: #000000;
}

.form-input::placeholder {
  color: #6b73ab;
}

.form-input:focus {
  outline: none;
  border-color: #1f2545;
  box-shadow: 0 0 0 3px rgba(60, 70, 123, 0.1);
}

.button-container {
  text-align: center;
  padding-top: 1rem;
}

.signup-button {
  background-color: #2d3560;
  color: white;
  padding: 0.875rem 3rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(45, 53, 96, 0.3);
}

.signup-button:hover:not(.disabled) {
  background-color: #1f2545;
  box-shadow: 0 4px 12px rgba(45, 53, 96, 0.4);
  transform: translateY(-2px);
}

.signup-button.disabled {
  background-color: #8fa3fc;
  cursor: not-allowed;
}

.redirect-container {
  text-align: center;
  padding-top: 1rem;
}

.error-container {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 1rem;
}

.error-title {
  color: #991b1b;
  font-weight: 600;
  margin: 0;
}
</style>