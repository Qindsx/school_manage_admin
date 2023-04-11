<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>新增老师信息</span>
                <span @click="$router.push({name:'TeacherInfoList'})">返回列表</span>
            </div>
        </template>
        <!-- 表单 -->
        <el-form ref="TeacherInfoForm" label-width="100px" :model="TeacherInfoData" :rules="TeacherInfoDataRules">
            <el-form-item label="老师姓名" prop="teacher_name">
                <el-input placeholder="请输入老师姓名" v-model="TeacherInfoData.teacher_name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="TeacherInfoData.sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input placeholder="请输入老师的手机号" v-model="TeacherInfoData.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input placeholder="请输入老师邮箱" v-model="TeacherInfoData.email"></el-input>
            </el-form-item>
            <el-form-item label="工号" prop="job_number">
                <el-input show-word-limit maxlength="11" placeholder="请输入11位的老师工号"
                          v-model="TeacherInfoData.job_number"></el-input>
            </el-form-item>

            <el-form-item label="地址" prop="address">
                <el-input placeholder="请输入老师地址" v-model="TeacherInfoData.address"></el-input>
            </el-form-item>
            <el-form-item label="学院" prop="college">
                <el-input placeholder="请输入老师所属学院" v-model="TeacherInfoData.college"></el-input>
            </el-form-item>
            <el-form-item label="办公室" prop="office">
                <el-input placeholder="请输入老师办公室" v-model="TeacherInfoData.office"></el-input>
            </el-form-item>
            <el-form-item label="职称" prop="rank">
                <el-input placeholder="请输入老师的职称" v-model="TeacherInfoData.rank"></el-input>
            </el-form-item>

            <el-form-item label="状态" prop="state">
                <el-input placeholder="请输入老师的状态" v-model="TeacherInfoData.state"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="status">
                <el-input placeholder="请输入老师的身份" v-model="TeacherInfoData.status"></el-input>
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
        name: "AddTeacher",
        data() {
            // 这个函数所返回的对象，才是页s面上面的数据
            return {
                TeacherInfoData: {
                    teacher_name: "",
                    phone: "",
                    sex: "",
                    email: "",
                    job_number: "",
                    address: "",
                    college: "",
                    office: "",
                    rank: "",
                    state: "",
                    status: "",
                },
                //指定验证规则
                TeacherInfoDataRules: {
                    teacher_name: [
                        {required: true, message: "老师姓名不能为空", trigger: "blur"},
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
                    job_number: [
                        {required: true, message: "老师工号不能为空", trigger: "blur"},
                    ],
                    address: [
                        {required: true, message: "老师地址不能为空", trigger: "blur"},
                    ],
                    college: [
                        {required: true, message: "老师所属学院不能为空", trigger: "blur"},
                    ],
                    rank: [
                        {required: true, message: "老师职称不能为空", trigger: "blur"},
                    ],
                    state: [
                        {required: true, message: "老师状态不能为空", trigger: "blur"},
                    ],
                },
            };

        },
        //负责
        methods: {
            submitForm() {
                //开始验证全部的表单数据,主动验证
                this.$refs["TeacherInfoForm"].validate(async (valid) => {
                    if (valid) {
                        try {
                            let resp = await API.teacherinfo.add(this.TeacherInfoData);
                            ElMessage.success("添加成功");
                            this.$router.replace({name: "TeacherInfoList"});
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
                this.$refs["TeacherInfoForm"].resetFields();
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