<template>
  <div class="content">
    <h2>Регистрация</h2>
    <a-form class="login-form">
      <default-fields/>
      <a-form-item class="submit-cntr">
        <a-button type="primary" html-type="submit" class="login-form-button">Зарегистрироваться</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import DefaultSignUpFileds from '../../components/signup/default'

export default {
  components:{
    'default-fields': DefaultSignUpFileds
  },
  layout: "unauth"
};
</script>

<style lang="scss" scoped>
.content {
  width: 400px;

  .submit-cntr{
    display: flex;
    justify-content: flex-end;
  }
}
</style>