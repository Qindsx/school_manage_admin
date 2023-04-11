<template>
    <el-card header="行程码列表">
        <el-form :inline="true" :model="formData">
            <el-form-item label="姓名">
                <el-input v-model="formData.travel_name" placeholder="输入姓名查询"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="formData.phone" placeholder="输入手机号查询"></el-input>
            </el-form-item>
            <el-form-item label="学号工号">
                <el-input v-model="formData.number" placeholder="输入学号工号查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleSerch" type="primary" :icon="Search">查询</el-button>
            </el-form-item>
            <el-form-item>
                <download-excel lass="export-excel-wrapper" :data="json_data" :name="dwtjsjName"
                    :before-generate="startDownload" :fields="json_fields">
                    <el-button @click="handleExport" type="warning" icon="download" style="margin-left: 100%">导出数据
                    </el-button>
                </download-excel>
            </el-form-item>
        </el-form>

        <!-- 表格，表格要展示数据 -->
        <el-table max-height="550" border stripe :data="listData">
            <el-table-column align="center" label="ID" width="50" type="index">
            </el-table-column>
            <el-table-column label="姓名" prop="travel_name"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="性别" width="150" align="center">
                <template #default="{ row }">
                    <el-tag v-if="row.custom_sex == '男'" type="primary">男</el-tag>
                    <el-tag v-else-if="row.custom_sex == '女'" type="danger">女</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="学号工号" prop="number"></el-table-column>
            <el-table-column label="身份" prop="status"></el-table-column>
            <el-table-column label="途径城市" prop="pathologically"></el-table-column>
            <el-table-column label="更新时间" prop="update_time"></el-table-column>
            <el-table-column label="风险性" prop="risk"></el-table-column>
            <el-table-column label="操作" width="160" align="center">
                <template #default="{ row }">
                    <!-- <el-button type="warning" size="small">编辑</el-button> -->
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
            <span class="demonstration"></span><el-pagination v-model:currentPage="currentPage"
                :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </el-card>
</template>
<script>
import { Search, CirclePlus } from '@element-plus/icons-vue';
import API from '../../utils/API/index.js';
import { ElMessage } from 'element-plus';

export default {
    name: 'TravelCodeErrorInfoList',
    data() {
        return {
            Search,
            CirclePlus,
            listData: [],
            formData: { travel_name: '', phone: '', number: '' },
            currentPage: 1,
            pageSize: 5,
            total: 0,
        };
    },
    methods: {
        handleSerch() {
            this.queryData();
        },
        async queryData() {
            let resp = await API.travelcodeinfo.getListData({
                ...this.formData,
                pageNum: this.currentPage,
                pageSize: this.pageSize,
            });
            if (resp.data.status == 'success') {
                let total = 0;
                let arr = [];
                resp.data.forEach((item) => {
                    if (item.risk === '低风险') {
                        arr.push(item);
                        total += 1;
                    }
                });
                this.listData = arr;
                this.total = total;
            } else {
                ElMessage.error(resp.data.msg);
            }
        },
        async handleExport() {
            const tHeader = [
                '姓名',
                '手机号',
                '性别',
                '学号工号',
                '身份',
                '途径城市',
                '更新时间',
                '风险性',
            ];
            const filterVals = [
                'travel_name',
                'phone',
                'custom_sex',
                // 'admin_pwd',
                'number',
                'status',
                'pathologically',
                'update_time',
                'risk',
            ];
            const res = await API.nucleicacidinfo.findAll();
            // const res = { data: this.listData };
            if (res.data) {
                const exportArr = res.data.map((item) => {
                    let arr = [];
                    if (item.risk === '低风险') {
                        filterVals.forEach((filterVal) => {
                            arr.push(item[filterVal]);
                        });
                    }
                    return arr;
                });
                exportArr.unshift(tHeader);
                const workSheet = utils.aoa_to_sheet(exportArr);
                const workBook = utils.book_new();
                utils.book_append_sheet(workBook, workSheet);
                writeFile(workBook, '行程码信息报表.xlsx');
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
                let resp = await API.travelcodeinfo.deleteById(row.id);
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
<style scoped lang="scss">

</style>
