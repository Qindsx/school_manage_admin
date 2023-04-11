<template>
  <div>
    <el-drawer
      size="45%"
      v-model="drawer2"
      direction="rtl"
      :before-close="beforeClose"
    >
      <template #header>
        <h4>编辑管理员信息</h4>
      </template>
      <template #default
        ><el-form
          ref="adminInfoForm"
          label-width="100px"
          :model="adminInfoData"
          :rules="adminInfoDataRules"
        >
          <el-form-item label="管理员姓名" prop="admin_name">
            <el-input
              placeholder="请输入管理姓名"
              v-model="adminInfoData.admin_name"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="admin_tel">
            <el-input
              placeholder="请输入管理员的手机号"
              v-model="adminInfoData.admin_tel"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="admin_pwd">
            <el-input
              show-password
              placeholder="请输入管理员的密码"
              v-model="adminInfoData.admin_pwd"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm_pwd">
            <el-input
              show-password
              placeholder="两次密码必须相同"
              v-model="adminInfoData.confirm_pwd"
            ></el-input>
          </el-form-item>
          <el-form-item label="管理员性别">
            <el-radio-group v-model="adminInfoData.admin_sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="管理员邮箱" prop="admin_email">
            <el-input
              placeholder="请输入管理员邮箱"
              v-model="adminInfoData.admin_email"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script>
import API from '../../utils/API/index.js';

import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  name: 'AdminInfoDrawer',
  data() {
    return {
      drawer2: false,
      adminInfoData: {
        admin_name: '',
        admin_tel: '',
        admin_pwd: '',
        confirm_pwd: '',
        admin_sex: '',
        admin_email: '',
      },
      id:'',
      //指定验证规则
      adminInfoDataRules: {
        admin_name: [
          { required: true, message: '管理员名称不能为空', trigger: 'blur' },
        ],
        admin_tel: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callBack) => {
              //使用正则表达式验证手机号
              let reg = /^1[356789]\d{9}$/;
              if (reg.test(value)) {
                // 验证通过
                callBack();
              } else {
                // 验证不通过
                callBack(new Error('手机号格式不正确'));
              }
            },
            trigger: 'blur',
          },
        ],
        admin_pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码长度不小于6位', rigger: 'blur' },
        ],
        confirm_pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callBack) => {
              if (value == this.adminInfoData.admin_pwd) {
                callBack();
              } else {
                callBack(new Error('两次密码不一致'));
              }
            },
            trigger: 'blur',
          },
        ],
        admin_email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式不正确',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  watch() {
    drawer2: (newVal, oldVal) => {
      if (newVal === false) {
        this.adminInfoData = {
          admin_name: '',
          admin_tel: '',
          admin_pwd: '',
          confirm_pwd: '',
          admin_sex: '',
          admin_email: '',
        };
        this.id = ''
        this.$refs['adminInfoForm'].resetFields();
      }
    };
  },
  methods: {
    open(row) {
      this.drawer2 = true;
      this.adminInfoData = { ...row };
      this.id = row.id
      console.log(row);
    },
    // 关闭按钮
    handleClose(done) {
      ElMessageBox.confirm('确定关闭吗？')
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    },
    // 取消按钮
    cancelClick() {
      this.handleClose(() => {
        this.drawer2 = false;
      });
    },
    beforeClose() {
      console.log('beforeClose');
      this.cancelClick();
    },
    confirmClick() {
      console.log(this.adminInfoData);
      //开始验证全部的表单数据,主动验证
      this.$refs['adminInfoForm'].validate(async (valid) => {
        if (valid) {
          //验证成功，可以提交 数据
          // API.adminInfo.add(this.adminInfoData).then(resp=>{}).catch(error=>{});
          try {
            let resp = await API.adminInfo.update(this.adminInfoData, this.id);
            //ElMassage弹出一个成功的消息，然后跳转到AdminInfoList
            ElMessage.success('修改成功');
            this.drawer2 = false
            this.$emit('reset')
          } catch (error) {
            ElMessageBox.alert('修改失败', '提示', {
              type: 'error',
            });
          }
        } else {
          return;
        }
      });
    },
  },
};
</script>
