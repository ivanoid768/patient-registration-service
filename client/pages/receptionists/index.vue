<template>
  <div class="content">
    <h2>Список сотрудников регистратуры</h2>
    <div class="receptionists-list-cntr">
      <employee-list
        :employeeList="receptionistList"
        employeeRole="receptionists"
        v-slot="{employee}"
      >
        <div class="receptionist-attrs">
          <div class="receptionist-attr">
            <div class="receptionist-attr-name">Имя</div>
            <div class="receptionist-attr-val">{{employee.name}}</div>
          </div>
          <div v-if="employee.middlename" class="receptionist-attr">
            <div class="receptionist-attr-name">Отчество</div>
            <div class="receptionist-attr-val">{{employee.middlename}}</div>
          </div>
          <div class="receptionist-attr">
            <div class="receptionist-attr-name">Фамилия</div>
            <div class="receptionist-attr-val">{{employee.surname}}</div>
          </div>
          <div class="receptionist-attr">
            <div class="receptionist-attr-name">Телефон</div>
            <div class="receptionist-attr-val">{{employee.phone}}</div>
          </div>
          <div v-if="employee.email" class="receptionist-attr">
            <div class="receptionist-attr-name">Е-мэйл</div>
            <div class="receptionist-attr-val">{{employee.email}}</div>
          </div>
        </div>
      </employee-list>
    </div>
  </div>
</template>

<script>
import EmployeeList from "@/components/containers/EmployeeList";

export default {
  layout: "dashboard",
  components: {
    EmployeeList
  },
  asyncData({ store }) {
    return {
      receptionistList: store.state.receptionists.list
    };
  }
};
</script>

<style lang="scss" scoped>
.receptionist-attrs {
  display: flex;
  flex-direction: column;
}

.receptionist-attr {
  display: flex;
  flex-direction: row;
  max-width: 500px;
  margin-bottom: 5px;
}

.receptionist-attr-name {
  font-weight: bold;
  flex-basis: 150px;
}

.receptionist-attr-val {
  font-weight: initial;
}
</style>
