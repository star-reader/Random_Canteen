process.title = 'random_canteen_backend'

import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

const SERVER_PORT = 8041


app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`)
})