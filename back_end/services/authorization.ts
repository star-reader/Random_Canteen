import { dataDecrypt, dataEncrypt } from "./crypto"

export default (key: string, keyPairId: string, offset: string) => {
    const encKey = dataEncrypt(keyPairId)
    if (!encKey || encKey != key){
        return false
    }
    try {
        const decOffset = dataDecrypt(offset)
        let item: string[] = decOffset.split('-')
        item.pop()
        const formattedOffset = item.join('-')
        if (!formattedOffset) return false
        //与日期进行校验
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hours = String(now.getHours()).padStart(2, '0')
        let timeArr = [year, month, day, hours]
        if (timeArr.join('-') !== formattedOffset) {
            return false
        }
        return true
    } catch (error) {
        return false
    }
}