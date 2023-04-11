//从vue的包里面导出一个方法，这个方法是用于创建Vue的App程序的
import { createApp } from "vue";

// 导入一个全局组件
import App from "./App.vue";
//导入elementclass
import ElementPlus from "element-plus";
import "element-plus/dist/index.css"
//导入路由管理对象
import router from "./router/index.js";
//导入animate.css
import "animate.css";
import "./assets/css/index.css";
//默认使用应用中文组件
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//创建Vue的程序,下面这行代码相当于new Vue();
const app = createApp(App);

//使用ElementPlus,和默认中文
app.use(ElementPlus, {
    locale: zhCn,
});
//加载路由
app.use(router);
//接管页面
app.mount("#app");
//导出excel表格数据npm install vue-json-excel -S
// import Vue from "vue";
// import JsonExcel from "vue-json-excel";
// Vue.component("downloadExcel", JsonExcel);

// import FileSaver from "file-saver";
// import XLSX from "xlsx";
// import ElementUi from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
// vue.use(ElementUi)
// import Blob from './excal/Blob.js'
