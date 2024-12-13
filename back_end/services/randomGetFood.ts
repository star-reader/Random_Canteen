import type { Food, selfRule, UserHistory } from "../models/types";

export default (food: Food[], selfRule: selfRule , history?: UserHistory[]) => {
    let filteredFood: Food[] = []
    filteredFood = food
    if (selfRule && Object.keys(selfRule).length > 0){
        if (selfRule.nearest){
            // 从最近的食堂中筛选
            filteredFood = food.filter(item => item.canteen === selfRule.nearest)
        }
        if (selfRule.noCurrent && 
            (!selfRule.preferCanteen || selfRule.preferCanteen === '不限')
        ){
            filteredFood = food.filter(item => item.canteen !== selfRule.noCurrent)
        }else if (selfRule.preferCanteen && selfRule.preferCanteen !== '不限'){
            // 不吃本区和指定本区只能选一个
            filteredFood = food.filter(item => item.canteen === selfRule.preferCanteen)
        }
        if (selfRule.queue){
            filteredFood = filteredFood.sort((a, b) => a.queue - b.queue)
        }
        if (selfRule.ranking){
            filteredFood = filteredFood.sort((a, b) => a.ranking - b.ranking)
        }
        if (selfRule.noRecent) {
            filteredFood = filteredFood.filter(item => (history?.find(i => i.food_id === item.id)?? true));
        }
    
        // 进行随机数筛选
        if (selfRule.queue || selfRule.ranking){
            // 只从排名前5名的结果里面选
            const length = filteredFood.length >= 15 ? 15 : filteredFood.length
            return filteredFood[Math.floor(Math.random() * length)]
        }
    }
    return filteredFood[Math.floor(Math.random() * filteredFood.length)]
}