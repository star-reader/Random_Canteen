import jwt from 'jsonwebtoken'
import publicKey from "../config/jwt/publicKey"
import privateKey from "../config/jwt/privateKey"
import { JWTPayload } from '../models/types';

const jetVerify = async (token: string | undefined): Promise<Boolean | JWTPayload> => {
    return new Promise((resolve, _) =>{
        if (!token) return resolve(false)
        jwt.verify(token, publicKey, (err, decoded) => {
            if (err) return resolve(false)
            return resolve(decoded as JWTPayload)
        })
    })
}


const jwtSign = async (payload: JWTPayload): Promise<string> => {
    return new Promise((resolve, reject) =>{
        jwt.sign(payload, privateKey, { expiresIn: '1h', algorithm: 'RS512' }, (err, token) => {
            if (err) return reject(err)
            return resolve(token as string)
        })
    })
}

export {
    jetVerify,
    jwtSign
}