<template>
  <div class="dashboard">
    <a-layout>
      <a-layout-header>
        <Header />
      </a-layout-header>
      <a-layout>
        <a-layout-sider>
          <Sidebar />
        </a-layout-sider>
        <a-layout-content>
          <nuxt />
        </a-layout-content>
      </a-layout>
      <a-layout-footer>
        <Footer />
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import Footer from '@/components/Footer.vue'

  export default {
    components: {
      Header,
      Sidebar,
      Footer
    }

  }
</script>

<style lang="scss" scoped>
  .dashboard {
    .ant-layout-content {
      min-height: 85vh;
    }
  }
</style>