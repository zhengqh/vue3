<template>
    <el-select v-model="selectValue" placeholder="请选择">
        <el-option
        v-for="item in initOptionArr"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
export default {
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return{
            selectValue: '',
            initOptionArr: [],
            options:[
                {value: 'tel', label: '电话'},
                {value: 'name', label: '姓名'}
            ]
        }
    },
    methods:{
        initOption(){
            let configData = this.config.init
            let optionArr = [];
            //对数组进行数据检验
            if(configData.length ===0){
                console.log('cinfig的参数是空的，不能显示下拉菜单')
                return false
            }
            configData.forEach(items =>{
                let arr = this.options.filter(item => item.value === items)[0]
                // this.initOptionArr.push(arr) //视图绑定这个数据，循环的时候说是会影响性能
                optionArr.push(arr)
            })
            //对数组进行数据检验
            if(configData.length === 0){
                console.log('匹配的数据为空')
                return false
            }
            // 初始化完进行赋值
            this.initOptionArr = optionArr
            //初始化选择器默认选中
            this.selectValue = optionArr[0].value
            // console.log(optionArr[0])
        }
    },
    mounted(){
            // this.initOption()
            // 这里已经dom渲染完毕了，如果进行重新赋值会重新渲染，则影响性能

    },
    watch:{
        config:{
            handler(newValue, oldValue){
                this.initOption()
            },
            immediate: true  // 组件初始化时，马上对config监听。
        }
    }
}
</script>

<style>

</style>