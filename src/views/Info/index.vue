<template>
    <div>
        <div class="label-wrap category">
            <label>类型：</label>
                <div class="content-wrap">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
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
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
            <el-button type="warning" @click="dialogStatus">新增</el-button>
            <DialogInfo :flag.sync='dialoginfo' />
            <el-button type="danger" @click="deleteItem">删除</el-button>
    </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
import DialogInfo from './dialog/info'
// import { confirm } from '@/utils/validate'
import { global } from '@/utils/global_V3.0'
export default {
    name: 'InfoIndex',
    components: {DialogInfo},
     setup(props, {root}) {
        const options =  reactive([{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
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
            root.getInfoCategory()
        })
        return {
            options,
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