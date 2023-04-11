<template>
  <el-card header="通告列表">
    <el-form :inline="true" :model="formData">
      <el-form-item label="内容">
        <el-input
          v-model="formData.annunciate"
          placeholder="输入内容查询"
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
          @click="$router.push({ name: 'AddAnnunciate' })"
          >新增通告
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
            type="warning"
            icon="download"
            style="margin-left: 450px"
            @click="headleDownload"
            >导出数据
          </el-button>
        </download-excel>
      </el-form-item>
    </el-form>
    <!-- 表格，表格要展示数据 -->
    <el-table max-height="550" border stripe :data="listData">
      <el-table-column align="center" label="ID" width="50" type="index">
      </el-table-column>
      <el-table-column label="通告" prop="annunciate"></el-table-column>
      <el-table-column label="时间" prop="time"></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template #default="{ row }" slot-scope="scope">
          <el-button type="warning" size="small" @click="editUser(scope.row)"
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
  <AnunciateDrawer ref="AnunciateDrawerRef" @reset="reset"></AnunciateDrawer>
</template>
<script>
import { Search, CirclePlus } from '@element-plus/icons-vue';
import API from '../../utils/API/index.js';
import { ElMessage } from 'element-plus';
import AnunciateDrawer from './AnunciateDrawer.vue';
import { utils, writeFile } from 'xlsx';

export default {
  name: 'AnnunciateInfoList',
  components: {
    AnunciateDrawer,
  },
  data() {
    return {
      Search,
      CirclePlus,
      listData: [],
      formData: {
        annunciate: '',
      },
      currentPage: 1,
      pageSize: 5,
      total: 0,
    };
  },
  methods: {
    reset() {
      this.queryData();
    },
    editUser(row) {
      this.$refs.AnunciateDrawerRef.open(row);
    },
    handleSerch() {
      this.queryData();
    },
    async queryData() {
      let resp = await API.annunciateinfo.getListData({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.formData,
      });
      if (resp.data.status == 'success') {
        this.listData = resp.data.data;
        this.total=resp.data.total
      } else {
        ElMessage.error(resp.data.msg);
      }
    },
    handleSizeChange(pageSize) {
      //改变每页的个数触发
      this.pageSize = pageSize;
      this.currentPage = 0;
      this.queryData();
    },
    handleCurrentChange(pageNum) {
      //改变当前页码触发
      this.currentPage = pageNum;
      this.queryData();
    },

    /* 导出按钮*/
    async headleDownload() {
      this.downloadLoading = true;
      const tHeader = ['通告', '时间'];
      const filterVals = ['annunciate', 'time'];
      const res = await API.annunciateinfo.findAll();
      //   const res = { data: this.listData };
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
        writeFile(workBook, '通告信息信息报表.xlsx');
        ElMessage.success('导出成功');
        this.downloadLoading = false;
      }
    },
    //点击删除按钮
    async handleDelete(row) {
      //console.log(row.id);
      //有了这个id以后，我们就可以调用接口去删除数据了
      try {
        let resp = await API.annunciateinfo.deleteById(row.id);
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
