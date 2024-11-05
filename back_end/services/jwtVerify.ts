import jwt, { JwtPayload } from 'jsonwebtoken'
import publicKey from "../config/jwt/publicKey"
import privateKey from "../config/jwt/privateKey"

const jetVerify = async (token: string | undefined): Promise<Boolean | JwtPayload> => {
    return new Promise((resolve, _) =>{
        if (!token) return resolve(false)
        jwt.verify(token, publicKey, (err, decoded) => {
            if (err) return resolve(false)
            return resolve(decoded as JwtPayload)
        })
    })
}


const jwtSign = async (payload: JwtPayload): Promise<string> => {
    return new Promise((resolve, reject) =>{
        jwt.sign(payload, privateKey, { expiresIn: '1h' }, (err, token) => {
            if (err) return reject(err)
            return resolve(token as string)
        })
    })
}

export default {
    jetVerify,
    jwtSign
}