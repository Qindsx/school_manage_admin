<template>
  <el-container class="manager-page">
    <el-aside width="200px" class="left-box">
      <LeftMenu />
    </el-aside>
    <el-container>
      <el-header height="50px" class="top-box">
        <el-icon>
          <Fold />
        </el-icon>
        <el-dropdown class="right-dropdown">
          <span>
            欢迎登录:admin
            <el-icon>
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="mine">我的信息</el-dropdown-item>
              <div class="avatar-wrapper">{{ userInfo.name }}</div>
              <el-dropdown-item divided @click="exit">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main class="main-box">
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LeftMenu from "../components/LeftMenu.vue";
import { Fold, ArrowDown } from "@element-plus/icons-vue";
export default {
  name: "Manager",
  //components将组件注册成一个虚拟标签
  components: {
    LeftMenu: LeftMenu,
    Fold,
    ArrowDown,
  },
  data(){
    return{
      userInfo: {},
    }
  },
  methods:{
   exit() { // 跳转到登录界面
      this.$router.push({name: 'Login'})
    },
  },
};
</script>

<style lang="scss" scoped>
.manager-page {
  height: 100%;
  .left-box {
    border-right: 1px solid #d3d3d3;
    overflow: hidden; //溢出隐藏
  }
  .top-box {
    border-bottom: 1px solid lightgray;
    padding: 0px 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .right-dropdown {
      color: deeppink;
      margin-right: 20px;
    }
  }
  .main-box {
    background-color: #f5f7f9;
    padding: 5px;
    box-sizing: border-box;
  }
  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
}
</style>
