<template>
  <div>
      编辑详情页
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        console.log(this.$route.params.id)
        console.log(this.$route.params.title)
    }
}
</script>

<style lang="scss" scope>

</style>