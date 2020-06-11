import { GetCategory } from '@/api/info'
const actions = {
    getInfoCategory(content,request){
        return new Promise((resolve,reject) => {
            GetCategory({}).then(response => {
                resolve(response.data.data.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default{
    namespaced: true,
    actions
}