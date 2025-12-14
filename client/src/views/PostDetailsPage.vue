<template>
  <div class="page-container">
    <Header />

    <main class="main-content">
      <div class="post-details-panel" v-if="post">
        <h2 class="panel-title">Post Details</h2>
        
        <div class="post-info">
          <div class="author-section">
            <img :src="post.author_avatar" class="avatar" />
            <div>
              <h3 class="author">{{ post.author }}</h3>
              <p class="date">{{ formatDate(post.created_at) }}</p>
            </div>
          </div>
        </div>

        <div class="content-section">
          <label class="content-label">Post Content:</label>
          <textarea
            v-model="editedContent"
            :readonly="!isEditing"
            class="content-textarea"
            :class="{ 'editing': isEditing }"
            rows="6"
          ></textarea>
        </div>

        <div v-if="post.image" class="image-section">
          <img :src="post.image" class="post-image" />
        </div>

        <div class="likes-section">
          <span class="likes-text">❤️ {{ post.likes }} likes</span>
        </div>
        <div v-if="errorMessage" class="error-container">
          <p class="error-title">{{ errorMessage }}</p>
        </div>

        <div class="button-container">
          <!-- Back Button -->
          <button @click="goBack" class="back-button">
            Back to Home
          </button>

          <!-- Edit/Save Button -->
          <button
            v-if="!isEditing"
            @click="startEditing"
            class="edit-button"
          >
            Update
          </button>
          <button
            v-else
            @click="saveChanges"
            :disabled="!hasChanges"
            class="save-button"
            :class="{ 'disabled': !hasChanges }"
          >
            Save Changes
          </button>
          <button @click="confirmDelete" class="delete-button">
            Delete
          </button>
        </div>
      </div>
      <div v-else class="loading">
        <p>Loading post...</p>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { updatePost, deletePost } from '../services/api.js'

export default {
  name: 'PostDetailsPage',
  components: {
    Header,
    Footer
  },
  
  data() {
    return {
      post: null,
      editedContent: '',
      isEditing: false,
      errorMessage: ''
    }
  },
  computed: {
    hasChanges() {
      return this.editedContent !== this.post.content
    }
  },
  
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    goBack() {
      this.$router.push('/')
    },
    startEditing() {
      this.isEditing = true
    },
    async saveChanges() {
      if (!this.hasChanges) return

      try {
        await updatePost(this.post.id, this.editedContent)
        this.post.content = this.editedContent
        this.isEditing = false
        alert('Post updated successfully!')
        await this.$store.dispatch('fetchPosts')
        
      } catch (err) {
        console.error('Error updating post:', err)
        this.errorMessage = err.response?.data?.error || 'Failed to update post'
      }
    },
    
    async confirmDelete() {
      const confirmed = confirm('Are you sure you want to delete this post?')
      
      if (!confirmed) return

      try {
        await deletePost(this.post.id)
        alert('Post deleted successfully!')
        this.$router.push('/')
        await this.$store.dispatch('fetchPosts')
        
      } catch (err) {
        console.error('Error deleting post:', err)
        this.errorMessage = err.response?.data?.error || 'Failed to delete post'
      }
    },
    loadPost() {
      // Get post ID
      const postId = Number(this.$route.params.id)
      
      this.post = this.$store.getters.getPostById(postId)
      
      if (this.post) {
        this.editedContent = this.post.content
      } else {
        this.errorMessage = 'Post not found'
      }
    }
  },
  
  mounted() {
    this.loadPost()
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

.post-details-panel {
  background-color: #636CCB;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 700px;
}

.panel-title {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin: 0 0 2rem 0;
}

.post-info {
  margin-bottom: 1.5rem;
}

.author-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.author {
  color: white;
  margin: 0;
  font-size: 1.2rem;
}

.date {
  color: #e0e0e0;
  margin: 0;
  font-size: 0.9rem;
}

.content-section {
  margin-bottom: 1.5rem;
}

.content-label {
  display: block;
  color: white;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.content-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #3C467B;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  background-color: #50589C;
  color: white;
  resize: vertical;
  transition: all 0.3s;
}

.content-textarea:read-only {
  cursor: not-allowed;
  opacity: 0.8;
}

.content-textarea.editing {
  background-color: #4a5093;
  cursor: text;
}

.content-textarea:focus {
  outline: none;
  border-color: #1f2545;
  box-shadow: 0 0 0 3px rgba(60, 70, 123, 0.1);
}

.image-section {
  margin-bottom: 1.5rem;
}

.post-image {
  width: 100%;
  border-radius: 10px;
}

.likes-section {
  text-align: right;
  margin-bottom: 1.5rem;
  color: white;
  font-size: 1.1rem;
}

.error-container {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
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
  flex-wrap: wrap;
}

.back-button {
  background-color: #6b7280;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.back-button:hover {
  background-color: #4b5563;
}

.edit-button,
.save-button {
  background-color: #2d3560;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.edit-button:hover,
.save-button:hover:not(.disabled) {
  background-color: #1f2545;
  transform: translateY(-2px);
}

.save-button.disabled {
  background-color: #8fa3fc;
  cursor: not-allowed;
}

.delete-button {
  background-color: #c53030;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.delete-button:hover {
  background-color: #9b2c2c;
  transform: translateY(-2px);
}

.loading {
  color: white;
  font-size: 1.2rem;
  text-align: center;
}
</style>