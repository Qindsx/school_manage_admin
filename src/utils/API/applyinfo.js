/**
 * 本文件用于对接接口文档中adminInfo管理员模块的接口
 */

import axiosInstance from '../axiosInstance';

const applyinfo = {
  //新增管理的接口方法
  add({ apply_name, apply_number, apply_time, status, reason }) {
    // 该方法用于发送数据至服务器
    axiosInstance.post('/apply-info/add', {
      apply_name,
      apply_number,
      apply_time,
      status,
      reason,
    });
  },
  //获取所有数据
  findAll() {
    return axiosInstance.get('/apply-info/findAll');
  },
  getListData(data) {
    return axiosInstance.post('/apply-info/page', data);
  },
  deleteById(id) {
    return axiosInstance.delete(`/apply-info/deleteById/${id}`);
  },
  updateById({ apply_name, apply_number, apply_time, status, reason }, id) {
    axiosInstance.post(`/apply-info/updateById?id=${id}`, {
      apply_name,
      apply_number,
      apply_time,
      status,
      reason,
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
export default applyinfo;
