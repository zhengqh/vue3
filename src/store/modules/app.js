import { Login } from '@/api/login';
import {setToken, getUsername, setUsername, removeToken, removeUsername} from '@/utils/app';
const state = {
    // 左侧导航栏是否折叠
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    to_ken: '',
    username: getUsername() || ''
}
const mutations = {
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_TOKEN(state,value){
        state.to_ken = value
    },
    SET_USERNAME(state,value){
        state.username = value
    }
}
const actions = {
    login({ commit }, requestData){
        return new Promise((resolve, reject) => {
            Login(requestData)
            .then((response) => {
                let data = response.data.data
                commit('SET_TOKEN',data.token)
                commit('SET_USERNAME',data.username)
                setToken(data.token)
                setUsername(data.username)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    exit({ commit }){
        return new Promise((rosolve, reject) => {
            removeToken()
            removeUsername()
            commit('SET_TOKEN', '')
            commit('SET_USERNAME', '')
            rosolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}