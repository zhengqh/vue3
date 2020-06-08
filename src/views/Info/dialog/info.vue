<template>
  <el-dialog
  title="新增"
  :visible.sync="dialogVisible"
  width="30%"
  @close="close"  >
  <span>这是一段信息</span>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </el-dialog>
</template>

<script>
export default {
    name: 'dialogInfo',
    props: {
        flag:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            dialogVisible: false
        }
    },
    methods:{
        close(){
            //父子传值方法
            this.dialogVisible = false
            // this.$emit('close', this.dialogVisible)
            //修饰符方法
            this.$emit('update:flag',false)
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