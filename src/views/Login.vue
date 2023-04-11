<template>
    <div class="login-page">
        <img src="../assets/img/bg1.jpg" class="bg-img" alt=""/>
        <transition enter-active-class="animate__animated animate__fadeInDown">
            <div class="login-box" v-show="isShow">
                <!-- title -->
                <h2 class="box-title">
                    校园防疫报备管理系统
                </h2>
                <!-- 登录表单 在需要验证的表单上添加ref属性-->
                <el-form
                        ref="loginForm"
                        :rules="formDataRules"
                        :model="formData"
                        class="login-form"
                >
                    <!-- 使用prop应用规格 -->
                    <el-form-item prop="account">
                        <!-- v-model是绑定表单的意思 -->
                        <el-input
                                v-model="formData.account"
                                placeholder="请输入手机号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="pwd">
                        <el-input
                                v-model="formData.pwd"
                                show-password
                                placeholder="请输入密码"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-switch
                                v-model="formData.saveAccount"
                                active-text="记住账号"
                        ></el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="login" type="primary" class="btn-login"
                        >登录
                        </el-button
                        >


                    </el-form-item>

                </el-form>
            </div>
        </transition>
    </div>
</template>
<script>
    // 导入图标
    import {VideoCameraFilled} from "@element-plus/icons-vue";
    import {ElMessage, ElMessageBox} from "element-plus";

    export default {
        name: "Login",
        components: {
            VideoCameraFilled: VideoCameraFilled,
        },
        data() {
            //这个方法返回的对象才是接管页面的数据
            return {
                formData: {
                    account: "17671187153",
                    pwd: "123456",
                    saveAccount: false,
                },
                // 配置表单验证规则
                formDataRules: {
                    account: [
                        {required: true, message: "手机号不能为空", trigger: "blur"},
                    ],
                    pwd: [{required: true, message: "密码不能为空", trigger: "blur"}],
                },
                isShow: false,
            };
        },
        //负责接管页面的事件方法
        methods: {
            login() {
                //validate是调用表单验证的方法
                this.$refs["loginForm"].validate((valid) => {
                    if (valid) {
                        //表单验证通过
                        if (
                            this.formData.account == "17671187153" &&
                            this.formData.pwd == "123456"
                        ) {
                            // 验证成功
                            ElMessageBox.alert("登录成功", "提示", {
                                type: "success",
                                //回调☞用户点击ok之后再跳到下个页面
                                callback: () => {
                                    //使用路由跳转到manager页面,使用了app.use(router),所以可以使用this.$router来获取路由管理对象
                                    //通过push跳转的页面是可以返回的,通过replace跳转的页面不可以返回
                                    this.$router.replace({
                                        name: "StudentInfoList",
                                    });
                                },
                            });
                        } else {
                            //验证失败
                            ElMessageBox.alert("登录失败", "警告", {
                                type: "error",
                                callback: () => {
                                    this.$router.push({
                                        name: "Register",
                                    });
                                },
                            });
                        }
                    } else {
                        //表单验证未通过
                        ElMessage.error("请输入手机号和密码之后再尝试登录");
                    }
                });
            },

        },

        //接管页面以后
        mounted() {
            //五百毫秒之后去做的事情=>this.isShow=true;从隐藏到显示
            setTimeout(() => {
                this.isShow = true;
            }, 500);

        },

    }
</script>
<!-- scoped是作用域 -->
<style lang="scss" scoped>
    .login-page {
        height: 100%;
        width: 100%;
        position: relative;

        .bg-img {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0px;
            top: 0px;
        }

        // 整个盒子
        .login-box {
            width: 400px;
            background-color: white;
            position: absolute;
            // calc居中"-"前面必须有空格
            left: calc(50% - 200px);
            top: 150px;
            box-shadow: 0px 0px 15px 5px gray;
            box-sizing: border-box;
            padding: 10px;
            // 虚线
            .box-title {
                display: flex;
                justify-content: center;
                padding: 10px 0;
                border-bottom: 1px dashed gray;
            }

            .login-form {
                margin-top: 15px;

                .btn-login {
                    width: 100%;
                }
            }
            .content-bottom{
                display: flex;
                justify-content: space-between;
                color: blue;
                font-size:14px
            }
        }
    }
</style>
