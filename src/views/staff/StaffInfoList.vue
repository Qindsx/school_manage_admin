<template>
  <el-card header="职工列表">
    <el-form :inline="true" :model="formData">
      <el-form-item label="职工姓名">
        <el-input
          v-model="formData.staff_name"
          placeholder="输入职工姓名查询"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="formData.phone"
          placeholder="输入手机号查询"
        ></el-input>
      </el-form-item>
      <el-form-item label="工号">
        <el-input
          v-model="formData.staff_number"
          placeholder="输入工号查询"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSearch" type="primary" :icon="Search"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="default"
          :icon="CirclePlus"
          @click="$router.push({ name: 'AddStaff' })"
          >新增职工
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
      <el-table-column label="职工名称" prop="staff_name"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="性别" width="150" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.custom_sex == '男'" type="primary">男</el-tag>
          <el-tag v-else-if="row.custom_sex == '女'" type="danger">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="工号" prop="staff_number"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="部门" prop="department"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="身份" prop="status"></el-table-column>
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
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        style="margin-left: 700px"
      >
      </el-pagination>
    </div>
  </el-card>
  <StaffDrawer ref="StaffDrawerRef" @reset="reset"></StaffDrawer>
</template>
<script>
import { Search, CirclePlus } from '@element-plus/icons-vue';
import API from '../../utils/API/index.js';
import { ElMessage } from 'element-plus';
import StaffDrawer from './StaffDrawer.vue';
export default {
  name: 'StaffInfoList',
  components: {
    StaffDrawer,
  },
  data() {
    return {
      Search,
      CirclePlus,
      listData: [],
      formData: {
        staff_number: '',
        staff_name: '',
        phone:'',
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
    reset() {
      this.queryData();
    },
    handleEdit() {},
    async queryData() {
      let resp = await API.staffinfo.getListData({
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
    async handleExport() {
      const tHeader = [
        '职工名称',
        '手机号',
        '邮箱',
        '性别',
        '工号',
        '地址',
        '部门',
        '状态',
        '身份',
      ];
      const filterVals = [
        'staff_name',
        'phone',
        'email',
        'custom_sex',
        'staff_number',
        'address',
        'department',
        'state',
        'status',
      ];
      const res = await API.staffinfo.findAll();
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
        writeFile(workBook, '职工信息报表.xlsx');
        ElMessage.success('导出成功');
      }
    },
    //点击删除按钮
    async handleDelete(row) {
      //console.log(row.id);
      //有了这个id以后，我们就可以调用接口去删除数据了
      try {
        let resp = await API.staffinfo.deleteById(row.id);
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
