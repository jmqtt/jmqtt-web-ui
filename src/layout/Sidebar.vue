<template>
  <div class="leftbar-warpper">
    <el-scrollbar>
      <el-menu
        :default-openeds="defaultOpeneds"
        :default-active="defaultActive"
        class="leftbar"
        unique-opened
        router
        background-color="var(--color-bg-card)"
        text-color="var(--color-text-light)"
        active-text-color="var(--color-main-green)"
        collapse>
        <el-menu-item :route="{ path: '/' }" class="el-submenu" index="/">
          <div class="menu-info">
            <i class="fa fa-home"/>
            <div class="menu-info--name">首页</div>
          </div>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <div class="menu-info">
              <i class="fa fa-microchip"/>
              <div class="menu-info--name">
                设备管理
              </div>
            </div>
          </template>
          <el-menu-item>
            设备管理
          </el-menu-item>
          <el-menu-item>
            产品管理
          </el-menu-item>
          <el-menu-item>
            设备日志
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <div class="menu-info">
              <i class="fa fa-bell-o"/>
              <div class="menu-info--name">
                告警管理
              </div>
            </div>
          </template>
          <el-menu-item>
            当前告警
          </el-menu-item>
          <el-menu-item>
            历史告警
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { Scrollbar } from 'element-ui'

export default {
  name: 'Sidebar',
  components: { 'el-scrollbar': Scrollbar },

  data() {
    return {
      btnLoading: false,
      defaultOpeneds: [],
      defaultActive: this.$route.path.replace(/\/\d+/g, '')
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import "../assets/scss/variable.scss";

.leftbar-warpper {
  .el-scrollbar__wrap {
    overflow-x: hidden;
    background-color: var(--color-bg-card);
  }
  .el-scrollbar__bar {
    opacity: 0;

    &.is-vertical {
      right: 0;
      width: 2px;
      .el-scrollbar__thumb {
        width: 2px;
      }
    }
    &.is-horizontal {
      display: none;
    }
  }

  &:hover {
    .el-scrollbar__bar {
      transition: opacity .3s;
      opacity: 1;
    }
  }

  position: fixed;
  top: $topbar-height;
  width: $leftbar-width;
  overflow-x: hidden;
  @media screen and (max-width: 1366px) {
    top: $topbar-height-small;
    width: $leftbar-width-small;
  }
  bottom: 0;
  z-index: 1000;
  border-right: 0;
  box-shadow: 0 0 12px -3px var(--color-shadow);
}

.leftbar {
  padding-top: 6px;
  padding-bottom: 6px;
  &.el-menu {
    border-right: none;
    width: 100%;
  }
  .el-menu-item,
  .el-submenu__title {
    height: auto;
    line-height: 20px;
  }
  .menu-info {
    margin: 0 auto;
    text-align: center;
  }
  .fa {
    display: block;
    margin: 0 auto;
    height: 44px;
    width: 44px;
    line-height: 44px;
    font-size: 26px;
    transition: all .1s ease-in;
    color: var(--color-text-light);
  }
  .el-submenu {
    height: auto;
    &.el-menu-item, .el-submenu__title {
      padding: 12px 0 16px !important;
    }
    &.is-active, &:hover {
      background-color: var(--color-bg-hover)!important;
      .el-submenu__title {
        background-color: var(--color-bg-hover)!important;
      }
      .material-icons {
        color: var(--color-main-green);
      }
      .menu-info--name {
        color: var(--color-main-green);
      }
    }
    @media screen and (max-width: 1366px) {
      &.el-menu-item, .el-submenu__title {
        padding: 6px 0 10px !important;
      }
      .material-icons {
        height: 40px;
        width: 40px;
      }
    }
  }
}

/* narrow sidebar */
.el-menu--collapse {
  .el-submenu .el-menu-item {
    padding-left: 40px !important;
  }
  .site-title .el-tooltip {
    padding-left: 0 !important;
    img {
      margin-left: 12px;
    }
  }
}

.el-menu--vertical {
  text-align: center;
  border-radius: 6px;
  .el-menu--popup {
    border-radius: 6px;
    min-width: 120px;
    padding: 0;
    -webkit-box-shadow: 0 2px 12px 0 var(--color-shadow);
    box-shadow: 0 2px 12px 0 var(--color-shadow);
  }
  .el-menu-item {
    height: 44px;
    line-height: 44px;
    text-align: left;
    color: var(--color-text-light);
    &:first-of-type {
      border-radius: 6px 6px 0 0;
    }
    &:last-of-type {
      border-radius: 0 0 6px 6px;
    }
    &.only-one {
      border-radius: 6px;
    }
    /*&:first-of-type {*/
      /*border-radius: 6px;*/
      /*&:last-of-type {*/
        /*border-radius: 6px;*/
      /*}*/
    /*}*/
    &:hover, &.is-active {
      background-color: var(--color-main-green)!important;
      color: #fff !important;
    }
  }
}
</style>
