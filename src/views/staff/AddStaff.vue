<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>新增职工信息</span>
                <span @click="$router.push({name:'StaffInfoList'})">返回列表</span>
            </div>
        </template>
        <!-- 表单 -->
        <el-form ref="StaffInfoForm" label-width="100px" :model="StaffInfoData" :rules="StaffInfoDataRules">
            <el-form-item label="职工姓名" prop="staff_name">
                <el-input placeholder="请输入职工姓名" v-model="StaffInfoData.staff_name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="StaffInfoData.sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input placeholder="请输入职工的手机号" v-model="StaffInfoData.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input placeholder="请输入职工邮箱" v-model="StaffInfoData.email"></el-input>
            </el-form-item>
            <el-form-item label="工号" prop="staff_number">
                <el-input show-word-limit maxlength="11" placeholder="请输入11位的职工工号"
                          v-model="StaffInfoData.staff_number"></el-input>
            </el-form-item>

            <el-form-item label="地址" prop="address">
                <el-input placeholder="请输入职工地址" v-model="StaffInfoData.address"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="department">
                <el-input placeholder="请输入职工的职称" v-model="StaffInfoData.department"></el-input>
            </el-form-item>

            <el-form-item label="状态" prop="state">
                <el-input placeholder="请输入职工的状态" v-model="StaffInfoData.state"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="status">
                <el-input placeholder="请输入职工的身份" v-model="StaffInfoData.status"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">保存数据</el-button>
                <el-button type="danger" @click="resetForm">重置表单</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>

    import API from '../../utils/API/index.js';
    import {ElMessage, ElMessageBox} from 'element-plus'

    export default {
        name: "AddStaff",
        data() {
            // 这个函数所返回的对象，才是页s面上面的数据
            return {
                StaffInfoData: {
                    staff_name: "",
                    phone: "",
                    sex: "",
                    email: "",
                    staff_number: "",
                    address: "",
                    department: "",
                    state: "",
                    status: "",
                },
                //指定验证规则
                StaffInfoDataRules: {
                    staff_name: [
                        {required: true, message: "职工姓名不能为空", trigger: "blur"},
                    ],
                    phone: [
                        {required: true, message: "手机号不能为空", trigger: "blur"},
                        {
                            validator: (rule, value, callBack) => {
                                //使用正则表达式验证手机号
                                let reg = /^1[356789]\d{9}$/;
                                if (reg.test(value)) {
                                    // 验证通过
                                    callBack();
                                } else {
                                    // 验证不通过
                                    callBack(new Error("手机号格式不正确"));
                                }
                            },
                            trigger: "blur",
                        },
                    ],
                    email: [
                        {required: true, message: "邮箱不能为空", trigger: "blur"},
                        {
                            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                            message: "邮箱格式不正确",
                            trigger: "blur",
                        }
                    ],
                    staff_number: [
                        {required: true, message: "职工工号不能为空", trigger: "blur"},
                    ],
                    address: [
                        {required: true, message: "职工地址不能为空", trigger: "blur"},
                    ],
                    department: [
                        {required: true, message: "职工部门不能为空", trigger: "blur"},
                    ],
                    state: [
                        {required: true, message: "职工状态不能为空", trigger: "blur"},
                    ],
                },
            };

        },
        //负责
        methods: {
            submitForm() {
                //开始验证全部的表单数据,主动验证
                this.$refs["StaffInfoForm"].validate(async (valid) => {
                    if (valid) {
                        try {
                            let resp = await API.staffinfo.add(this. StaffInfoData);
                            ElMessage.success("添加成功");
                            this.$router.replace({name: "StaffInfoList"});
                        } catch (error) {
                            // console.log("失败",error);
                            ElMessageBox.alert(
                                "添加失败", "提示", {
                                    type: "error"
                                }
                            )
                        }
                    }
                });
            },
            resetForm() {
                //重置表单
                this.$refs["StaffInfoForm"].resetFields();
            }
        }
    }
</script>
<style lang="scss" scoped>
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>