<template>
    <div>
        <el-container :class="menuStatus === true? 'close' : 'open'">
            <el-aside width="none">
                <LayoutNav />
            </el-aside>
            <el-container>
                <el-header>
                    <LayoutHeader />
                </el-header>
                <el-main>
                    <LayoutMain />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import LayoutHeader from './Component/Header'
import LayoutNav from './Component/Nav'
import LayoutMain from './Component/Main'
import { computed } from '@vue/composition-api'
export default {
    name: 'layout',
    components: {LayoutHeader, LayoutNav, LayoutMain},
    computed: {
        menuStatus() {
            return this.$store.state.app.isCollapse
        }
    }
}
</script>
<style lang="scss" scoped>

</style>