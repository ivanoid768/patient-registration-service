<template>
  <div class="sidebar">
    <a-menu mode="inline" :defaultSelectedKeys="['1']" :defaultOpenKeys="['sub1']" theme="light">
      <a-sub-menu key="sub1">
        <span slot="title">
          <nuxt-link to="/schedule/day">
            <a-icon type="user" />График (приема)
          </nuxt-link>
        </span>
        <a-menu-item key="1">
          <nuxt-link to="/schedule/day">День</nuxt-link>
        </a-menu-item>
        <a-menu-item key="2">
          <nuxt-link to="/schedule/month">Месяц</nuxt-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title">
          <a-icon type="laptop" />Доктора
        </span>
        <a-menu-item key="3">
          <nuxt-link to="/doctors/">Список</nuxt-link>
        </a-menu-item>
        <a-menu-item key="4">
          <nuxt-link to="/doctors/add">Добавить</nuxt-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title">
          <a-icon type="notification" />Пациенты
        </span>
        <a-menu-item key="5">Список</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span slot="title">
          <a-icon type="laptop" />Регистраторы
        </span>
        <a-menu-item key="6">Список</a-menu-item>
        <a-menu-item key="7">Добавить</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.ant-menu {
  height: 100%;
}
</style>