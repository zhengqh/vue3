import router from "./index";
import store from '@/store/index'
import {getToken, removeToken, removeUsername} from '@/utils/app'

const whiteRouter = ['/login'];
router.beforeEach((to, from, next) => {
    console.log(to)
    if( getToken() ){
        if(to.path === '/login'){
            removeToken()
            removeUsername()
            store.commit('app/SET_TOKEN', '')
            store.commit('SET_USERNAME', '')
            next()
        }else{
            next()
        }
    }else{
        console.log('不存在')
        if(whiteRouter.indexOf(to.path) !== -1){
            next()
        }else{
            next('/login')
        }
    }
})