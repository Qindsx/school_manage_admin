<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>新增角色信息</span>
                <span @click="$router.push({name:'RoleInfoList'})">返回列表</span>
            </div>
        </template>
        <!-- 表单 -->
        <el-form ref="RoleInfoForm" label-width="100px" :model="RoleInfoData" :rules="RoleInfoDataRules">
            <el-form-item label="角色姓名" prop="name">
                <el-input placeholder="请输入职工姓名" v-model="RoleInfoData.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="RoleInfoData.sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="工号" prop="number">
                <el-input show-word-limit maxlength="11" placeholder="请输入11位的工号"
                          v-model="RoleInfoData.number"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-input placeholder="请输入职工地址" v-model="RoleInfoData.role"></el-input>
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
        name: "AddRole",
        data() {
            // 这个函数所返回的对象，才是页s面上面的数据
            return {
                RoleInfoData: {
                    name: "",
                    number: "",
                    sex: "",
                    role: "",

                },
                //指定验证规则
                RoleInfoDataRules: {
                   name: [
                        {required: true, message: "姓名不能为空", trigger: "blur"},
                    ],

                    number: [
                        {required: true, message: "工号不能为空", trigger: "blur"},
                    ],
                    role: [
                        {required: true, message: "角色不能为空", trigger: "blur"},
                    ],
                },
            };

        },
        //负责
        methods: {
            submitForm() {
                //开始验证全部的表单数据,主动验证
                this.$refs["RoleInfoForm"].validate(async (valid) => {
                    if (valid) {
                        try {
                            let resp = await API.roleinfo.add(this. RoleInfoData);
                            ElMessage.success("添加成功");
                            this.$router.replace({name: "RoleInfoList"});
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
                this.$refs["RoleInfoForm"].resetFields();
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