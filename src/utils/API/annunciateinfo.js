/**
 * 本文件用于对接接口文档中adminInfo管理员模块的接口
 */

import axiosInstance from '../axiosInstance';
const annunciateinfo = {
  //新增管理的接口方法
  add({ annunciate, time }) {
    // 该方法用于发送数据至服务器
    axiosInstance.post('/annunciate-info/add', {
      annunciate,
      time,
    });
  },
  //获取所有数据
  findAll() {
    return axiosInstance.get('/annunciate-info/findAll');
  },

  //
  getListData(data) {
    return axiosInstance.post('/annunciate-info/page', data);
  },
  deleteById(id) {
    return axiosInstance.delete(`/annunciate-info/deleteById/${id}`);
  },
  update({ annunciate, time }, id) {
    axiosInstance.post('/annunciate-info/updateById?id=' + id, {
      annunciate,
      time,
    });
  },
  // update({ admin_name, aadmin_pwd, admin_sex, admin_email, admin_tel }) {
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
export default annunciateinfo;
