<template>
  <div class="content"><h2>Удалить данные о приеме {{id}}</h2></div>
</template>

<script>
  export default {
    layout: 'dashboard',
    asyncData({params}){
      return{
        id: params.id
      }
    }
  }
</script>
