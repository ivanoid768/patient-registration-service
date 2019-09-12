<template>
  <header>
    <div class="logo">Logo</div>
    <div class="title">Title</div>
    <header-user />
  </header>
</template>

<script>
  import HeaderUser from '@/components/HeaderUser.vue'
  export default {
    components: {
      HeaderUser
    }

  }
</script>