import { GetCategory } from '@/api/info'
export default {
    install(Vue){
        Vue.prototype.getInfoCategory = () => {
            GetCategory({}).then(response => {
                console.log(response)
            }).catch(error => {

            })
        }
    }
}