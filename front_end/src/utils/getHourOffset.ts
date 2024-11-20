import { dataEncrypt } from "./crypto"
import randomString from "./randomString"

export default () => {
    // 格式为当前年月日-小时-随机数的加密字符串，后端校验
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const offset = randomString(8)

    return dataEncrypt(`${year}-${month}-${day}-${hours}-${offset}`)
}