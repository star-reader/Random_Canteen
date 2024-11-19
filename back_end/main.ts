process.title = 'random_canteen_backend'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mysql from 'mysql'
import router from './routes/useRoutes'
import mysqlConfig from './config/mysql/mysql'

const app = express()
// app.use(cors({
//     'origin': 'https://food.scauaie.cn,https://usagi-jin.top,http://localhost:5173'
// }))
app.use(bodyParser.json())
app.use('/canteen', router)

// 全局保存在main下，在对应getPool函数中判断pool
let pool:mysql.Pool = mysql.createPool(mysqlConfig)
const getPool = () => pool


const SERVER_PORT = 8041
const MAX_LOAD_PRE_PAGE = 10

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`)
    getPool()
})

export { getPool, MAX_LOAD_PRE_PAGE }