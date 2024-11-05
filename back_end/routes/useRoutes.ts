import express from 'express'
import userController from '../controllers/canteenController'

const router = express.Router()
router.get('/testToken', userController.testToken)

export default router