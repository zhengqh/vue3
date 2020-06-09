import { MessageBox } from 'element-ui';
// import { ref } from '@vue/composition-api';

//自定义全局方法第三种
export function global() {
    // const str = ref('') //vue3.0的这个方法可以监听数值变化
    const confirm = (params) => {
        MessageBox.confirm(params.content, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: params.type || 'warning',
            center: true
        }).then(() => {
            // this.$message({
            // type: 'success',
            // message: '删除成功!',
            // });
            // str.value = params.id || '';
            params.fn && params.fn()
            // if(params.fn) { params.fn() }
        }).catch(() => {
            // this.$message({
            // type: 'info',
            // message: '已取消删除'
            // });
        });
    }
    return{
        // str,
        confirm
    }
        
}