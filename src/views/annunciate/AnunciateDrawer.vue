<template>
  <div>
    <el-drawer
      size="45%"
      v-model="drawer2"
      direction="rtl"
      :before-close="beforeClose"
    >
      <template #header>
        <h4>编辑通告信息</h4>
      </template>
      <template #default
        ><el-form
          ref="adminInfoForm"
          label-width="100px"
          :model="AnnunciateInfoData"
          :rules="AnnunciateInfoDataRules"
          ><el-form-item label="通告" prop="annunciate">
            <el-input
              placeholder="请输入通告信息"
              v-model="AnnunciateInfoData.annunciate"
            ></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="time">
            <el-input
              placeholder="请输入时间"
              type="date"
              v-model="AnnunciateInfoData.time"
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

import { ElMessage, ElMessageBox } from 'element-plus';
export default {
  name: 'AdminInfoDrawer',
  data() {
    return {
      drawer2: false,
      id:'',
      AnnunciateInfoData: {
        annunciate: '',
        time: '',
      },
      //指定验证规则
      AnnunciateInfoDataRules: {
        annunciate: [
          { required: true, message: '通告不能为空', trigger: 'blur' },
        ],
        time: [{ required: true, message: '时间不能为空', trigger: 'blur' }],
      },
    };
  },
  watch() {
    drawer2: (newVal, oldVal) => {
      if (newVal === false) {
        this.AnnunciateInfoData = {
          annunciate: '',
          time: '',
        };
        this.$refs['adminInfoForm'].resetFields();
      }
    };
  },
  methods: {
    open(row) {
      this.drawer2 = true;
      this.AnnunciateInfoData = { ...row };
      this.id = row.id
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
            let resp = await API.annunciateinfo.update(this.adminInfoData,this.id);
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
