<template>
  <div class="page-container">
    <Header />

    <main class="main-content">
      <div class="contact-panel">
        <h2 class="panel-title">Contact Us</h2>
        
        <div class="contact-info">
          <div class="info-item">
            <h3>Email</h3>
            <p>glorp@glorp.com</p>
            <p>support@glorp.com</p>
          </div>

          <div class="info-item">
            <h3>Phone</h3>
            <p>+372 1234 1234</p>
          </div>

          <div class="info-item">
            <h3>Address</h3>
            <p>University of Tartu</p>
            <p>Tartu, Estonia</p>
          </div>

          <div class="info-item">
            <h3>🕒</h3>
            <p>Monday - Friday: 5:00 PM - 5:01 PM</p>
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

export default {
  name: 'ContactPage',
  components: {
    Header,
    Footer
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

.contact-panel {
  background-color: #636CCB;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 600px;
}

.panel-title {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 0 0 2rem 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-item {
  color: white;
}

.info-item h3 {
  font-size: 1.3rem;
  margin: 0 0 0.5rem 0;
}

.info-item p {
  margin: 0.3rem 0;
  font-size: 1rem;
  opacity: 0.9;
}
</style>