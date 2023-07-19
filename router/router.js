const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')
const { jwtToken } = require('../middleware')
const multer = require('multer');
const fs=require('fs')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/user_register',controller.user_add)
router.post('/user_add',jwtToken,upload.single('image'),controller.user_add)
router.put('/user_update',controller.user_update)
router.get('/getall',jwtToken,controller.all_user)
router.get('/getone/:_id',jwtToken,controller.getone_user)
router.delete('/user_delete/:id',jwtToken,controller.user_delete)
router.post('/login', controller.user_login)
router.put('/updatebyToken/:_id', jwtToken,controller.updatedByToken)
router.get('/excelsheet',controller.excelsheet)

module.exports = router