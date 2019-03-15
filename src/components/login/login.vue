<template>
  <div class="login">
    <div style="height: 180px;"></div>
    <div class="login-container">
      <div class="login-title">登录</div>
      <el-form :label-position="labelPosition" label-width="60px" :model="loginMes">
        <el-form-item label="账号">
          <el-input v-model="loginMes.userName" @keyup.enter.native="submitHandle"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" @keyup.enter.native="submitHandle" v-model="loginMes.passWord"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitHandle" class="btn-container">提交</el-button>
    </div>
  </div>
</template>

<script>
import { ERR_OK } from "common/js/config";
import { login } from "api/login";

export default {
  data() {
    return {
      labelPosition: "right",
      loginMes: {
        userName: "",
        passWord: ""
      }
    };
  },
  methods: {
    submitHandle() {
      if (!this.loginMes.userName || !this.loginMes.passWord) {
        alert("请输入完整再点击提交！");
        return;
      }
      login(this.loginMes.userName, this.loginMes.passWord).then(res => {
        if (res.data.code === ERR_OK) {
          this.$router.push("/");
          return;
        }
        alert("账号或密码错误");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";

.login {
  .login-container {
    border: 1px solid $color-border;
    border-radius: 5px;
    width: 400px;
    margin: 0 auto;
    padding: 0 20px;
    .login-title {
      line-height: 50px;
      font-size: $font-size-large;
      text-align: center;
      font-weight: 700;
      padding: 10px 0;
    }
  }
  .btn-container {
    width: 30%;
    display: block;
    margin: 20px auto;
  }
}
</style>


