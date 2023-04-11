<template>
  <el-card>
    <template #header>
      <div>
        <span>管理员信息</span>
      </div>
    </template>
    <el-form :inline="true" class="" :model="formData">
      <el-form-item label="姓名">
        <el-input
          placeholder="输入姓名查询"
          v-model="formData.admin_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          placeholder="输入手机号查询"
          v-model="formData.admin_tel"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
          placeholder="输入邮箱查询"
          v-model="formData.admin_email"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSerch"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="default"
          :icon="CirclePlus"
          @click="$router.push({ name: 'AddAdminInfo' })"
          >新增管理员
        </el-button>
      </el-form-item>

      <!--            //导出数据模块-->
      <el-form-item>
        <div class="app-container">
          <el-button
            :loading="downloadLoading"
            class="filter-item"
            type="warning"
            icon="el-icon-download"
            @click="headleDownload"
            >导出数据
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    <!-- table,需要展示的数据 -->
    <el-table max-height="550px" :data="listData" border stripe>
      <el-table-column align="center" label="ID" width="50" type="index">
      </el-table-column>
      <!--            <el-table-column label="序号" width="180"><template slot-scope="scope"> {{scope.$index + 1 }} </template></el-table-column>-->
      <el-table-column label="管理员姓名" prop="admin_name"></el-table-column>
      <el-table-column label="电话" prop="admin_tel"></el-table-column>
      <el-table-column label="邮箱" prop="admin_email"></el-table-column>
      <el-table-column label="密码">
        <template #default="{ row }">
          {{ new Array(row.admin_pwd.length).fill('*').join('') }}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="150" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.admin_sex == '男'" type="primary">男</el-tag>
          <el-tag v-else-if="row.admin_sex == '女'" type="danger">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template #default="{ row }" slot-scope="scope">
          <el-button type="warning" size="small" @click="handleUpdate(row)"
            >编辑
          </el-button>
          <el-popconfirm title="你确定要删除吗？" @confirm="handleDelete(row)">
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        v-model:currentPage="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </el-card>
  <admin-info-drawer ref="DrawerRef" @reset="reset"></admin-info-drawer>
</template>
<script>
import { Search, CirclePlus } from '@element-plus/icons-vue';
import API from '../../utils/API/index.js';
import { ElMessage, ElMessageBox } from 'element-plus';
import AdminInfoDrawer from './AdminInfoDrawer.vue';
import { utils, writeFile } from 'xlsx';

export default {
  name: 'AdminInfoList',
  components: {
    AdminInfoDrawer,
  },
  data() {
    return {
      Search,
      CirclePlus,
      listData: [
        {
          admin_name: 1,
          admin_tel: 1,
          admin_email: 1,
          admin_pwd: 1,
          admin_sex: 1,
        },
      ],
      downloadLoading: false,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      formData: {
        admin_name: '',
        admin_tel: '',
        admin_email: '',
      },
    };
  },

  methods: {
    //  查询按钮
    handleSerch() {
      console.log(this.formData);
      this.lode();
    },
    // 刷新事件
    reset() {
      this.formData = {
        admin_name: '',
        admin_tel: '',
        admin_email: '',
      };
      this.currentPage = 1;
      this.currentPage = 5;
      this.lode();
    },
    //编辑
    /* 修改按钮*/
    async headleDownload() {
      this.downloadLoading = true;
      const tHeader = ['管理员姓名', '电话', '邮箱', '性别'];
      const filterVals = [
        'admin_name',
        'admin_tel',
        'admin_email',
        // 'admin_pwd',
        'admin_sex',
      ];
      const res = await API.adminInfo.findAll();
      // const res = { data: this.listData };
      if (res.data) {
        const exportArr = res.data.map((item) => {
          let arr = [];
          filterVals.forEach((filterVal) => {
            arr.push(item[filterVal]);
          });
          return arr;
        });
        exportArr.unshift(tHeader);
        const workSheet = utils.aoa_to_sheet(exportArr);
        const workBook = utils.book_new();
        utils.book_append_sheet(workBook, workSheet);
        writeFile(workBook, '管理员信息报表.xlsx');
        ElMessage.success('导出成功');
        this.downloadLoading = false;
      }
    },
    formatJson(filterVal) {
      return this.listData.map((v) => filterVal.map((j) => v[j]));
    },
    // formatJson(filterVal) {
    //     return this.list.map(v => filterVal.map(j => {
    //         if(j === 'timestamp'){
    //             return parseTime(v[j])
    //         }else{
    //             return v[j]
    //         }
    //     }))
    // },
    handleSizeChange(pageSize) {
      //改变每页的个数触发
      this.pageSize = pageSize;
      this.currentPage = 1
      this.lode();
    },
    handleCurrentChange(pageNum) {
      //改变当前页码触发
      this.currentPage = pageNum;
      this.lode();
    },
    async lode() {
      try {
        const res = await API.adminInfo.getListData({
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          ...this.formData,
        });
        if (res.data.records) {
          //   this.listData = res.data.records;
          this.total = res.data.total;
        }
      } catch {
        ElMessage.error('请求错误');
      }
    },

    //写一个方法，获取所有管理员的数据
    // async queryData() {
    //   let resp = await API.adminInfo.findAll();
    //   // resp.data代表返回的数据
    //   /**
    //                    * 注意服务器返回的数据格式
    //                    * {
    //                           status:"success",
    //                           msg:"接口返回的消息",
    //                           data:[]
    //                       }

    //                    */
    //   if (resp.data.status == 'success') {
    //     //服务器返回的是正确的结果
    //     this.listData = resp.data.data;
    //   } else {
    //     //提示用户请求失败ElMessage
    //     ElMessage.error(resp.data.msg);
    //   }
    // },
    //删除按钮事件
    async handleDelete(row) {
      //  console.log(row.id);
      //  有了id以后，我们就可以调用接口去删除数据了
      try {
        let resp = await API.adminInfo.deleteById(row.id);
        if (resp.data.status == 'success') {
          ElMessage.success(resp.data.msg);
          // 重新请求数据
          this.lode();
        } else {
          ElMessage.error(resp.data.msg);
        }
      } catch (error) {
        ElMessage.error('服务器错误，请重试或联系管理员');
      }
    },
    //编辑按钮事件
    handleUpdate(row) {
      //  console.log(row.id);
      //  有了id以后，我们就可以调用接口去删除数据了
      console.log(this.$refs.DrawerRef);
      this.$refs.DrawerRef.open(row);
      //   try {
      //     let resp = await API.adminInfo.updateById(row.id);
      //     if (resp.data.status == 'success') {
      //       ElMessage.success(resp.data.msg);
      //       // 重新请求数据
      //       this.lode();
      //     } else {
      //       ElMessage.error(resp.data.msg);
      //     }
      //   } catch (error) {
      //     ElMessage.error('服务器错误，请重试或联系管理员');
      //   }
    },
  },
  //代表当前的vue创建的时候，会自动执行的代码
  created() {
    this.lode();
  },
};
</script>
<style scoped lang="scss"></style>
