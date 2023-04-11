/**
 * 本文件用于对接接口文档中adminInfo管理员模块的接口
 */

import axiosInstance from '../axiosInstance';

const areainfo = {
  //新增管理的接口方法
  add({ area, describe, time }) {
    // 该方法用于发送数据至服务器
    axiosInstance.post('/area-info/add', {
      area,
      describe,
      time,
    });
  },
  //获取所有数据
  findAll() {
    return axiosInstance.get('/area-info/findAll');
  },

  getListData(data) {
    return axiosInstance.post('/area-info/page', data);
  },
  deleteById(id) {
    return axiosInstance.delete(`/area-info/deleteById/${id}`);
  },
  updateById({ area, describe, time },id) {
    axiosInstance.post(`/area-info/updateById?id=${id}`, {
      area,
      describe,
      time,
    });
  },
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
export default areainfo;
