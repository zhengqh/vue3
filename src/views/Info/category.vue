<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div v-for="item in categoryData" :key="item.id">
            {{item.category_name}}
            <el-button>编辑</el-button>
            <el-button @click="deleteItem(item.id)">删除</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-form ref="formRef" :model="form">
            <el-form-item label="一级分类">
              <el-input v-model="form.firstCategory"></el-input>
            </el-form-item>
            <el-form-item label="二级分类">
              <el-input v-model="form.secondCategory"></el-input>
            </el-form-item>
            <el-button @click="submit" type="success" :loading="submitBtnLoding">提交</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { AddFirstCategory, GetCategory, DeleteCategory } from '@/api/info';
import { global } from '@/utils/global_V3.0'
export default {
  name: 'Category',
  data() {
    return{
      form: {
        firstCategory: '',
        secondCategory: ''
      },
      categoryData: [],
      submitBtnLoding: false,
      itemId: ''
    }
  },
  mounted() {
    this.getCategory()
  },
  methods:{
    // 提交添加
    submit(){
      this.add()
    },
    // 删除分类
    deleteItem(id){
      this.itemId = id
      global().confirm({
                content: '确认删除当前信息，确认后将无法恢复！',
                type: 'warning',
                fn: this.deleteCategory,
            })
    },
    //请求删除信息分类
    deleteCategory(){
      DeleteCategory({categoryId:this.itemId}).then(response =>{
        console.log(response)
        /**
         * 操作数组
         * 1、findIndex + splice
         */
      //  let index = this.categoryData.findIndex(item => item.id === this.itemId)
      //  this.categoryData.splice(index,1)
      //2、filter
      let newData = this.categoryData.filter(item => item.id !== this.itemId)
      this.categoryData = newData
      }).catch(error => {})
    },
    add(){
      if(!this.form.firstCategory){
        this.$message({
          message: '分类名称不能为空',
          type: 'error'
        })
        return false;
      }
      // 提交时按钮状态
      this.submitBtnLoding = true
      let firstC = this.form.firstCategory
      AddFirstCategory({categoryName:firstC})
      .then((response) => {
        let data = response.data
        if(data.resCode === 0){
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
        // this.getCategory()
        // console.log(response)
        
        this.categoryData.push(response.data.data)
        // 提交成功后按钮状态
        this.submitBtnLoding = false
        //提交成功后重置表单
          // this.$refs.formRef.resetFields(); 没成功，好像是需要配置prop
          this.form.firstCategory = ''
      })
      .catch(error => {
        this.submitBtnLoding = true
        this.form.firstCategory = ''
        })
    },
    //获取信息分类
    getCategory(){
      GetCategory().then(response => {
        console.log(response)
        let data = response.data.data.data
        this.categoryData = data
      }).catch(error => {})
    }
  }
}
</script>

<style>

</style>