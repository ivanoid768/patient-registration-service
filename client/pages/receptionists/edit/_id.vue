<template>
  <div class="content">
    <h2>Редактировать данные о сотруднике регистартуры {{receptionist.name}} {{receptionist.surname}}</h2>
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
        <a-button type="primary" html-type="submit" class="login-form-button">Сохранить изменения</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  asyncData({ params, store }) {
    return {
      id: params.id,
      receptionist: store.state.receptionists.list[params.id]
    };
  },
  created() {
    this.form = this.$form.createForm(this, {
      onFieldsChange: (_, changedFields) => {
        this.$emit("change", changedFields);
      },
      onValuesChange: (_, values) => {
        console.log(values);
      },
      mapPropsToFields: () => {
        let defaultForm = Object.create(null);

        for (const key in this.receptionist) {
          if (this.receptionist.hasOwnProperty(key)) {
            defaultForm[key] = this.$form.createFormField({
              value: this.receptionist[key]
            });
          }
        }

        return defaultForm;
      }
    });
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
