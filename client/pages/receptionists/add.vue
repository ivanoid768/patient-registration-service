<template>
  <div class="content">
    <h2>Добавить нового сотрудника регистратуры</h2>
    <a-form :form="form" class="create-receptionist-form" layout="horizontal">
      <a-form-item label="Имя" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-input
          v-decorator="[
          'name',
          { rules: [{ required: true, message: 'Необходимо ввести имя!' }] }
        ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="Фамилия" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-input
          v-decorator="[
          'surname',
          { rules: [{ required: true, message: 'Необходимо ввести фамилию!' }] }
        ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="Отчество" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-input v-decorator="[
          'middlename'
        ]"></a-input>
      </a-form-item>
      <a-form-item label="Телефон" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-input
          v-decorator="[
          'phone',
          { rules: [{ required: true, message: 'Необходимо ввести телефон!' }] }
        ]"
        >
          <a-icon slot="prefix" type="phone" />
        </a-input>
      </a-form-item>
      <a-form-item label="Е-майл" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-input v-decorator="[
          'email'
        ]">
          <a-icon slot="prefix" type="mail" />
        </a-input>
      </a-form-item>
      <a-form-item class="submit-cntr">
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
        >Добавить сотрудника регистратуры</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      form: this.$form.createForm(this)
    };
  }
};
</script>

<style lang="scss" scoped>
.create-receptionist-form {
  max-width: 600px;

  .submit-cntr {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
