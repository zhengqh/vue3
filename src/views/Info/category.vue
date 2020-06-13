<template>
  <div>
    <el-button type="danger" @click="addFirst({type:'first-category-add'})">添加一级分类</el-button>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-tree
        :data="categoryData.item"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        >
        <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="btnBox">
          <el-button
            type="success"
            size="mini"
            @click="addChildren(node, data, {type: 'second-category-add'})">
            添加子级
          </el-button>
          <el-button
            type="warning"
            size="mini"
            @click="editItem({data:data, type: 'first-category-edit'})">
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteItem(data.id)">
            删除
          </el-button>
        </span>
      </span>
        </el-tree>
        <!-- <el-card>
          <div v-for="item in categoryData.item" :key="item.id">
            {{item.category_name}}
            <el-button type="primary" @click="editItem({data:item, type: 'first-category-edit'})">编辑</el-button>
            <el-button type="warning" @click="deleteItem(item.id)">删除</el-button>
          </div>
        </el-card> -->
      </el-col>
      <el-col :span="8">
        <el-form ref="formRef" :model="form">
            <el-form-item label="一级分类" prop="firstCategory">
              <el-input v-model="form.firstCategory" :disabled="firstCategoryStatus"></el-input>
            </el-form-item>
            <el-form-item label="二级分类" prop="secondCategory">
              <el-input v-model="form.secondCategory" :disabled="secondCategoryStatus"></el-input>
            </el-form-item>
            <el-button @click="submit" type="success" :loading="submitBtnLoding" :disabled="submitBtnStatus">提交</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { AddFirstCategory, GetCategory, DeleteCategory, EditCategory, AddChildrenCategory } from '@/api/info';
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
      submitBtnStatus:true,
      // 按钮操作为提交，编辑
      submitBtnType: '',
      // 信息分类数据
      categoryData: {
        item: [],
        current: {}
      },
      //父级分类ID
      parentId: '',
      defaultProps:{
        label: 'category_name'
      },
      // 提交表单状态
      submitBtnLoding: false,
      // 删除分类某项ID
      itemId: '',
      
    }
  },
  mounted() {
    // 直接调用获取分类数据
    // this.getCategory()
    // 调用Vuex的异步方法获取分类数据 下面代码一般另外定义一个函数进行调用，比较懒就先这样处理了
    this.$store.dispatch('common/getInfoCategory').then(response => {
      console.log(response)
      this.categoryData.item = response
    })
  },
  methods:{
    // 提交添加
    submit(){
      if(this.submitBtnType === 'first-category-edit') { this.editFirstCategory()}
      if(this.submitBtnType === 'first-category-add') {this.add()}
      if(this.submitBtnType === 'second-category-add') {this.addChildrenCategory()}
      // this.add()
      this.firstCategoryStatus = true
      this.secondCategoryStatus = true
      this.submitBtnStatus = true
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
    //添加子级
    addChildren(node,data,params) {
      this.firstCategoryStatus = true,
      this.secondCategoryStatus = false,
      this.submitBtnStatus = false,
      this.form.firstCategory = data.category_name
      this.parentId = data.id
      this.submitBtnType = params.type
      // console.log(node)
      // console.log(data)
    },
    //提交添加子级分类
    addChildrenCategory(){
      if(!this.form.secondCategory){
        this.$message({
          message: '请输入二级分类名称',
          type: 'error'
        })
        return false
      }
      let requestData = {
        categoryName: this.form.secondCategory,
        parentId: this.parentId
      }
      console.log(requestData)
      AddChildrenCategory(requestData).then(response => {
        console.log(response)
        this.form.secondCategory = ''
        // this.$refs[formRef].resetFields();
      }).catch(error => {
        // this.$refs[formRef].resetFields();
        this.form.secondCategory = ''
      })
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
    // getCategory(){
    //   GetCategory().then(response => {
    //     console.log(response)
    //     let data = response.data.data.data
    //     this.categoryData.item = data
    //   }).catch(error => {})
    // },
    //点击添加一级分类按钮
    addFirst(params){
      this.firstCategoryStatus = false
      this.secondCategoryStatus = true
      this.submitBtnStatus = false
      this.submitBtnType = params.type
      this.form.firstCategory = ''
    },
    // 点击编辑按钮
    editItem(params){
      this.firstCategoryStatus = false
      this.secondCategoryStatus = true
      this.submitBtnStatus = false
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

<style lang="scss" scope>
.btnBox{
  margin-left: 150px;
}
</style>