<template>
  <el-card header="学生列表">
    <el-form :inline="true" :model="formData">
      <el-form-item label="学生姓名">
        <el-input
          v-model="formData.student_name"
          placeholder="输入学生姓名查询"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="formData.phone"
          placeholder="输入手机号查询"
        ></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input
          v-model="formData.student_number"
          placeholder="输入学号查询"
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
          @click="$router.push({ name: 'AddStudent' })"
          >新增学生
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
      <el-table-column label="学生名称" prop="student_name"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="性别" width="150" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.custom_sex == '男'" type="primary">男</el-tag>
          <el-tag v-else-if="row.custom_sex == '女'" type="danger">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="学号" prop="student_number"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="学院" prop="college"></el-table-column>
      <el-table-column label="班级" prop="class"></el-table-column>
      <el-table-column label="寝室" prop="dormitory"></el-table-column>
      <el-table-column label="辅导员" prop="instructor"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="身份" prop="status"></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template #default="{ row }">
          <el-button @click="handleEdit(row)" type="warning" size="small"
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
  <StudentDrawer ref="StudentDrawerRef" @reset="reset"></StudentDrawer>
</template>
<script>
import { Search, CirclePlus } from '@element-plus/icons-vue';
import API from '../../utils/API/index.js';
import { ElMessage } from 'element-plus';
import { Axios as request } from 'axios';
import StudentDrawer from './StudentDrawer.vue';

export default {
  name: 'StudentInfoList',
  components: { StudentDrawer },
  data() {
    return {
      Search,
      CirclePlus,
      listData: [],
      formData: {
        student_name: '',
        phone: '',
        student_number: '',
      },
      total: 0,
      currentPage: 1,
      pageSize: 5,
    };
  },
  methods: {
    handleEdit(row) {
      this.$refs.StudentDrawerRef.open(row);
    },
    handleSerch() {
      this.queryData();
    },
    reset() {
      this.queryData();
    },
    async queryData() {
      let resp = await API.studentinfo.getListData({
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
      const tHeader = [
        '学生名称',
        '手机号',
        '邮箱',
        '性别',
        '学号',
        '学院',
        '班级',
        '寝室',
        '辅导员',
        '状态',
        '身份',
      ];
      const filterVals = [
        'student_name',
        'phone',
        'email',
        'custom_sex',
        'student_number',
        'address',
        'college',
        'class',
        'dormitory',
        'instructor',
        'state',
        'status',
      ];
      const res = await API.studentinfo.findAll();
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
        writeFile(workBook, '学生信息报表.xlsx');
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
    // lode() {
    //   request
    //     .get('/student-info/page', {
    //       params: {
    //         pageNum: this.currentPage,
    //         pageSize: this.pageSize,
    //         search: this.search,
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       this.listData = res.data.records;
    //       this.total = res.data.total;
    //     });
    // },
    //点击删除按钮
    async handleDelete(row) {
      //console.log(row.id);
      //有了这个id以后，我们就可以调用接口去删除数据了
      try {
        let resp = await API.studentinfo.deleteById(row.id);
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
