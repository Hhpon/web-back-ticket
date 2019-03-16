<template>
  <el-container>
    <el-header class="header-container" height="100px">高铁订票小程序后台</el-header>
    <el-container>
      <el-aside width="150px" class="aside">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="touterBol"
        >
          <el-menu-item index="admin">
            <span>车票管理</span>
          </el-menu-item>
          <el-menu-item index="user">
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="addtic">
            <span>新增车票</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      defaultActive: "admin",
      touterBol: true
    };
  },
  mounted() {
    this.defaultActive = this.$router.currentRoute.path.substring(1)
  }
};
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";

.header-container {
  line-height: 100px;
  font-size: 50px;
  font-weight: bolder;
  text-align: center;
}
</style>

