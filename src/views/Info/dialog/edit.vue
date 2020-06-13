<template>
  <el-dialog
  title="编辑"
  :visible.sync="dialogVisible"
  width="50%"
  @open="open"
  @close="close" >
    <el-form ref="addInfoFormRef" :model="editInfoForm" label-width="80px">
        <el-form-item label="选择分类">
            <el-select v-model="editInfoForm.category" placeholder="请选择活动区域">
            <el-option 
            v-for="item in categoryItem"
            :key="item.id"
            :label="item.category_name"
            :value="item.id">
            </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="标题">
            <el-input v-model="editInfoForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
            <el-input type="textarea" v-model="editInfoForm.content"></el-input>
        </el-form-item>
    </el-form>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit" :loading="submitBtnLoading">提 交</el-button>
  </el-dialog>
</template>

<script>
import { AddInfo, GetList, EditInfo } from '@/api/info'
export default {
    name: 'dialogInfo',
    props: {
        flag:{
            type: Boolean,
            default: false
        },
        itemInfoId:{
            type: String,
            default: ''
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
           editInfoForm: {
                category: '',
                title: '',
                content: ''
            },
            // 提交按钮状态
            submitBtnLoading: false
        }
    },
    methods:{
        open(){
            let requestData = {
                id: this.itemInfoId,
                pageNumber: 1,
                pageSize: 1
            }
            // console.log(this.itemInfoId)
            GetList(requestData).then(response => {
                // console.log(response)
                let responseData = response.data.data.data[0]
                // console.log(responseData)
                this.editInfoForm = {
                category: responseData.categoryId,
                title: responseData.title,
                content: responseData.content
                }
            })
        },
        // 关闭事件
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
        // 提交编辑
        submit() {
            let requestData = {
                id: this.itemInfoId,
                categoryId: this.editInfoForm.category,
                title: this.editInfoForm.title,
                content: this.editInfoForm.content
            }
            this.submitBtnLoading = true
            EditInfo(requestData).then(response => {
                let responseData = response.data
                this.$message({
                    message: responseData.message,
                    type: 'success'
                })
                this.resetForm()
                this.submitBtnLoading = false
                this.dialogVisible = false
            }).catch(error => {
                this.submitBtnLoading = false
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