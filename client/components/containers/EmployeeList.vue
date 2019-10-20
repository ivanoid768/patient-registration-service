<template>
  <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="employeeList">
    <a-list-item slot="renderItem" slot-scope="item" key="item.id">
      <a-list-item-meta>
        <slot name="title" v-bind:employee="item" v-bind:employeeRole="employeeRole">
          <nuxt-link
            :to="`/${employeeRole}/view/${item.id}`"
            slot="title"
          >{{item.name}} {{item.surname}}</nuxt-link>
        </slot>
      </a-list-item-meta>
      <template slot="actions">
        <slot name="actions" v-bind:employee="item" v-bind:employeeRole="employeeRole">
          <span v-for="{type, text, href} in allActions" :key="type">
            <nuxt-link :to="`/${employeeRole}/${href}/${item.id}`">
              <a-icon :type="type" />
              {{text}}
            </nuxt-link>
          </span>
        </slot>
      </template>
      <slot v-bind:employee="item"></slot>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  props: {
    employeeList: Array,
    employeeRole: String,
    actions: Array
  },
  data() {
    return {
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 10,
        position: "both"
      },
      essentialActions: [
        { type: "eye", text: "Подробнее", href: "view" },
        { type: "edit", text: "Редактировать", href: "edit" },
        { type: "delete", text: "Удалить", href: "remove" }
      ]
    };
  },
  computed: {
    allActions() {
      if (this.actions) return [...this.essentialActions, ...this.actions];
      else return this.essentialActions;
    }
  }
};
</script>

<style lang="scss" scoped>
.ant-list-split .ant-list-item {
  border-bottom: 1px solid #d9d9d9;
}
</style>