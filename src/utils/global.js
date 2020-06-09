export default {
    install (Vue){
        Vue.prototype.confirm = function(params){
            this.$confirm(params.content, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: params.type,
                center: true
            }).then(() => {
                this.$message({
                type: 'success',
                message: '删除成功!',
                });
                params.fn && params.fn()
                // if(params.fn) { params.fn() }
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
                });
            });
        }           
    }
}