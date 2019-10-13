<template>
  <div class="unauth">
    <a-layout>
      <a-layout-header>
        <Header />
      </a-layout-header>
      <a-layout-content>
        <nuxt />
      </a-layout-content>
      <a-layout-footer>
        <Footer />
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss" scoped>
.unauth {
  .ant-layout-content {
    min-height: 85vh;

    > * {
      margin: 0 auto;
      margin-top: 100px;
    }
  }
}
</style>