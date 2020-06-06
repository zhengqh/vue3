<template>
    <div id="main-wrap">
        <div id="main-content">
                <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'layoutMain'
}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
#main-wrap {
    width: 100%;
    height: 100%;
    #main-content{
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        background-color: #fff;
    }
}
</style>