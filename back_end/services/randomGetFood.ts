import type { Food, selfRule, UserHistory } from "../models/types";

export default (food: Food[], selfRule: selfRule , history?: UserHistory[]) => {
    let filteredFood: Food[] = []
    if (selfRule && Object.keys(selfRule).length > 0){
        if (selfRule.nearest){
            // 从最近的食堂中筛选
            filteredFood = food.filter(item => item.canteen === selfRule.nearest)
        }
        if (selfRule.noCurrent){
            filteredFood = food.filter(item => item.canteen !== selfRule.noCurrent)
        }
        if (selfRule.queue){
            filteredFood = filteredFood.sort((a, b) => a.queue - b.queue)
        }
        if (selfRule.ranking){
            filteredFood = filteredFood.sort((a, b) => a.ranking - b.ranking)
        }
        if (selfRule.noRecent){
            filteredFood = filteredFood.filter(item => history?.find(i => i.food_id === item.id) === undefined)
        }
    
        // 进行随机数筛选
        if (selfRule.queue){
            // 只从排名前5名的结果里面选
            return filteredFood[Math.floor(Math.random() * 5)]
        }
        if (selfRule.ranking){
            // 只从排名前10名的结果里面选
            return filteredFood[Math.floor(Math.random() * 10)]
        }
    }else{
        filteredFood = food
    }
    return filteredFood[Math.floor(Math.random() * filteredFood.length)]
}