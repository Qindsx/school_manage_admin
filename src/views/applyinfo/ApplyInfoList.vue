<template>
  <el-card header="申请列表">
    <el-form :inline="true" :model="formData">
      <el-form-item label="申请人名称">
        <el-input
          v-model="formData.apply_name"
          placeholder="输入申请人名称查询"
        ></el-input>
      </el-form-item>
      <el-form-item label="工号">
        <el-input v-model="formData.apply_number" placeholder="工号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSearch" type="primary" :icon="Search"
          >查询</el-button
        >
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
            icon="download"
            style="margin-left: 100%"
            >导出数据
          </el-button>
        </download-excel>
      </el-form-item>
    </el-form>
    <!-- 表格，表格要展示数据 -->
    <el-table max-height="550" border stripe :data="listData">
      <el-table-column align="center" label="ID" width="50" type="index">
      </el-table-column>
      <el-table-column label="申请人名称" prop="apply_name"></el-table-column>
      <el-table-column label="工号" prop="apply_number"></el-table-column>
      <el-table-column label="申请时间" prop="apply_time"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="原因" prop="reason"></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template #default="{ row }">
          <el-button type="success" size="small">同意</el-button>
          <el-popconfirm title="你确定要拒绝吗" @confirm="handleDelete(row)">
            <template #reference>
              <el-button type="danger" size="small">拒绝</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分页信息 -->
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
</template>
<script>
import { Search, CirclePlus } from '@element-plus/icons-vue';
import API from '../../utils/API/index.js';
import { ElMessage } from 'element-plus';
import applyinfo from '@/utils/API/applyinfo';
export default {
  name: 'ApplyInfoList',
  data() {
    return {
      Search,
      CirclePlus,
      listData: [],
      formData: {
        apply_name: '',
        apply_number: '',
      },
      currentPage: 1,
      pageSize: 5,
      total: 0,
    };
  },
  methods: {
    handleSearch() {
      this.queryData();
    },
    async queryData() {
      let resp = await API.applyinfo.getListData({
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
    async handleExport() {
      const tHeader = ['申请人名称', '工号', '申请时间', '状态', '原因'];
      const filterVals = [
        'apply_name',
        'apply_number',
        'apply_time',
        'status',
        'reason',
      ];
      const res = await API.roleinfo.findAll();
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
        writeFile(workBook, '角色信息报表.xlsx');
        ElMessage.success('导出成功');
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
        let resp = await API.applyinfo.deleteById(row.id);
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
