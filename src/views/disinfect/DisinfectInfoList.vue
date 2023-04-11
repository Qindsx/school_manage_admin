<template>
  <el-card header="消毒记录列表">
    <el-form :inline="true" :model="formData">
      <el-form-item label="地区名称">
        <el-input
          v-model="formData.area"
          placeholder="输入地区名称查询"
        ></el-input>
      </el-form-item>
      <el-form-item label="工作人名称">
        <el-input
          v-model="formData.name"
          placeholder="输入消毒工作人名称查询"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @clcik="handleSerch"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="default"
          :icon="CirclePlus"
          @click="$router.push({ name: 'AddDisinfect' })"
          >新增消毒区域
        </el-button>
      </el-form-item>
      <el-form-item>
        <download-excel
          lass="export-excel-wrapper"
          :data="json_data"
          :name="dwtjsjName"
          :before-generate="startDownload"
          :fields="json_fields"
        >
          <el-button
            @click="handleExport"
            type="warning"
            :loading="downloadLoading"
            icon="download"
            style="margin-left: 450px"
            >导出数据
          </el-button>
        </download-excel>
      </el-form-item>
    </el-form>
    <!-- 表格，表格要展示数据 -->
    <el-table max-height="550" border stripe :data="listData">
      <el-table-column align="center" label="ID" width="50" type="index">
      </el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="地区" prop="area"></el-table-column>
      <el-table-column label="时间" prop="time"></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template #default="{ row }">
          <el-button type="warning" size="small" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-popconfirm title="你确定要删除吗" @confirm="handleDelete(row)">
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分页信息 -->
    <div class="block">
      <span class="demonstration"></span
      ><el-pagination
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
  <DisinfectDrawer ref="DisinfectDrawerRef" @reset="reset"> </DisinfectDrawer>
</template>
<script>
import { Search, CirclePlus } from '@element-plus/icons-vue';
import API from '../../utils/API/index.js';
import { ElMessage } from 'element-plus';
import DisinfectDrawer from './DisinfectDrawer.vue';
import { utils, writeFile } from 'xlsx';
export default {
  name: 'DisinfectInfoList',
  components: {
    DisinfectDrawer,
  },
  data() {
    return {
      Search,
      CirclePlus,
      formData: {
        area: '',
        name: '',
      },

      downloadLoading: false,
      listData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
    };
  },
  methods: {
    reset() {
      this.queryData();
    },
    handleSerch() {
      this.queryData();
    },
    async queryData() {
      let resp = await API.disinfectinfo.getListData({
        ...this.formData,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      });
      if (resp.data.status == 'success') {
        this.listData = resp.data.data;
        this.total = resp.data.total;
      } else {
        ElMessage.error(resp.data.msg);
      }
    },
    handleEdit(row) {
      this.$refs.DisinfectDrawerRef.open(row);
    },

    async handleExport() {
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
    handleSizeChange(pageSize) {
      //改变每页的个数触发
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.queryData();
    },
    handleCurrentChange(pageNum) {
      //改变当前页码触发
      this.currentPage = pageNum;
      this.queryData();
    },
    //点击删除按钮
    async handleDelete(row) {
      //console.log(row.id);
      //有了这个id以后，我们就可以调用接口去删除数据了
      try {
        let resp = await API.disinfectinfo.deleteById(row.id);
        if (resp.data.status == 'success') {
          ElMessage.success(resp.data.msg);
          //重新请求数据
          this.queryData();
        } else {
          ElMessage.error(resp.data.msg);
        }
      } catch (error) {
        ElMessage.error('服务器错误，请联系管理员');
      }
    },
  },
  //代表当前的vue创建的时候 ，会自动执行的代码
  created() {
    this.queryData();
  },
};
</script>
<style scoped lang="scss"></style>
