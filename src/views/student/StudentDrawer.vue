<template>
  <div>
    <el-drawer
      size="45%"
      v-model="drawer2"
      direction="rtl"
      :before-close="beforeClose"
    >
      <template #header>
        <h4>编辑学生信息</h4>
      </template>
      <template #default
        ><el-form
          ref="StudentInfoForm"
          label-width="100px"
          :model="StudentInfoData"
          :rules="StudentInfoDataRules"
        >
          <el-form-item label="学生姓名" prop="student_name">
            <el-input
              placeholder="请输入学生姓名"
              v-model="StudentInfoData.student_name"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="StudentInfoData.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input
              placeholder="请输入学生的手机号"
              v-model="StudentInfoData.phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              placeholder="请输入学生邮箱"
              v-model="StudentInfoData.email"
            ></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="student_number">
            <el-input
              show-word-limit
              maxlength="11"
              placeholder="请输入11位的学生学号"
              v-model="StudentInfoData.student_number"
            ></el-input>
          </el-form-item>

          <el-form-item label="地址" prop="address">
            <el-input
              placeholder="请输入学生地址"
              v-model="StudentInfoData.address"
            ></el-input>
          </el-form-item>
          <el-form-item label="学院" prop="college">
            <el-input
              placeholder="请输入学生所属学院"
              v-model="StudentInfoData.college"
            ></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="classa">
            <el-input
              placeholder="请输入学生所属班级"
              v-model="StudentInfoData.classa"
            ></el-input>
          </el-form-item>
          <el-form-item label="寝室" prop="dormitory">
            <el-input
              placeholder="请输入学生的寝室号"
              v-model="StudentInfoData.dormitory"
            ></el-input>
          </el-form-item>
          <el-form-item label="辅导员" prop="instructor">
            <el-input
              placeholder="请输入学生的辅导员"
              v-model="StudentInfoData.instructor"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-input
              placeholder="请输入学生的状态"
              v-model="StudentInfoData.state"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="status">
            <el-input
              placeholder="请输入学生的身份"
              v-model="StudentInfoData.status"
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
      id: '',
      //指定验证规则
      StudentInfoData: {
        student_name: '',
        phone: '',
        sex: '',
        email: '',
        student_number: '',
        address: '',
        college: '',
        classa: '',
        dormitory: '',
        instructor: '',
        state: '',
        status: '',
      },
      //指定验证规则
      StudentInfoDataRules: {
        student_name: [
          { required: true, message: '学生姓名不能为空', trigger: 'blur' },
        ],
        phone: [
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
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式不正确',
            trigger: 'blur',
          },
        ],
        student_number: [
          { required: true, message: '学生学号不能为空', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '学生地址不能为空', trigger: 'blur' },
        ],
        college: [
          { required: true, message: '学生所属学院不能为空', trigger: 'blur' },
        ],
        class: [
          { required: true, message: '学生所属班级不能为空', trigger: 'blur' },
        ],
        instructor: [
          { required: true, message: '学生辅导员不能为空', trigger: 'blur' },
        ],
        state: [
          { required: true, message: '学生状态不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  watch() {
    drawer2: (newVal, oldVal) => {
      if (newVal === false) {
        this.StudentInfoData = {
          student_name: '',
          phone: '',
          sex: '',
          email: '',
          student_number: '',
          address: '',
          college: '',
          classa: '',
          dormitory: '',
          instructor: '',
          state: '',
          status: '',
        };
        this.id = '';
        this.$refs['StudentInfoForm'].resetFields();
      }
    };
  },
  methods: {
    open(row) {
      this.drawer2 = true;
      this.id = row.id;
      this.StudentInfoData = { ...row };
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
      this.$refs['StudentInfoForm'].validate(async (valid) => {
        if (valid) {
          //验证成功，可以提交 数据
          // API.adminInfo.add(this.adminInfoData).then(resp=>{}).catch(error=>{});
          try {
            let resp = await API.staffinfo.updateById(
              this.StudentInfoData,
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
