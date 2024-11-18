import api from "@/config/api/api";
import router from "@/router";
import { dataDecrypt } from "@/utils/crypto";
import axios from "axios";

export default () => {
    const _cert = localStorage.getItem('cert')
    if (!_cert) {
        return router.push('/login')
    }else{
        let cert: any
        try {
            cert = JSON.parse(dataDecrypt(_cert))
        } catch (error) {
            return router.push('/login')
        }
        axios.post(api.login,{
            username: cert.username,
            password: cert.password
        }).then(res => {
            const userData = res.data.data
            const token = res.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('userData', JSON.stringify(userData))
            // router.push('/index')
        }).catch(_ => router.push('/login'))
    }
}