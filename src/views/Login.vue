<template>
  <div class="login-view">
    <el-row style="height: 100%;">
      <el-col :xs="20" :sm="20" :md="20" class="login-form">
        <el-col :span="13" style="height: 100%; position: relative">
          <div ref="leftImg" class="left-part">
            <div class="logo-bar">
              <img class="logo-bg" src="../assets/images/bg-circle.png">
              <img class="logo" src="/static/images/sign.png">
            </div>
          </div>
        </el-col>
        <el-col :span="11" class="information">
          <div class="gradient-bg">
            <el-form>
              <el-form-item>
                <el-input
                  v-model="email"
                  :class="{ error: loginError.email }"
                  placeholder="请输入用户名">
                  <el-button slot="prepend">
                    <i class="fa fa-user"/>
                  </el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="password"
                  :class="{ error: loginError.password }"
                  placeholder="请输入密码"
                  type="password"
                  @keyup.enter.native="login">
                  <el-button slot="prepend">
                    <i class="fa fa-lock"/>
                  </el-button>
                </el-input>
              </el-form-item>
            </el-form>
            <div>
              <p v-if="hasSignup" class="signup">
                没有账户？
                <router-link :to="{ path: '/signup' }" class="link">
                  马上注册
                </router-link>
              </p>
              <div style="clear:both;"/>
            </div>
            <div class="login-footer">
              <el-button :loading="btnloading" type="success" @click="login">
                登录
              </el-button>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {SHA256} from 'crypto-js'
  import lottie from 'lottie-web'

  // eslint-disable-next-line
  import LoginApi from '@/api/LoginApi'
  import bgAnimation from '@/assets/bg-animation.json'

  export default {
    name: 'Login',
    data () {
      return {
        email: '845885222@qq.com',
        password: '13136513736',
        remember: true,
        loginError: {
          email: '',
          password: ''
        },
        hasSignup: true,
        btnloading: false
      }
    },
    mounted () {
      lottie.loadAnimation({
        container: this.$refs.leftImg,
        animationData: bgAnimation, // json file path
        loop: true,
        autoplay: true,
        renderer: 'canvas'
      })
    },
    methods: {
      ...mapActions([
        'USER_LOGIN',
        'LEFT_MENUS',
        'NAV_TABS',
        'USER_PERMISSIONS',
        'GET_DICT_CODE',
        'SHOW_PRODUCTS_MALL',
        'USER_LOGO',
        'USER_LOGO_DARK'
      ]),
      login () {
        if (!this.email) {
          this.loginError.email = '请输入邮箱地址'
          return false
        }
        if (!this.password) {
          this.loginError.password = '请输入密码'
          return false
        }
        const data = {
          email: this.email,
          password: SHA256(this.password).toString(),
          remember: this.remember
        }
        this.btnloading = true
        LoginApi.login(data).then((response) => {
          const userInfo = {
            token: response.data.token,
            userIntID: response.data.userIntID,
            username: response.data.username,
            tenantType: response.data.tenantType,
            tenantID: response.data.tenantID
          }
          this.USER_LOGIN({user: userInfo, remember: this.remember})
          this.LEFT_MENUS({menus: response.data.menus})
          this.NAV_TABS({tabs: response.data.tabs})
          this.USER_PERMISSIONS({permissions: response.data.permissions})
          this.SHOW_PRODUCTS_MALL({showProductsMall: response.data.show_products_mall})
          this.USER_LOGO({userLogo: response.data.logo})
          this.USER_LOGO_DARK({userLogoDark: response.data.logoDark})
          this.GET_DICT_CODE()
          const path = decodeURIComponent(this.$route.query.redirect || '/')
          this.$router.push({path})
          this.btnloading = false
        }).catch(() => {
          this.btnloading = false
          this.loginError.email = '登录邮箱或密码错误'
          // this.email = ''
          // this.password = ''
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "@/assets/scss/variable.scss";

  .login-view {
    background-color: #333844;
    height: 100%;
    .login-form {
      max-width: 1200px;
      height: 70%;
      max-height: 600px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .left-part {
        height: 100%;

        .logo-bar {
          position: absolute;
          width: 34%;
          left: 49%;
          transform: translateX(-50%);
          top: 32%;

          .logo-bg {
            width: 100%;
            display: block;
          }
          .logo {
            width: 72%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
          }
        }
        .item-name {
          width: 100%;
          position: absolute;
          top: 50%;
          text-align: center;
          font-size: 24px;
          color: #fff;
        }
      }
    }
    .el-card {
      border: none;
      background-color: #ffffff;
      border-radius: 0;
    }
    .el-card__body {
      padding: 0;
    }
    .left-img {
      width: 400px;
      height: 524px;
      display: block;
    }
    .information {
      position: relative;
      top: 50%;
      transform: translateY(-50%);

      .gradient-bg {
        width: 66%;
        max-width: 420px;
        min-width: 360px;
        position: absolute;
        right: 0;
        transform: translateY(-50%);
        background-image: url(../assets/images/bg-small.png);
        background-size: cover;
        padding: 60px 40px;
      }
      .el-form-item {
        margin-bottom: 20px;
        .el-input {
          height: 36px;
          line-height: 36px;
          border-radius: 50px;
        }
      }
      .signup {
        float: right;
        margin: 0;
        color: #8e9196;

        .link {
          color: #23c88e;
        }
      }
    }
    .el-input {
      background-color: rgba($color: #e6e8f1, $alpha: 0.09);

      &.error {
        ::-webkit-input-placeholder {
          color: #e0b4b4;
        }
        ::-moz-placeholder {
          color: #e0b4b4;
        }
        .el-input__inner {
          border: 2px solid #e0b4b4;
        }
      }
    }
    .login-footer {
      margin-top: 32px;
      .el-button {
        width: 100%;
        height: 36px;
        background-color: #23c88e;
        border-color: #23c88e;
        border-radius: 50px;
        font-size: 18px;
        box-shadow: 0px 3px 24px -3px #09935F;
        padding: 8px 20px;
      }
    }
    .checkbox {
      float: left;
      display: block;
      margin: 0;

      .el-checkbox__inner {
        background-color: #e1e3e4;
        border: 0;
      }
      .el-checkbox__inner::after {
        left: 5px;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #23c88e;
      }
      .el-checkbox__label {
        color: #8e9196;
        font-size: 14px;
        font-weight: normal;
      }
    }
  }
</style>
