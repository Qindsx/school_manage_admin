/**
 * 本文件用于对接接口文档中adminInfo管理员模块的接口
 */

import axiosInstance from "../axiosInstance";
const studentInfo = {
    //新增管理的接口方法
    add({
            student_name,phone,sex,email,student_number,address,college,classa,dormitory,instructor,state,status
        }) {
        // 该方法用于发送数据至服务器
        axiosInstance.post("/student-info/add", {
            student_name,
            phone,
            sex,
            email,
            student_number,
            address,
            college,
            classa,
            dormitory,
            instructor,
            state,
            status,
        });
    },
    //获取所有数据
    findAll() {
        return axiosInstance.get("/student-info/findAll");
    },
    
  getListData(data) {
    return axiosInstance.post('/student-info/page', data);
  },
    deleteById(id) {
        return axiosInstance.delete(`/student-info/deleteById/${id}`);
    },
    // updateById({student_name,phone,sex,email,student_number,address,college,classa,dormitory,instructor,state,status}) {
    //     axiosInstance.set(`/healthcode-info/updateById/${id}`, {
    //         student_name,phone,sex,email,student_number,address,college,classa,dormitory,instructor,state,status
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
}
//导出本对象
export default studentInfo;
