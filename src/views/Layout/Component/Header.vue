<template>
    <div id="header">
        <div class="pull-left header-icon" @click="navMenuState">
            <svg-icon  iconClass="menu" className="mune"></svg-icon>
        </div>
        <div class="pull-right">
            <div class="user-info pull-left header-icon">
                <span>{{username}}</span>
            </div>
            <div class="pull-right header-icon" @click="exit">
                <svg-icon iconClass="exit" className="mune"></svg-icon>
            </div>
        </div>
    </div>
</template>
<script>
import { computed } from '@vue/composition-api'
export default {
    name: 'layoutHeader',
    setup(props, {root}){
        const username = computed(() => root.$store.state.app.username)
        const navMenuState = () => {
           root.$store.commit('app/SET_COLLAPSE')
        }
        // 退出
        const exit = () =>{
            root.$store.dispatch('app/exit')
                .then(() => {
                    root.$router.push({
                        name: 'Login'
                    })
                })
        }
        return {
            username,
            navMenuState,
            exit
        }
    }

}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
#header {
    // position: fixed;
    // top: 0;
    // right: 0;
    // left: $navMenu;
    // height: 75px;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
    .header-icon{
        height: 75px;
        line-height: 75px;
        padding: 0 32px;
        svg{
            font-size: 25px;
            cursor: pointer;
            margin-bottom: -8px;
        }
    }
    .user-info{
        border-right: 1px solid #ededed;
    }
}
</style>