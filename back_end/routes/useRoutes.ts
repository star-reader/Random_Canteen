import express from 'express'
import userController from '../controllers/canteenController'

const router = express.Router()
router.get('/1', userController.getAllUsers)

export default router