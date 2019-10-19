<template>
  <div class="content">
    <h2>Список врачей</h2>
    <div class="doctors-list-cntr">
      <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="doctorList">
        <a-list-item slot="renderItem" slot-scope="item" key="item.id">
          <a-list-item-meta>
            <nuxt-link :to="`/doctors/view/${item.id}`" slot="title">{{item.name}} {{item.surname}}</nuxt-link>
          </a-list-item-meta>
          <template slot="actions" v-for="{type, text, href} in actions">
            <span :key="type">
              <nuxt-link :to="`/doctors/${href}/${item.id}`">
                <a-icon :type="type" />
                {{text}}
              </nuxt-link>
            </span>
          </template>
          <div class="doctor-attrs">
            <div class="doctor-attr">
              <div class="doctor-attr-name">Имя</div>
              <div class="doctor-attr-val">{{item.name}}</div>
            </div>
            <div v-if="item.middlename" class="doctor-attr">
              <div class="doctor-attr-name">Отчество</div>
              <div class="doctor-attr-val">{{item.middlename}}</div>
            </div>
            <div class="doctor-attr">
              <div class="doctor-attr-name">Фамилия</div>
              <div class="doctor-attr-val">{{item.surname}}</div>
            </div>
            <div class="doctor-attr">
              <div class="doctor-attr-name">Специальность</div>
              <div class="doctor-attr-val">{{item.specialty}}</div>
            </div>
            <div class="doctor-attr">
              <div class="doctor-attr-name">Телефон</div>
              <div class="doctor-attr-val">{{item.phone}}</div>
            </div>
            <div v-if="item.email" class="doctor-attr">
              <div class="doctor-attr-name">Е-мэйл</div>
              <div class="doctor-attr-val">{{item.email}}</div>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
      doctorList,
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 10,
        position: "both"
      },
      actions: [
        { type: "eye", text: "Подробнее", href: "view" },
        { type: "edit", text: "Редактировать", href: "edit" },
        { type: "delete", text: "Удалить", href: "remove" }
      ]
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

.ant-list-split .ant-list-item {
  border-bottom: 1px solid #d9d9d9;
}
</style>