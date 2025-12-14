<template>
  <div class="page-container">
    <Header />

    <main class="main-content">
      <div class="add-post-panel">
        <h2 class="panel-title">Create New Post</h2>
        
        <div class="form-container">
          <div class="form-group">
            <label for="content" class="form-label">Post Content</label>
            <textarea
              id="content"
              v-model="content"
              class="form-textarea"
              placeholder="What's on your mind?"
              rows="6"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label for="image" class="form-label">Image URL (optional)</label>
            <input
              type="text"
              id="image"
              v-model="imageUrl"
              class="form-input"
              placeholder="Enter image URL"
            />
          </div>

          <!-- Error  -->
          <div v-if="errorMessage" class="error-container">
            <p class="error-title">{{ errorMessage }}</p>
          </div>

          <!--  Buttons -->
          <div class="button-container">
            <button
              @click="handleCancel"
              class="cancel-button"
            >
              Cancel
            </button>
            <button
              @click="handleSubmit"
              :disabled="!isFormValid"
              class="submit-button"
              :class="{ 'disabled': !isFormValid }"
            >
              Post
            </button>
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
import { addPost } from '../services/api.js'

export default {
  name: 'AddPostPage',
  components: {
    Header,
    Footer
  },
  
  // Local
  data() {
    return {
      content: '',
      imageUrl: '',
      errorMessage: ''
    }
  },
  
  computed: {
    isFormValid() {
      return this.content.trim().length > 0
    }
  },
  
  methods: {
    async handleSubmit() {
      if (!this.isFormValid) return

      try {
        await addPost(this.content, this.imageUrl || null)
        
        alert('Post created successfully!')
        
        this.$router.push('/')
        
      } catch (err) {
        console.error('Error creating post:', err)
        this.errorMessage = err.response?.data?.error || 'Failed to create post'
      }
    },
    
    handleCancel() {
      this.$router.push('/')
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

.add-post-panel {
  background-color: #636CCB;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 600px;
}

.panel-title {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin: 0 0 2rem 0;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  color: white;
  font-weight: 500;
  font-size: 1rem;
}

.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #3C467B;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
  box-sizing: border-box;
  background-color: #50589C;
  color: #000000;
  resize: vertical;
}

.form-textarea::placeholder {
  color: #6b73ab;
}

.form-textarea:focus {
  outline: none;
  border-color: #1f2545;
  box-shadow: 0 0 0 3px rgba(60, 70, 123, 0.1);
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
  margin: 0;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding-top: 1rem;
}

.cancel-button {
  background-color: #6b7280;
  color: white;
  padding: 0.875rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-button:hover {
  background-color: #4b5563;
}

.submit-button {
  background-color: #2d3560;
  color: white;
  padding: 0.875rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(45, 53, 96, 0.3);
}

.submit-button:hover:not(.disabled) {
  background-color: #1f2545;
  box-shadow: 0 4px 12px rgba(45, 53, 96, 0.4);
  transform: translateY(-2px);
}

.submit-button.disabled {
  background-color: #8fa3fc;
  cursor: not-allowed;
}
</style>
