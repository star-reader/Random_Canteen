type JWTPayload = {
    'iss': 'https://api.starjin.top/users',
    'aud': 'https://api.starjin.top/users/endpoint',
    'username': string,
    'scope': string[],
    'amr': ['openid', 'name'],
    'jid': string
}


type Food = {
    id: number,
    canteen: string,
    tag: string,
    ranking: number,
    picaddress: string,
    users: string | undefined
}

type UserHistory = {
    time: Date | string,
    username: string,
    canteen: string,
    food: string,
    ranking: number | undefined
}

type UserMoment = {
    username: string,
    food_id: number,
    canteen: string
    title: string,
    content: string,
    picaddress: string | undefined,
    ranking: number,
    tags: string[]
}

export type { 
    JWTPayload , Food, UserHistory, UserMoment
}