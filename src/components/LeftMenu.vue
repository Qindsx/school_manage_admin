<template>
  <!-- 背景颜色 -->
  <!-- 文字颜色 -->
  <!-- 选中颜色 -->
  <!-- 默认只展示一个子菜单 -->
  <el-menu
    class="left-menu"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened="true"
    router="true"
    :default-active="$route.path"
  >
    <!-- 左侧title -->
    <div class="menu-title">
      <el-icon class="is-loading" size="24px">
        <Loading />
      </el-icon>
      <span style="margin-left: 5px">校园防疫报备管理系统</span>
    </div>
    <el-sub-menu index="0">
      <template #title
        ><!-- #title是菜单标题 -->
        <el-icon><Promotion /></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/Manager/StudentInfoList">学生管理</el-menu-item>
      <el-menu-item index="/Manager/TeacherInfoList">教师管理</el-menu-item>
      <el-menu-item index="/Manager/StaffInfoList">职工管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Avatar /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/Manager/AdminInfoList">管理员列表</el-menu-item>
      <el-menu-item index="/Manager/RoleInfoList">角色管理</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/Manager/AreaInfoList">
      <template #title>
        <el-icon><VideoCameraFilled /></el-icon>
        <span slot="title" >风险地区管理</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/Manager/ApplyInfoList">
      <template #title>
        <el-icon><Monitor /></el-icon>
        <span>审核申请</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/Manager/AnnunciateInfoList">
      <template #title>
        <el-icon><Setting/></el-icon>
        <span>疫情通告管理</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="5">
      <template #title>
        <el-icon><Histogram /></el-icon>
        <span>信息统计</span>
      </template>
      <el-menu-item index="/Manager/HealthCodeInfoList">健康码统计</el-menu-item>
      <el-menu-item index="/Manager/HealthCodeErrorInfoList">健康码有异统计</el-menu-item>
      <el-menu-item index="/Manager/TravelCodeInfoList">行程码统计</el-menu-item>
      <el-menu-item index="/Manager/TravelCodeErrorInfoList">行程码有异统计</el-menu-item>
      <el-menu-item index="/Manager/NucleicAcidTestInfoList">核酸检测统计</el-menu-item>
      <el-menu-item index="/Manager/NucleicAcidTestErrorInfoList">核酸检测有异统计</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/Manager/DisinfectInfoList">
      <template #title>
        <el-icon><Loading/></el-icon>
        <span slot="title">学校消毒记录</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/Manager/table">
      <template #title>
        <el-icon><Sunny/></el-icon>
        <span slot="title">轮播图管理</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>
<script>
import {
  Promotion,
  Loading,
  Avatar,
  VideoCameraFilled,
  Monitor,
  Setting,
  Histogram,
  Sunny,
} from "@element-plus/icons-vue";
export default {
  name: "LeftMenu",
  //components注册组件为虚拟图标
  components: {
    Promotion,
    Loading,
    Avatar,
    VideoCameraFilled,
    Monitor,
    Setting,
    Histogram,
    Sunny,
  },

};
</script>
<style scoped>
.left-menu {
  width: 100%;
  height: 100%;
}
.menu-title {
  background-color: #263445;
  color: white;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: italic;
  font-size: 16px;
}
</style>