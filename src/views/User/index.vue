<template>
  <div>
    <el-row>
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="3">
            <label>关键词</label>
          </el-col>
          <el-col :span="6">
            <selectVue :config="configOption" />
          </el-col>
          <el-col :span="9">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button>搜索</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-button type="danger" class="pull-right">添加用户</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import selectVue from '@c/Select'
export default {
    name: 'UserIndex',
    components: { selectVue },
    data() {
      return{
        configOption: {
          init:['tel', 'name']
        }
      }
    }
}
</script>

<style lang="scss" scope>

</style>