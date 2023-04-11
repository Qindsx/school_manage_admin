<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>新增通告信息</span>
                <span @click="$router.push({name:'AnnunciateInfoList'})">返回列表</span>
            </div>
        </template>
        <!-- 表单 -->
        <el-form ref="AnnunciateInfoForm" label-width="100px" :model="AnnunciateInfoData" :rules="AnnunciateInfoDataRules">
            <el-form-item label="通告" prop="annunciate">
                <el-input placeholder="请输入通告信息" v-model="AnnunciateInfoData.annunciate"></el-input>
            </el-form-item>
            <el-form-item label="时间" prop="time">
                <el-input placeholder="请输入时间" type="date" v-model="AnnunciateInfoData.time"></el-input>
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
        name: "AddAnnunciate",
        data() {
            // 这个函数所返回的对象，才是页s面上面的数据
            return {
                AnnunciateInfoData: {
                    annunciate: "",
                    time: "",
                },
                //指定验证规则
                AnnunciateInfoDataRules: {
                    annunciate: [
                        {required: true, message: "通告不能为空", trigger: "blur"},
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
                this.$refs["AnnunciateInfoForm"].validate(async (valid) => {
                    if (valid) {
                        try {
                            let resp = await API.annunciateinfo.add(this.AnnunciateInfoData);
                            ElMessage.success("添加成功");
                            this.$router.replace({name: "AnnunciateInfoList"});
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
                this.$refs["AnnunciateInfoForm"].resetFields();
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