import express from 'express'
import userController from '../controllers/canteenController'

const router = express.Router()
router.get('/testToken', userController.testToken)
router.get('/getAllFoods', userController.getAllFoods)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/randomMeal', userController.randomMeal)
router.get('/getDataByCanteen', userController.getDataByCanteen)
router.get('/getMoments', userController.getMoments)
router.post('/uploadMoments', userController.uploadMoments)
router.post('/updatePreference', userController.updatePreference)
router.post('/uploadHistory', userController.uploadHistory)
router.get('/getHistory', userController.getHistory)
router.get('/getFoodById', userController.getFoodById)

export default router