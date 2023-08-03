const { user_service,
    getone_img,
    getallimg,
    user_service_update,
    getalluser,
    getOneUser,
    delete_user,
    login_user,
    updateByToken,
    excel_sheet } = require('../service/service')

exports.user_add = async (req, res) => {
    const user=req.user;
    const add = await user_service(req, res,user)
    try {
        if (add) {
            res.status(200).json({
                message: 'User data added',
                data: add.data
            })
        } else {
            res.status(500).json({
                message: "user didn't added"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

exports.getone_img= async(req,res)=>{
    const getimg=await getone_img(req,res)
    try {
        if (getimg.statusCode === 0) {
            // console.log(getimg.image);
            res.set('Content-Type',getimg.image.contentType)
            res.send(getimg.image.data)
        }else{
            res.status(200).json({
                status:getimg.statusCode,
                message:getimg.message
            })
        }
    } catch (error) {
        res.status(200).json({
            message: "Didn't get image",
            error: error
        })
    }
}

exports.user_update = async (req, res) => {
    const update = await user_service_update(req, res)
    try {
        if (update) {
            res.status(200).json({
                message: 'user updated',
                updated_data: update
            })
        } else {
            res.status(500).json({
                message: "user didn't updated"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

exports.all_user = async (req, res) => {
    const userName = req.userName
    console.log('>>>>>>',userName);
    let objController={
        userName
    }
    const getaAll = await getalluser(req, res,objController)
    try {
        if (getaAll) {
            res.status(200).json({
                message: 'All user get',
                updated_data: getaAll
            })
        } else {
            res.status(500).json({
                message: "User didn't get"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

exports.getone_user = async (req, res) => {
    const getone = await getOneUser(req, res)
    try {
        if (getone.statusCode == 0) {
            res.status(200).json({
                statusCode: getone.statusCode,
                message: getone.message,
                getdata: getone.data
            })
        } else if (getone.statusCode == 1) {
            res.status(200).json({
                statusCode: getone.statusCode,
                message: getone.message
            })
        }
    } catch (error) {
        res.status(200).json({
            message: "User data didn't get",
            error: error
        })
    }
}

exports.user_delete = async (req, res) => {
    const delet = await delete_user(req, res)
    try {
        if (delet.statusCode == 0) {
            res.status(200).json({
                statusCode: delet.statusCode,
                message: delet.message
            })
        } else if (delet.statusCode == 1) {
            res.status(500).json({
                statusCode: delet.statusCode,
                message: delet.message
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

exports.user_login = async (req, res) => {
    const login = await login_user(req, res)
    try {
        if (login.statusCode == 0) {
            res.status(200).json({
                Message: 'User login Successfull',
                Data: login
            })
        } else if (login.statusCode == 1) {
            res.status(500).json({
                message: 'User login Unsuccessfull',
                error_message: login
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

exports.updatedByToken = async (req, res) => {
    console.log("inside updatedbytoken");
    const userName = req.userName

    // let objController={
    //     userName
    // }

    const updatedData = await updateByToken(req, res)
    try {
        if (updatedData) {
            res.status(200).json({
                message: 'user updated',
                updated_data: updatedData
            })
        } else {
            res.status(500).json({
                message: "user didn't updated"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

exports.excelsheet = async (req,res)=>{
    const exce=await excel_sheet(req,res)
    try {
        if (exce.status==0) {
            res.status(200).json({
                status:exce.status,
                message:exce.message,
                data:exce.data
            })
        }else if(exce.status==1){
            res.status(200).json({
                status:exce.status,
                message:exce.message
            })
        }
    } catch (error) {
        
    }
}




