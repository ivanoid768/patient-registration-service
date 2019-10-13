<template>
  <div class="content">
    <h2>Регистрация</h2>
    <p>Выберите в какой роли вы желаете зарегистрироваться в системе:</p>
    <div>
      <a-row>
        <nuxt-link to="/signup/owner">
          <a-button type="primary" icon="user">Владелец / Главврач / Главный сотрудник регистратуры</a-button>
        </nuxt-link>
      </a-row>
      <a-row>
        <nuxt-link to="/signup/receptionist">
          <a-button type="primary" icon="robot">Сотрудник регистратуры</a-button>
        </nuxt-link>
      </a-row>
      <a-row>
        <nuxt-link to="/signup/doctor">
          <a-button type="primary" icon="user-add">Врач</a-button>
        </nuxt-link>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  layout: "unauth"
};
</script>

<style lang="scss" scoped>
.content {
  width: 450px;

  button{
    margin: 4px 0;
  }
}
</style>