/**
 * 本文件用于对接接口文档中adminInfo管理员模块的接口
 */

import axiosInstance from "../axiosInstance";
// import axios from "axios";
// const api = axios .create({
//     timeout:2000000//请求超时
// })
const teacherinfo = {
    //新增管理的接口方法
    add({
            teacher_name,phone,sex,email,job_number,address,college,office,rank,state,status
        }) {
        // 该方法用于发送数据至服务器
        axiosInstance.post("/teacher-info/add", {
            teacher_name,
            phone,
            sex,
            email,
            job_number,
            address,
            college,
            office,
            rank,
            state,
            status
        });
    },
    //获取所有数据
    findAll() {
        return axiosInstance.get("/teacher-info/findAll");
    },
    
  getListData(data) {
    return axiosInstance.post('/teacher-info/page', data);
  },
    deleteById(id) {
        return axiosInstance.delete(`/teacher-info/deleteById/${id}`);
    },
    // updateById({student_name,phone,sex,email,student_number,address,college,classa,dormitory,instructor,state,status}) {
    //     axiosInstance.set(`/teacher-info/updateById`, {
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
export default teacherinfo;
