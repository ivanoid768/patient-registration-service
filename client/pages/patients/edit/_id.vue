<template>
  <div class="content"><h2>Редактировать данные о пациенте {{id}}</h2></div>
</template>

<script>
  export default {
    layout: 'dashboard',
    asyncData({ params}){
      return {
        id: params.id
      }
    }
  }
</script>
