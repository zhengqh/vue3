import { reactive } from "@vue/composition-api";
import { GetCategory } from '@/api/info'
export function common() {
    const categoryItem = reactive({
        item: []
    })
    /**
     * 获取分类
     */
    const getInfoCategory = () => {
        GetCategory({}).then(response => {
            let responseData = response.data.data.data
            categoryItem.item = responseData
            // console.log(response.data.data.data)
        }).catch(error => {})
    }
    return {
        categoryItem,
        getInfoCategory
    }
}