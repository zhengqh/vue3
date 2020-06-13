<template>
    <div>
        <div class="label-wrap category">
            <label>类型：</label>
                <div class="content-wrap">
                    <el-select v-model="categoryValue" placeholder="请选择">
                        <el-option
                        v-for="item in categoryOptions.item"
                        :key="item.id"
                        :label="item.category_name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
        </div>
        <div class="label-wrap date">
            <label>日期：</label>
            <div class="content-wrap">
                <div class="block">
                    <el-date-picker
                    v-model="dateValue"
                    type="datetimerange"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
        </div>
        <div  class="label-wrap keywords">
            <label for="">关键字：</label>
            <div class="content-wrap">
                <el-select v-model="keywordValue" placeholder="请选择">
                    <el-option
                    v-for="item in searchOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="label-wrap searchInput">
            <el-input v-model="searchValue" placeholder="请输入内容"></el-input>
        </div>
            <el-button type="danger" @click="getList">搜索</el-button>
            <el-button type="warning" @click="dialogStatus">新增</el-button>
            <DialogInfo :flag.sync='dialoginfo' :categoryItem="categoryOptions.item" />
            <DialogEdit :flag.sync="dialogInfoEdit" :categoryItem="categoryOptions.item" :itemInfoId = "itemInfoId"></DialogEdit>
            <!-- table表格  start -->
        <el-table
        :data="tableData.item"
        v-loading="loading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        >
             <el-table-column
            type="selection"
            width="45">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                width="400">
            </el-table-column>
            <el-table-column
                prop="categoryId"
                label="类别"
                width="120"
                :formatter='toCategory'>
            </el-table-column>
            <el-table-column
                prop="createDate"
                label="日期"
                width="180"
                :formatter='toData'
                >
            </el-table-column>
            <el-table-column
                prop="user"
                label="管理人"
                width="120">
            </el-table-column>
            <el-table-column
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <el-button  type="danger" size="small" @click="deleteItem(scope.row.id)">删除</el-button>
                    <el-button type="success" size="small" @click="editItem(scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- table表格  end -->
        <el-row>
            <el-col :span="12">
                <el-button size="medium"  @click="deleteAll">批量删除</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.number"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
