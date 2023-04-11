<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>新增消毒信息</span>
                <span @click="$router.push({name:'DisinfectInfoList'})">返回列表</span>
            </div>
        </template>
        <!-- 表单 -->
        <el-form ref="DisinfectInfoForm" label-width="100px" :model="DisinfectInfoData" :rules="DisinfectInfoDataRules">
            <el-form-item label="姓名" prop="name">
                <el-input placeholder="请输入姓名" v-model="DisinfectInfoData.name"></el-input>
            </el-form-item>
            <el-form-item label="地区" prop="area">
                <el-input placeholder="请输入地区" v-model="DisinfectInfoData.area"></el-input>
            </el-form-item>

            <el-form-item label="时间" prop="time">
                <el-input placeholder="请输入时间" type="date" v-model="DisinfectInfoData.time"></el-input>
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
        name: "AddDisinfect",
        data() {
            // 这个函数所返回的对象，才是页s面上面的数据
            return {
                DisinfectInfoData: {
                    area: "",
                    name: "",
                    time: "",

                },
                //指定验证规则
                DisinfectInfoDataRules: {
                    area: [
                        {required: true, message: "地区不能为空", trigger: "blur"},
                    ],
                    name: [
                        {required: true, message: "姓名不能为空", trigger: "blur"},
                    ],
                    time: [
                        {required: true, message: "时间不能为空", trigger: "blur"},
                    ],

                },
            };

        },
        //负责
        methods: {
            submitForm() {
                //开始验证全部的表单数据,主动验证
                this.$refs["DisinfectInfoForm"].validate(async (valid) => {
                    if (valid) {
                        try {
                            let resp = await API.disinfectinfo.add(this.DisinfectInfoData);
                            ElMessage.success("添加成功");
                            this.$router.replace({name: "DisinfectInfoList"});
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
                this.$refs["DisinfectInfoForm"].resetFields();
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
