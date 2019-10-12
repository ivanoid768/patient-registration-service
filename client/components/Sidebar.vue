<template>
  <div class="sidebar">
    <a-menu
      mode="inline"
      :defaultSelectedKeys="currentNav"
      :defaultOpenKeys="defaultOpenKeys"
      theme="light"
    >
      <a-sub-menu key="schedule">
        <span slot="title">
          <nuxt-link to="/schedule/day">
            <a-icon type="calendar" />График (приема)
          </nuxt-link>
        </span>
        <a-menu-item key="schedule-day">
          <nuxt-link to="/schedule/day">День</nuxt-link>
        </a-menu-item>
        <a-menu-item key="schedule-month">
          <nuxt-link to="/schedule/month">Месяц</nuxt-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="doctors">
        <span slot="title">
          <a-icon type="user-add" />Доктора
        </span>
        <a-menu-item key="doctors">
          <nuxt-link to="/doctors/">Список</nuxt-link>
        </a-menu-item>
        <a-menu-item key="doctors-add">
          <nuxt-link to="/doctors/add">Добавить</nuxt-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="patients">
        <span slot="title">
          <a-icon type="team" />Пациенты
        </span>
        <a-menu-item key="patients">
          <nuxt-link to="/patients">Список</nuxt-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="receptionists">
        <span slot="title">
          <a-icon type="robot" />Регистраторы
        </span>
        <a-menu-item key="receptionists">
          <nuxt-link to="/receptionists">Список</nuxt-link>
        </a-menu-item>
        <a-menu-item key="receptionists-add">
          <nuxt-link to="/receptionists/add">Добавить</nuxt-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="settings">
        <nuxt-link to="/settings">
          <a-icon type="setting" />Настройки
        </nuxt-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
 computed: {
    currentNav () {      
      return [this.$store.state.currentNav]
    },
    defaultOpenKeys(){
      return [this.$store.state.currentNav.split('-')[0]];
    }
  },
};
</script>

<style lang="scss" scoped>
.ant-menu {
  height: 100%;
}
</style>