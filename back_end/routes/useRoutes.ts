import express from 'express'
import userController from '../controllers/canteenController'

const router = express.Router()
router.get('/testToken', userController.testToken)
router.get('/getAllFoods', userController.getAllFoods)

export default router