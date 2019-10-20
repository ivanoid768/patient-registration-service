<template>
  <div class="content">
    <h2>Список врачей</h2>
    <div class="doctors-list-cntr">
      <employee-list :employeeList="doctorList" employeeRole="doctors" v-slot="{employee}">
        <div class="doctor-attrs">
          <div class="doctor-attr">
            <div class="doctor-attr-name">Имя</div>
            <div class="doctor-attr-val">{{employee.name}}</div>
          </div>
          <div v-if="employee.middlename" class="doctor-attr">
            <div class="doctor-attr-name">Отчество</div>
            <div class="doctor-attr-val">{{employee.middlename}}</div>
          </div>
          <div class="doctor-attr">
            <div class="doctor-attr-name">Фамилия</div>
            <div class="doctor-attr-val">{{employee.surname}}</div>
          </div>
          <div class="doctor-attr">
            <div class="doctor-attr-name">Специальность</div>
            <div class="doctor-attr-val">{{employee.specialty}}</div>
          </div>
          <div class="doctor-attr">
            <div class="doctor-attr-name">Телефон</div>
            <div class="doctor-attr-val">{{employee.phone}}</div>
          </div>
          <div v-if="employee.email" class="doctor-attr">
            <div class="doctor-attr-name">Е-мэйл</div>
            <div class="doctor-attr-val">{{employee.email}}</div>
          </div>
        </div>
      </employee-list>
    </div>
  </div>
</template>

<script>
import EmployeeList from "../../components/containers/EmployeeList";

const doctorList = [];

for (let i = 0; i < 25; i++) {
  doctorList.push({
    id: i,
    name: "Иван",
    surname: `Иванов 0${i + 1}`,
    middlename: `Александрович`,
    specialty: "Терапевт",
    phone: `+7 ${i}${i}${i} ${i}${i}${i} ${i}${i} ${i}${i}`,
    email: `ivan.ivanov${i}@mail.com`
  });
}

export default {
  layout: "dashboard",
  components: {
    EmployeeList
  },
  data() {
    return {
      doctorList
    };
  }
};
</script>

<style lang="scss" scoped>
.doctor-attrs {
  display: flex;
  flex-direction: column;
}

.doctor-attr {
  display: flex;
  flex-direction: row;
  max-width: 500px;
  margin-bottom: 5px;
}

.doctor-attr-name {
  font-weight: bold;
  flex-basis: 150px;
}

.doctor-attr-val {
  font-weight: initial;
}
</style>