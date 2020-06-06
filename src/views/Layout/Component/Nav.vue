<template>
    <div id="nav-wrap">
        <el-menu 
        default-active="1-4-1"
        :collapse="isCollapse"
        background-color="transparent" 
        text-color="#fff" 
        active-text-color="#fff"
        router
        >
            <template v-for="(item, index) in routers">
                <el-submenu :index="item.path" :key="index" v-if="!item.hidden">
                        <template slot="title">
                        <svg-icon :iconClass="item.meta.icon" className="item.meta.icon"></svg-icon>
                        <span slot="title">{{item.meta.name}}</span>
                        </template>
                        <template v-for="subitem in item.children">
                        <el-menu-item :index="subitem.path" :key="subitem.id">
                            {{subitem.meta.name}}
                        </el-menu-item>
                        </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>
<script>
import {reactive, ref, onMounted, computed} from '@vue/composition-api';
export default {
    name: 'layoutNav',
     setup(props, {root}) {
         /**
          * data数据
          */
        console.log(root.$router)
        const routers = reactive(root.$router.options.routes)
        const isCollapse =  computed( () => root.$store.state.app.isCollapse)
        return {
            routers,
            isCollapse
        }
     }
}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
#nav-wrap {
    // position: fixed;
    width: $navMenu;
    height: 100%;
    background-color: #344a5f;
    transition: all .3s ease 0s;
    @include webkit(transition, all .3s ease 0s);
    svg{
        font-size: 20px;
        margin-right: 10px;
    }
}
.close{
    #nav-wrap{width: $navMenuMin;}
}
.open{
    #nav-wrap{width: $navMenu;}
}
</style>