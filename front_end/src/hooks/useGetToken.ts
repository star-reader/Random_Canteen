import api from "@/config/api/api";
import router from "@/router";
import { dataDecrypt, dataEncrypt } from "@/utils/crypto";
import getHourOffset from "@/utils/getHourOffset";
import randomString from "@/utils/randomString";
import axios from "axios";

interface LoginCert {
    username: string,
    password: string,
    seed: string
}


export default () => {
    const _cert = localStorage.getItem('cert')
    if (!_cert) {
        return router.push('/login')
    }else{
        let cert: LoginCert
        try {
            cert = JSON.parse(dataDecrypt(_cert))
        } catch (error) {
            return router.push('/login')
        }
        const keyPairId = randomString(12)
        const key = dataEncrypt(keyPairId)
        const offset = getHourOffset()
        axios.post(api.login,{
            username: cert.username,
            password: cert.password,
            'key-pair-id': keyPairId,
            key, offset
        }).then(res => {
            const userData = res.data.data
            const token = res.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('userData', JSON.stringify(userData))
            // router.push('/index')
        }).catch(_ => router.push('/login'))
    }
}