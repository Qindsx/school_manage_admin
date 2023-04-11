/**
 * 本文件用于对接接口文档中adminInfo管理员模块的接口
 */

import axiosInstance from '../axiosInstance';

const travelcodeinfo = {
  //获取所有数据
  findAll() {
    return axiosInstance.get('/travelcode-info/findAll');
  },
  deleteById(id) {
    return axiosInstance.delete(`/travelcode-info/deleteById/${id}`);
  },

  getListData(data) {
    return axiosInstance.post('/travelcode-info/page', data);
  },
  // updateById({
  //                area,name,time,
  //            }) {
  //     axiosInstance.set(`/healthcode-info/updateById/${id}`, {
  //         area,name,time,
  //
  //     });
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
export default travelcodeinfo;
