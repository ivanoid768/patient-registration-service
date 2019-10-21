<template>
  <div class="content">
    <h2>Редактировать данные о враче {{doctor.name}} {{doctor.surname}}</h2>
    <a-form :form="form" class="create-doctor-form" layout="horizontal">
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
      <a-form-item label="Специальность" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-input
          v-decorator="[
          'specialty',
          { rules: [{ required: true, message: 'Необходимо ввести специализацию (напр. Терапевт)!' }] }
        ]"
        >
          <a-icon slot="prefix" type="user-add" />
        </a-input>
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
      doctor: store.state.doctors.list[params.id]
    };
  },
  created() {
    this.form = this.$form.createForm(this, {
      onFieldsChange: (_, changedFields) => {
        this.$emit("change", changedFields);
      },
      onValuesChange: (_, values) => {
        console.log(values);
        // Synchronize to vuex store in real time
        // this.$store.commit('update', values)
      },
      mapPropsToFields: () => {
        let defaultForm = Object.create(null);

        for (const key in this.doctor) {
          if (this.doctor.hasOwnProperty(key)) {
            defaultForm[key] = this.$form.createFormField({
              value: this.doctor[key]
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
.create-doctor-form {
  max-width: 600px;

  .submit-cntr {
    display: flex;
    justify-content: flex-end;
  }
}
</style>