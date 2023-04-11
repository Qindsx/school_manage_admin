<template>
    <el-card>
       <template #header>
           <div class="card-header">
                <span>新增管理员</span>
                <span @click="$router.push({name:'AdminInfoList'})">返回列表</span>
           </div>
       </template>
       <!-- 表单 -->
       <el-form ref="adminInfoForm" label-width="100px" :model="adminInfoData" :rules="adminInfoDataRules">
           <el-form-item label="管理员姓名" prop="admin_name">
               <el-input placeholder="请输入管理姓名" v-model="adminInfoData.admin_name"></el-input>
           </el-form-item>
           <el-form-item label="手机号" prop="admin_tel">
               <el-input placeholder="请输入管理员的手机号" v-model="adminInfoData.admin_tel"></el-input>
           </el-form-item>
           <el-form-item label="密码" prop="admin_pwd">
               <el-input show-password placeholder="请输入管理员的密码" v-model="adminInfoData.admin_pwd"></el-input>
           </el-form-item>
           <el-form-item label="确认密码" prop="confirm_pwd">
               <el-input show-password placeholder="两次密码必须相同" v-model="adminInfoData.confirm_pwd"></el-input>
           </el-form-item>
           <el-form-item label="管理员性别">
               <el-radio-group v-model="adminInfoData.admin_sex">
                   <el-radio label="男">男</el-radio>
                   <el-radio label="女">女</el-radio>
               </el-radio-group>
           </el-form-item>
           <el-form-item label="管理员邮箱" prop="admin_email">
               <el-input placeholder="请输入管理员邮箱" v-model="adminInfoData.admin_email"></el-input>
           </el-form-item>
           <el-form-item>
               <el-button type="primary" @click="submitForm">保存数据</el-button>
               <el-button type="danger"  @click="resetForm" >重置表单</el-button>
           </el-form-item>
       </el-form>
    </el-card>
</template>
<script>

import API from '../../utils/API/index.js';
import { ElMessage,ElMessageBox } from 'element-plus'
export default {
    name:"AddAdminInfo",
    data(){
        // 这个函数所返回的对象，才是页s面上面的数据
        return {
            adminInfoData:{
                admin_name:"",
                admin_tel:"",
                admin_pwd:"",
                confirm_pwd:"",
                admin_sex:"",
                admin_email:""
            },
            //指定验证规则
            adminInfoDataRules:{
                admin_name:[
                    { required: true, message: "管理员名称不能为空", trigger:"blur"},
                ],
                admin_tel: [
                    { required: true, message: "手机号不能为空", trigger: "blur" },
                    {
                        validator: (rule, value, callBack) => {
                        //使用正则表达式验证手机号
                        let reg = /^1[356789]\d{9}$/;
                            if(reg.test(value)){
                                // 验证通过
                                callBack();
                            }
                            else{
                                // 验证不通过
                                callBack(new Error("手机号格式不正确"));
                            }
                        },
                    trigger: "blur",
                    },
                ],
                admin_pwd:[
                    { required: true, message: "密码不能为空", trigger: "blur" },
                    {min:6,message:"密码长度不小于6位",rigger:"blur"},
                ],
                confirm_pwd:[
                    {required: true, message: "密码不能为空", trigger: "blur" },
                    {
                        validator:(rule,value,callBack)=>{
                            if(value==this.adminInfoData.admin_pwd){
                                callBack();
                            }else{
                                callBack(new Error("两次密码不一致"));
                            }
                        },
                        trigger:"blur",
                    }
                ],
                admin_email:[
                    {required: true, message: "邮箱不能为空", trigger: "blur" },
                    {
                        pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                        message: "邮箱格式不正确",
                        trigger: "blur",
                    }
                ]
            },
        };
        
    },
    //负责
    methods:{
        submitForm(){
            //开始验证全部的表单数据,主动验证
            this.$refs["adminInfoForm"].validate(async(valid)=>{
                if(valid){
                    //验证成功，可以提交 数据
                    // API.adminInfo.add(this.adminInfoData).then(resp=>{}).catch(error=>{});
                    try{
                    let resp = await API.adminInfo.add(this.adminInfoData);
                        // console.log("成功",resp)
                        //ElMassage弹出一个成功的消息，然后跳转到AdminInfoList
                        ElMessage.success("添加成功");
                        this.$router.replace({name:"AdminInfoList"});
                    }catch(error){
                        // console.log("失败",error);
                        ElMessageBox.alert(
                            "添加失败","提示",{
                                type:"error"
                            }
                        )
                    }
                }else{

                }
            });
        },
        resetForm(){
            //重置表单
            this.$refs["adminInfoForm"].resetFields();
        }
    }
}
</script>
<style lang="scss" scoped>
.card-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
