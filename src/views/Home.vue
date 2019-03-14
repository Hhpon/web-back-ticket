<template>
  <el-container>
    <el-header class="header-container" height='100px'>高铁订票小程序后台</el-header>
    <el-container>
      <el-aside width="150px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="2">
            <router-link to="/admin" tag="span">车票管理</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/user" tag="span">用户管理</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/addtic" tag="span">新增车票</router-link>
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
  name: "home"
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

