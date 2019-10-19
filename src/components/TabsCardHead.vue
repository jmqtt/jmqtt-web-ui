<template>
  <div class="tabs-card-head">
    <a
      v-for="(tab, index) in tabsData"
      :key="index"
      :class="{ active: $route.path === tab.path, onlytab: tabs.length < 2 }"
      class="crud-title"
      href="javascript:;"
      @click="$router.push({ path: tab.path })">
      {{ tab.name }}
    </a>
    <slot name="custom-tab"/>
  </div>
</template>
<script>
export default {
  name: 'TabsCardHead',
  props: {
    // An array of tab title
    tabs: {
      type: Array,
      required: true
    }
  },
  computed: {
    tabsData() {
      const data = []
      this.tabs.forEach((tabItem) => {
        data.push({ name: this.$t(`resource.${tabItem.code}`), path: tabItem.url })
      })
      return data
    }
  }
}
</script>
<style lang="scss">
.tabs-card-head {
  height: 51px;
  .crud-title {
    color: var(--color-text-light) !important;
    width: auto;
    margin-right: 34px;
    height: 50px;
    line-height: 50px;
    text-align: left;
    background-color: transparent;
    display: inline-block;
    font-size: 18px;
    border-radius: 0;

    &.active {
      color: #34C388 !important;
      border-bottom: 2px solid #2fc285;
      &.onlytab {
        border-bottom-color: transparent;
      }
    }
  }
}
</style>
