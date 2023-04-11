<template>
  <div>
    <el-drawer
      size="45%"
      v-model="drawer2"
      direction="rtl"
      :before-close="beforeClose"
    >
      <template #header>
        <h4>编辑角色信息</h4>
      </template>
      <template #default
        ><el-form
          ref="RoleInfoForm"
          label-width="100px"
          :model="RoleInfoData"
          :rules="RoleInfoDataRules"
        >
          <el-form-item label="角色姓名" prop="name">
            <el-input
              placeholder="请输入职工姓名"
              v-model="RoleInfoData.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="RoleInfoData.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="工号" prop="number">
            <el-input
              show-word-limit
              maxlength="11"
              placeholder="请输入11位的工号"
              v-model="RoleInfoData.number"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-input
              placeholder="请输入职工地址"
              v-model="RoleInfoData.role"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">保存数据</el-button>
            <el-button type="danger" @click="resetForm">重置表单</el-button>
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

import { ElMessage, ElMessageBox } from 'element-plus';
export default {
  name: 'AdminInfoDrawer',
  data() {
    return {
      drawer2: false,
      RoleInfoData: {
        name: '',
        number: '',
        sex: '',
        role: '',
      },
      id:'',
      //指定验证规则
      RoleInfoDataRules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],

        number: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        role: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
      },
    };
  },
  watch() {
    drawer2: (newVal, oldVal) => {
      if (newVal === false) {
        this.RoleInfoData = {
          area: '',
          name: '',
          time: '',
        };
        this.id = '';
        this.$refs['RoleInfoForm'].resetFields();
      }
    };
  },
  methods: {
    open(row) {
      this.drawer2 = true;
      this.id = row.id;
      this.RoleInfoData = { ...row };
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
      //开始验证全部的表单数据,主动验证
      this.$refs['RoleInfoForm'].validate(async (valid) => {
        if (valid) {
          //验证成功，可以提交 数据
          // API.adminInfo.add(this.adminInfoData).then(resp=>{}).catch(error=>{});
          try {
            let resp = await API.roleinfo.updateById(
              this.RoleInfoForm,
              this.id
            );
            //ElMassage弹出一个成功的消息，然后跳转到AdminInfoList
            ElMessage.success('修改成功');
            this.drawer2 = false;
            this.$emit('reset');
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
