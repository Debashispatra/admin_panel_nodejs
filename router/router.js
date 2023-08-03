const express = require('express')
const router = express.Router()
const User = require('../model/user_model')
const controller = require('../controller/controller')
const { jwtToken } = require('../middleware')
const multer = require('multer');
const fs=require('fs')
const path=require('path')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)      //file.originalname is used to name the file to be stored
                                        //you can give any file name with extension must
    }
});
const upload = multer({ storage: storage });

router.post('/user_register',controller.user_add)
router.post('/user_add',jwtToken,upload.single('image'),async(req,res,next)=>{
    try {
        const { user_name, user_email, user_password } = req.body
        const data =new User({
            user_name, user_email, user_password,
            imageData:{
                data:fs.readFileSync(path.join(__dirname ,'..','/uploads/' +  req.file.filename)),
                contentType:req.file.mimetype
            }

        })
        const user = await data.save()
        req.user=user
        // console.log(".....",req.user);
        next()
        // return user
    } catch (error) {
        console.log(error);
    }
},controller.user_add)
router.get('/getoneimg/:_id',controller.getone_img)
router.put('/user_update',controller.user_update)
router.get('/getall',jwtToken,controller.all_user)
router.get('/getone/:_id',jwtToken,controller.getone_user)
router.delete('/user_delete/:id',jwtToken,controller.user_delete)
router.post('/login', controller.user_login)
router.put('/updatebyToken/:_id', jwtToken,controller.updatedByToken)
router.get('/excelsheet',controller.excelsheet)

module.exports = router