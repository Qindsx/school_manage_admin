/**
 * 本文件用于对接接口文档中adminInfo管理员模块的接口
 */

import axiosInstance from '../axiosInstance';
// import axios from "axios";
// const api = axios .create({
//     timeout:2000000//请求超时
// })
const roleinfo = {
  //新增管理的接口方法
  add({ name, number, sex, role }) {
    // 该方法用于发送数据至服务器
    axiosInstance.post('/role-info/add', {
      name,
      number,
      sex,
      role,
    });
  },
  //获取所有数据
  findAll() {
    return axiosInstance.get('/role-info/findAll');
  },
  getListData(data) {
    return axiosInstance.post('/role-info/page', data);
  },
  deleteById(id) {
    return axiosInstance.delete(`/role-info/deleteById/${id}`);
  },
  // updateById({ admin_name, admin_pwd, admin_sex, admin_email, admin_tel }) {
  //    axiosInstance.set(`/admin-info/updateById/${id}`,{
  //        admin_name,
  //        admin_pwd,
  //        admin_sex,
  //        admin_email,
  //        admin_tel
  //    });
  // }
  // update({ admin_name, admin_pwd, admin_sex, admin_email, admin_tel }) {
  //     // 该方法用于发送数据至服务器
  //     axiosInstance.post("/admin-info/update", {
  //         admin_name,
  //         admin_pwd,
  //         admin_sex,
  //         admin_email,
  //         admin_tel
  //     });
  // },
};
//导出本对象
export default roleinfo;
