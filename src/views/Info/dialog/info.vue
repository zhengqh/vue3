<template>
  <el-dialog
  title="新增"
  :visible.sync="dialogVisible"
  width="50%"
  @close="close" >
    <el-form ref="addInfoFormRef" :model="addInfoForm" label-width="80px">
        <el-form-item label="活动区域">
            <el-select v-model="addInfoForm.category" placeholder="请选择活动区域">
            <el-option 
            v-for="item in categoryItem"
            :key="item.id"
            :label="item.category_name"
            :value="item.id">
            </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="标题">
            <el-input v-model="addInfoForm.title"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
            <el-input type="textarea" v-model="addInfoForm.content"></el-input>
        </el-form-item>
    </el-form>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>
  </el-dialog>
</template>

<script>
import { AddInfo } from '@/api/info'
export default {
    name: 'dialogInfo',
    props: {
        flag:{
            type: Boolean,
            default: false
        },
        categoryItem:{
            type: Array,
            default: () => []
        }
    },
    data(){
        return{
            dialogVisible: false,
            // 对话框form表单绑定数据
            addInfoForm: {
                category: '',
                title: '',
                content: ''
            }
        }
    },
    methods:{
        close(){
            //父子传值方法
            this.dialogVisible = false
            // this.$emit('close', this.dialogVisible)
            //修饰符方法
            this.$emit('update:flag',false)
        },
        //重置表单
        resetForm() {
            this.addInfoForm.category = ''
            this.addInfoForm.title = ''
            this.addInfoForm.content = ''
        },
        submit() {
            // let that = this
            console.log(this.addInfoForm)
            // return false
            let requestData = {
                category: this.addInfoForm.category,
                title: this.addInfoForm.title,
                content: this.addInfoForm.content
            }
            if(!this.addInfoForm.category){
                this.$message({
                    message: '分类不能为空！',
                    type: 'error'
                })
                return false;
            }
            AddInfo(requestData).then(response => {
                let responseData = response.data
                this.$message({
                    message: responseData.message,
                    type: 'success'
                })
                this.resetForm()
                this.dialogVisible = false
            }).catch(error => {
                this.dialogVisible = false
            })
            
        }
    },
    watch:{
        flag:{
            handler(newValue, oldValue){
                this.dialogVisible = newValue
            }
        }
    }

}
</script>

<style lang="scss" scoped>

</style>