import express from 'express'
import userController from '../controllers/canteenController'

const router = express.Router()
router.get('/', userController.getAllUsers)

export default router