<template>
  <!-- 会配合路由模块来根据不同的路由，显示不同的虚拟页面 -->
  <router-view></router-view>

</template>

<script>

</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body,#app{
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: white;
  }
</style>