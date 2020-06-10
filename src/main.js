import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueCompositionApi from '@vue/composition-api';
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引用自定义全局方法 vue的插件install方法
// import global from '@/utils/global'
import common from '@/api/common'
// 引入路由导航守卫
import './router/premit'
//自定义全局组件
import './icons'

Vue.config.productionTip = false;
// Vue.use(global)
Vue.use(common)
Vue.use(VueCompositionApi);
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");