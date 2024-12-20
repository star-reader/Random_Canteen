type Food = {
    id: number,
    canteen: string,
    name: string,
    tag: string,
    ranking: number,
    queue: number,
    picaddress: string,
    users: string | null
}

type UserHistory = {
    time: Date | string,
    username: string,
    canteen: string,
    food_id: number,
    ranking: number | undefined
}

type UserMoment = {
    id: string,
    username?: string,
    food_id: number,
    canteen: string,
    title: string,
    content: string,
    picaddress: string | undefined,
    ranking: number,
    queue: number,
    tags: string,
    time: Date | string
}

type UserInfo = {
    username: string,
    canteens: string,
    avatar: null | string,
    preference: string | null
}


// 自定义的随机规则，如选择最近的食堂、无需排队、优先评分高、不吃已经选过的等
type selfRule = {
    nearest: false | string, //如果不需要传入false，否则传入食堂名称
    noCurrent: false | string,
    queue: boolean,
    ranking: boolean,
    noRecent: boolean
}