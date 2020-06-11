<template>
    <div>
        <div class="label-wrap category">
            <label>类型：</label>
                <div class="content-wrap">
                    <el-select v-model="value" placeholder="请选择">
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
                    v-model="value1"
                    type="daterange"
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
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in categoryOptions.item"
                    :key="item.id"
                    :label="item.category_name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
        </div>
            <el-button type="danger" @click="deleteItem">查询</el-button>
            <el-button type="warning" @click="dialogStatus">新增</el-button>
            <DialogInfo :flag.sync='dialoginfo' :categoryItem="categoryOptions.item" />
            <!-- table表格  start -->
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                prop="address"
                label="标题"
                width="420">
            </el-table-column>
            <el-table-column
                prop="name"
                label="类别"
                width="140">
            </el-table-column>
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="管理人"
                width="150">
            </el-table-column>
            <el-table-column
                label="操作"
                width="180">
                <template >
                    <el-button  type="danger" size="small">查看</el-button>
                    <el-button type="success" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
            <!-- table表格  end -->
    </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
import DialogInfo from './dialog/info'
// import { confirm } from '@/utils/validate'
import { global } from '@/utils/global_V3.0'
import { common } from '@/api/common'
import { validateUser } from '../../utils/validate';
export default {
    name: 'InfoIndex',
    components: {DialogInfo},
     setup(props, {root}) {
        //  vue3.0全局的方法getInfoCategory获取分类数据，监听categoryItem进行赋值
        const { categoryItem, getInfoCategory } = common()
        const categoryOptions =  reactive({
            item:[]
        })
        //table表格数据
        const tableData = reactive([{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }])
        const value = ref('')
        const value1 = ref('')
        const dialoginfo = ref(false)
        //方法
        const dialogStatus = () => {
            dialoginfo.value = true
        }
        // 解构global里面的函数
        const { str: aaa, confirm } = global()
        watch(() => console.log(aaa.value))
        const deleteItem = () => {
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
                fn: confirmDelete,
                id: 2222
            })
        }
        const confirmDelete = () => {
            console.log('删除了')
        }
        // const close = (status) => {
        //     console.log(status)
        //     dialoginfo.value = status
        // }
        /**
         * 生命周期
         */
        onMounted(() => {
            // root.getInfoCategory()
            getInfoCategory()
        })
        /**
         * watch
         */
        watch(() => categoryItem.item, (value) => {
            // console.log(value)
            categoryOptions.item = value
        })
        categoryItem
        return {
            categoryOptions,
            tableData,
            value,
            value1,
            dialoginfo,
            dialogStatus,
            close,
            deleteItem
        }
     }
}
</script>

<style lang="scss" scope>
@import '@s/config.scss';

.label-wrap{
    &.category { @include labelDemo(160,left,50)}
    &.date {@include labelDemo(430, right, 70)}
    &.keywords{@include labelDemo(160,right, 60)}
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