import jwt from 'jsonwebtoken'
// import publicKey from "../config/jwt/publicKey"
// import privateKey from "../config/jwt/privateKey"
import { JWTPayload } from '../models/types';

const jwtKey = 'Gts76GBycy8gTFbnvt87YVBE7cyl972yt6dfdvYyg'

const jwtVerify = async (token: string | undefined): Promise<JWTPayload> => {
    return new Promise((resolve, reject) =>{
        if (!token) return reject(false)
        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) return reject(false)
            return resolve(decoded as JWTPayload)
        })
    })
}


const jwtSign = async (payload: JWTPayload): Promise<string> => {
    return new Promise((resolve, reject) =>{
        jwt.sign(payload, jwtKey, { expiresIn: '1h' }, (err, token) => {
            if (err) return reject(err)
            return resolve(token as string)
        })
    })
}

export {
    jwtVerify,
    jwtSign
}