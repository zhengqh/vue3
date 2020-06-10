<template>
  <div>
    <el-button type="danger" @click="addFirst({type:'first-category-add'})">添加一级分类</el-button>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div v-for="item in categoryData.item" :key="item.id">
            {{item.category_name}}
            <el-button type="primary" @click="editItem({data:item, type: 'first-category-edit'})">编辑</el-button>
            <el-button type="warning" @click="deleteItem(item.id)">删除</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-form ref="formRef" :model="form">
            <el-form-item label="一级分类">
              <el-input v-model="form.firstCategory" :disabled="firstCategoryStatus"></el-input>
            </el-form-item>
            <el-form-item label="二级分类">
              <el-input v-model="form.secondCategory" :disabled="secondCategoryStatus"></el-input>
            </el-form-item>
            <el-button @click="submit" type="success" :loading="submitBtnLoding">提交</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { AddFirstCategory, GetCategory, DeleteCategory, EditCategory } from '@/api/info';
import { global } from '@/utils/global_V3.0'
export default {
  name: 'Category',
  data() {
    return{
      // 分类信息表单（修改或添加）
      form: {
        firstCategory: '',
        secondCategory: ''
      },
      // 分类信息表单状态(是否禁用)
      firstCategoryStatus:true,
      secondCategoryStatus: true,
      // 按钮操作为提交，编辑
      submitBtnType: '',
      // 信息分类数据
      categoryData: {
        item: [],
        current: {}
      },
      // 提交表单状态
      submitBtnLoding: false,
      // 删除分类某项ID
      itemId: '',
      
    }
  },
  mounted() {
    this.getCategory()
  },
  methods:{
    // 提交添加
    submit(){
      if(this.submitBtnType === 'first-category-edit') { this.editFirstCategory()}
      if(this.submitBtnType === 'first-category-add') {this.add()}
      // this.add()
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
      this.categoryData.item = newData
      }).catch(error => {})
    },
    //添加分类
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
        
        this.categoryData.item.push(response.data.data)
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
        this.categoryData.item = data
      }).catch(error => {})
    },
    //点击添加一级分类按钮
    addFirst(params){
      this.firstCategoryStatus = false
      this.submitBtnType = params.type
     this.form.firstCategory = ''
    },
    // 点击编辑按钮
    editItem(params){
      this.firstCategoryStatus = false
      this.form.firstCategory = params.data.category_name
      this.submitBtnType = params.type
      this.categoryData.current = params.data
    },
    //一级分类提交修改
    editFirstCategory(){
      if(!this.form.firstCategory){
        this.$message({
          message: '分类名称不能为空',
          type: 'error'
        })
        return false
      }
      let requestData = {
        id: this.categoryData.current.id,
        categoryName: this.form.firstCategory
      }
      EditCategory(requestData).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        //方法1
        // this.getCategory()
        let index =  this.categoryData.item.findIndex(item => item.id === this.categoryData.current.id)
        //方法2
        // this.categoryData.item.splice(index, 1, {id:this.categoryData.current.id, category_name: this.form.firstCategory})
        //方法3
        this.$set(this.categoryData.item, index, {id:this.categoryData.current.id, category_name: this.form.firstCategory})
        // console.log(this.categoryData.item)
        this.form.firstCategory = ''
      }).catch(error => {})
    }
  }
}
</script>

<style>

</style>