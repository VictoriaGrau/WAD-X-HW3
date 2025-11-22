<template>
  <footer class="footer">
    <div class="footer-container">
      <p class="copyright">© 2025 HW3. All rights reserved.</p>
      <p class="footer-links">
        Contact: glorp@glorp.bleh | ToS | Privacy Policy
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #1f2545;
  color: white;
  padding: 1rem 0;
  border-radius: 10px 10px 0 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
}

.copyright {
  color: white;
  margin: 0 0 0.5rem 0;
}

.footer-links {
  color: white;
  font-size: 0.875rem;
  margin: 0;
}
</style>