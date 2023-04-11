/**
 * 本文件用于对接接口文档中adminInfo管理员模块的接口
 */

import axiosInstance from '../axiosInstance';

const disinfectinfo = {
  //新增管理的接口方法
  add({ area, name, time }) {
    // 该方法用于发送数据至服务器
    axiosInstance.post('/disinfect-info/add', {
      area,
      name,
      time,
    });
  },
  //获取所有数据
  findAll() {
    return axiosInstance.get('/disinfect-info/findAll');
  },

  getListData(data) {
    return axiosInstance.post('/disinfect-info/page', data);
  },

  deleteById(id) {
    return axiosInstance.delete(`/disinfect-info/deleteById/${id}`);
  },
  updateById({ area, name, time }, id) {
    axiosInstance.post(`/disinfect-info/updateById?id=${id}`, {
      area,
      name,
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
export default disinfectinfo;
