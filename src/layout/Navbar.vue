<template>
  <div>
    <div class="topbar">
      <div class="site-title">
        <a href="/">
          <img alt="logo" src="/static/images/logo.png">
          <!-- <img alt="logo" src="../assets/images/logo-darkTheme.png"> -->
        </a>
      </div>
      <!--<img v-show="$store.state.accounts.loading" src="../assets/svg/loading.svg" class="loading" />-->
    </div>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      logoSrc: ''
    }
  },
  computed: {
  },
  methods: {
    logout() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/variable.scss";

.topbar {
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  @media screen and (max-width: 1366px) {
    height: $topbar-height-small;
  }
  height: $topbar-height;

  padding: 0 28px 0 18px;
  background-color: var(--color-topbar-bg);
  z-index: 1003;
  box-shadow: 0 0 20px -1px var(--color-shadow);
  /* flex */
  display: flex;
  align-items: center;
  justify-content: space-between;

  .site-title {
    img {
      width: 160px;
    }
  }

  /*.loading {*/
  /*position: absolute;*/
  /*top: 8px;*/
  /*width: 72px;*/
  /*height: 40px;*/
  /*}*/

  .search-bar {
    width: 32%;
    min-width: 320px;
    .el-select {
      width: 100%;
    }
    .el-icon-search:before {
      position: absolute;
      z-index: 1;
      top: 50%;
      transform: translateY(-50%);
      font-size: 18px;
      left: 14px;
      color: var(--color-topbar-text);
    }
    .el-input {
      .el-input__inner {
        height: 38px;
        line-height: 38px;
        border-radius: 38px;
        padding-left: 40px;
        background-color: var(--color-topbar-input-bg);
        border: none;
        color: var(--color-topbar-text);
        &::-webkit-input-placeholder {
          color: var(--color-topbar-text);
        }
      }
      .el-select__caret {
        color: var(--color-topbar-text);
        &.is-show-close:hover {
          color: var(--color-topbar-text);
        }
      }
      .el-input__icon {
        line-height: 38px;
      }
      .el-input__prefix {
        left: 10px;
      }
    }
    &:hover {
      .el-input {
        .el-input__inner {
          background-color: var(--color-topbar-input-bg);
        }
      }
    }

    @media screen and (max-width: 1366px) {
      .el-input {
        .el-input__inner {
          height: 32px;
          line-height: 32px;
          border-radius: 32px;
        }
        .el-input__icon {
          line-height: 32px;
        }
      }
    }
  }

  .topbar-right {
    font-size: $topbar-font-size;
    @media screen and (max-width: 1366px) {
      font-size: $topbar-font-size-small;
    }
    display: inline-block;
    .material-icons {
      vertical-align: middle;
      color: var(--color-topbar-text);
    }
    .el-dropdown {
      margin-left: 18px;
      font-size: $topbar-font-size;
      @media screen and (max-width: 1366px) {
        font-size: $topbar-font-size-small;
      }
      color: var(--color-topbar-text);
    }
    .el-dropdown-link {
      cursor: pointer;
    }
    .top-link {
      margin-right: 20px;
      color: var(--color-topbar-text);
      &:hover {
        color: var(--color-topbar-text);
      }
    }
    .is-select {
      font-weight: 800;
    }
    .notifications-box {
      a {
        color: #ffffff;
      }
      display: inline-block;
      .is-noticed {
        font-weight: 800;
      }
    }
  }
}
.el-dropdown-menu {
  background-color: var(--color-bg-card);
  border-color: var(--color-bg-card);
  -webkit-box-shadow: 0 2px 12px 0 var(--color-shadow);
  box-shadow: 0 2px 12px 0 var(--color-shadow);
  .el-dropdown-menu__item {
    color: var(--color-text-light);
    &:not(.is-disabled):hover {
      color: var(--color-main-green);
      background-color: transparent;
    }
  }
  &.el-popper[x-placement^="bottom"] .popper__arrow {
    border-bottom-color: var(--color-bg-card);
    &::after {
      border-bottom-color: var(--color-bg-card);
    }
  }
}
.el-select-dropdown {
  background-color: var(--color-bg-card);
  border-color: var(--color-bg-card);
  -webkit-box-shadow: 0 2px 12px 0 var(--color-shadow);
  box-shadow: 0 2px 12px 0 var(--color-shadow);
  .el-select-dropdown__item {
    color: var(--color-text-light);
    &:not(.is-disabled):hover, &.hover, &.selected {
      color: var(--color-main-green);
      background-color: transparent;
    }
  }
  &.el-popper[x-placement^="bottom"] .popper__arrow {
    border-bottom-color: var(--color-bg-card);
    &::after {
      border-bottom-color: var(--color-bg-card);
    }
  }
}

.topbar-dialog {
  .el-upload-list--picture .el-upload-list__item-thumbnail {
    width: 200px;
  }
  .el-upload-list__item-name {
    padding-left: 20px;
  }
}
.emq-dialog .el-dialog__body {
  padding: 20px;
}
.el-radio {
  .el-radio__label {
    color: var(--color-text-lighter);
  }
  .el-radio__inner {
    background-color: var(--color-checkbox-inner);
  }
}
</style>
