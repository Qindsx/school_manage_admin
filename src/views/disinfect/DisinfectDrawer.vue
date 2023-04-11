<template>
  <div>
    <el-drawer
      size="45%"
      v-model="drawer2"
      direction="rtl"
      :before-close="beforeClose"
    >
      <template #header>
        <h4>编辑消毒信息</h4>
      </template>
      <template #default
        ><el-form
          ref="DisinfectInfoForm"
          label-width="100px"
          :model="DisinfectInfoData"
          :rules="DisinfectInfoDataRules"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              placeholder="请输入姓名"
              v-model="DisinfectInfoData.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="地区" prop="area">
            <el-input
              placeholder="请输入地区"
              v-model="DisinfectInfoData.area"
            ></el-input>
          </el-form-item>

          <el-form-item label="时间" prop="time">
            <el-input
              placeholder="请输入时间"
              type="date"
              v-model="DisinfectInfoData.time"
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
      DisinfectInfoData: {
        area: '',
        name: '',
        time: '',
      },
      //指定验证规则
      DisinfectInfoDataRules: {
        area: [{ required: true, message: '地区不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        time: [{ required: true, message: '时间不能为空', trigger: 'blur' }],
      },
    };
  },
  watch() {
    drawer2: (newVal, oldVal) => {
      if (newVal === false) {
        this.DisinfectInfoData = {
          area: '',
          name: '',
          time: '',
        };
        this.id = ''
        this.$refs['adminInfoForm'].resetFields();
      }
    };
  },
  methods: {
    open(row) {
      this.drawer2 = true;
      this.id = row.id;
      this.DisinfectInfoData = { ...row };
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
      this.$refs['DisinfectInfoForm'].validate(async (valid) => {
        if (valid) {
          //验证成功，可以提交 数据
          // API.adminInfo.add(this.adminInfoData).then(resp=>{}).catch(error=>{});
          try {
            let resp = await API.disinfectinfo.updateById(this.AreaInfoData, this.id);
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
