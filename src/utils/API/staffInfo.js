/**
 * 本文件用于对接接口文档中adminInfo管理员模块的接口
 */

import axiosInstance from '../axiosInstance';
const staffinfo = {
  //新增管理的接口方法
  add({
    staff_name,
    phone,
    sex,
    email,
    staff_number,
    address,
    department,
    state,
    status,
  }) {
    // 该方法用于发送数据至服务器
    axiosInstance.post('/staff-info/add', {
      staff_name,
      phone,
      sex,
      email,
      staff_number,
      address,
      department,
      state,
      status,
    });
  },
  //获取所有数据
  findAll() {
    return axiosInstance.get('/staff-info/findAll');
  },

  getListData(data) {
    return axiosInstance.post('/staff-info/page', data);
  },
  deleteById(id) {
    return axiosInstance.delete(`/staff-info/deleteById/${id}`);
  },
  // updateById({staff_name,phone,sex,email,staff_number,address,department,state,status,}) {
  //     axiosInstance.set(`/staff-info/updateById/${id}`, {
  //         staff_name,phone,sex,email,staff_number,address,department,state,status,
  //     });
  // }
};
//导出本对象
export default staffinfo;
