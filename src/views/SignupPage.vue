<template>
  <div class="page-container">
    <Header />
    
    <main class="main-content">
      <div class="signup-panel">
        <div class="form-container">
          <!-- Email Field -->
          <div class="form-group-horizontal">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <!-- Password Field -->
          <div class="form-group-horizontal">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              @input="validatePassword"
              class="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <!-- Errors -->
          <div v-if="validationErrors.length > 0" class="error-container">
            <p class="error-title">The password is not valid:</p>
            <ul class="error-list">
              <li v-for="(error, index) in validationErrors" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>

          <!-- Signup Button -->
          <div class="button-container">
            <button
              @click="handleSignup"
              :disabled="!isFormValid"
              class="signup-button"
              :class="{ 'disabled': !isFormValid }"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'SignupPage',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      email: '',
      password: '',
      validationErrors: []
    }
  },
  computed: {
    isFormValid() {
      return this.email && this.password && this.validationErrors.length === 0
    }
  },
  methods: {
    ...mapActions(['signup']),
    
    validatePassword() {
      const errors = []
      const pwd = this.password
      
      // Len 8-15
      if (pwd.length < 8 || pwd.length >= 15) {
        errors.push('The password should be at least 8 characters and less than 15 characters')
      }
      
      // At least one uppercase
      if (!/[A-Z]/.test(pwd)) {
        errors.push('Includes at least one uppercase alphabet character')
      }
      
      // At least two lowercase
      const lowercaseMatches = pwd.match(/[a-z]/g)
      if (!lowercaseMatches || lowercaseMatches.length < 2) {
        errors.push('Includes at least two lowercase alphabet characters')
      }
      
      // At least one num
      if (!/\d/.test(pwd)) {
        errors.push('Includes at least one numeric value')
      }
      
      // Start w uppercase
      if (pwd.length > 0 && !/^[A-Z]/.test(pwd)) {
        errors.push('It should start with an uppercase alphabet')
      }
      
      // Underscore
      if (!pwd.includes('_')) {
        errors.push('It should include the character "_"')
      }
      
      this.validationErrors = errors
    },
    
    handleSignup() {
      if (this.isFormValid) {
        this.signup({
          email: this.email,
          password: this.password
        }).then(() => {
          alert('Signup successful!')
          this.email = ''
          this.password = ''
          this.validationErrors = []
        })
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
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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

.error-container {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 1rem;
}

.error-title {
  color: #991b1b;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.error-list {
  color: #b91c1c;
  font-size: 0.875rem;
  margin: 0;
  padding-left: 1.5rem;
}

.error-list li {
  margin-bottom: 0.25rem;
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
</style>