import DialogInfo from './dialog/info'
import DialogEdit from './dialog/edit'
// import { confirm } from '@/utils/validate'
import { global } from '@/utils/global_V3.0'
import { common } from '@/api/common'
import { validateUser } from '../../utils/validate';
import { GetList, DeleteInfo } from '@/api/info'
import { timestampToTime } from '@/utils/common'
export default {
    name: 'InfoIndex',
    components: {DialogInfo, DialogEdit},
     setup(props, {root}) {
        //  vue3.0全局的方法getInfoCategory获取分类数据，监听categoryItem进行赋值
        const { categoryItem, getInfoCategory } = common()
        // 分类数据
        const categoryOptions =  reactive({
            item:[]
        })
        //table表格数据
        const tableData = reactive({
            item: []
        })
        //当前项的ID
        const itemInfoId = ref('')
        // 分类
        const categoryValue = ref('')
        // 日期
        const dateValue = ref('')
        // 关键字
        const keywordValue = ref('id')
        const searchOption = reactive([
            {value: 'id', label: 'ID'},
            {value: 'title', label: '标题'}
        ])
        //关键词输入框的值
        const searchValue = ref('')
        // 新增框dialog状态
        const dialoginfo = ref(false)
        // 编辑框dialogInfoEdit的状态
        const dialogInfoEdit = ref(false)
        //删除信息的ID
        const deleteInfoId = ref('')
        // 表格loading状态
        const loading = ref(false)
        // 当前页页面和条数
        const page = reactive({
            number: 1,
            size: 5
        })
        //总条数
        const total = ref(0)
        /**
         * methods 方法
         */
        // 对话框的状态
        const dialogStatus = () => {
            dialoginfo.value = true
        }
        // 解构global里面的函数
        const { str: aaa, confirm } = global()
        // watch(() => console.log(aaa.value))
        //搜索条件数据处理
        const formatData = () => {
             let requestData = {
                pageNumber: page.number,
                pageSize: page.size
            }
            if(categoryValue.value) {requestData.categoryId = categoryValue.value}
            if(dateValue.value.length > 0) {
                requestData.startTiem = dateValue.value[0]
                requestData.endTime = dateValue.value[1]
            }
            if(searchValue.value) {
                requestData[keywordValue.value] = searchValue.value
            }
            return requestData
        }
        // 删除当前项
        const deleteItem = (id) => {
            deleteInfoId.value = [id]
            console.log(deleteInfoId)
            // 第一种全局方法
            // root.confirm({
            //     content: '确认删除当前信息，确认后将无法恢复！',
            //     type: 'warning',
            //     fn: confirmDelete
            // })
            // 第二种全局方法
            // confirm({
            //     content: '确认删除当前信息，确认后将无法恢复！',
            //     type: 'warning',
            //     fn: confirmDelete
            // })
            // 第三种全局方法
            confirm({
                content: '确认删除当前信息，确认后将无法恢复！',
                type: 'warning',
                fn: confirmDelete
            })
        }
        //批量删除
        const deleteAll = () => {
            if(!deleteInfoId.value){
                root.$message({
                    message: '请选择要删除的项',
                    type: 'error'
                })
                return false
            }
            confirm({
                content: '确认删除当前信息，确认后将无法恢复！',
                type: 'warning',
                fn: confirmDelete
            })
        }
        // 选择项发送改变触发
        const handleSelectionChange = (selection) => {
            // console.log(selection)
            let selectionId = selection.map(item => item.id)
            // console.log(selectionId)
            deleteInfoId.value = selectionId
            if(selectionId.length === 0){
                deleteInfoId.value = ''
            }
        }
        //确认提交删除
        const confirmDelete = () => {
            DeleteInfo({id: deleteInfoId.value }).then(response => {
                root.$message({
                    message: response.data.message,
                    type: 'success'
                })
                getList()
                deleteInfoId.value = ''
            }).catch(error => {
            })
        }
        //编辑当前项
        const editItem = (id) => {
            itemInfoId.value = id
            // console.log(itemInfoId.value)
            dialogInfoEdit.value = true
        }
        // const close = (status) => {
        //     console.log(status)
        //     dialoginfo.value = status
        // }
        //类别格式化
        const toCategory = (row) => {
            //获取每行的类别id
            let itemId = row.categoryId
            // 过滤分类数据每项ID与类别ID相同的返回，返回是一个数组，则需要[0]
            let categoryData = categoryOptions.item.filter(item => item.id === itemId)[0]
            return categoryData.category_name
            // console.log(categoryData)
        }
        //日期格式化
        const toData = (row) => {
            // console.log(row)
            return timestampToTime(row.createDate)
        }
        //每页条数事件触发
        const handleSizeChange = (val) =>{
            // console.log(val + '每页条数')
            page.size = val
            getList()
        }
        // 当前页改变
        const handleCurrentChange = (val) =>{
            page.number = val
            getList()
        }
        const getList = () => {
            // let requestData = {
            //     categoryId: '',
            //     startTiem: '',
            //     endTime: '',
            //     title: '',
            //     id: '',
            //     pageNumber: page.number,
            //     pageSize: page.size
            // }
            let requestData =  formatData()
            loading.value = true
            GetList(requestData).then(response => {
                console.log(response)
                let responseData = response.data.data
                tableData.item = responseData.data
                total.value = responseData.total
                console.log(responseData.data)
                loading.value = false
            }).catch(error => {
                loading.value = false
            })
        }
        /**
         * 生命周期
         */
        onMounted(() => {
            // root.getInfoCategory()
            // getInfoCategory()
            // 获取信息分类
            getInfoCategory()
            // 获取信息列表
            getList()
        })
        /**
         * watch
         */
        // 调用了vue3.0定义的全局方法，getInfoCategory，所以监控里面categoryItem.item值的变化
        watch(() => categoryItem.item, (value) => {
            // console.log(value)
            categoryOptions.item = value
        })
        // categoryItem
        return {
            categoryOptions,
            tableData,
            keywordValue,
            dateValue,
            dialoginfo,
            dialogStatus,
            close,
            deleteItem,
            handleSizeChange,
            handleCurrentChange,
            keywordValue,
            dateValue,
            page,
            total,
            categoryValue,
            loading,
            toData,
            toCategory,
            handleSelectionChange,
            deleteAll,
            searchOption,
            searchValue,
            getList,
            editItem,
            itemInfoId,
            dialogInfoEdit
        }
     }
}
</script>

<style lang="scss" scope>
@import '@s/config.scss';

.label-wrap{
    &.category { @include labelDemo(160,left,50)}
    &.date {@include labelDemo(430, right, 70)}
    &.keywords{@include labelDemo(160,right, 60);
        margin-left: 50px
    }
    &.searchInput{ 
        float: left;
        width: 150px;
        margin-right: 50px;
    }
    // float: left;
    // &.category{
    //     width: 220px;
    // }
    // &.date{
    //     width: 513px;
    // }
    // label{
    //     float: left;
    //     width: 60px;
    //     line-height: 40px;
    // }
    // .content-wrap{
    //     // width: 100%;
    //     margin-left: 60px;
    // }
}
</style>