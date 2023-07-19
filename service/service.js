const User = require('../model/user_model')
const jwt = require("jsonwebtoken");
const ExcelJS = require('exceljs');


exports.user_service =async (req, res) => {
    try {
        const { user_name, user_email, user_password } = req.body
        const data =new User({
            user_name, user_email, user_password

        })
        const user = data.save()
        return user
    } catch (error) {
        console.log(error);
    }
}

exports.user_service_update = async (req, res) => {
    try {
        const { _id } = req.body
        const data = await User.findOne({ _id: _id })
        console.log("data----->", data);

        if (data) {
            const { user_name, user_email, user_password } = req.body

            const data = await User.updateOne({ _id }, {
                user_name, user_email, user_password
            })
            const obj = {
                id: _id,
                user_email: user_email,
                user_password: user_password
            }
            console.log("data======>", obj);
            return obj
        } else {
            console.log("data didn't find");
        }

    } catch (error) {
        console.log(error);
    }
}

exports.getalluser = async (req, res, objController) => {
    let user_name = objController
    console.log('ussser----', user_name.userName);
    let userName = user_name.userName

    var today = new Date()
    var curHr = today.getHours()

    const data = await User.find()
    console.log("data----->", data);
    if (data) {
        if (curHr < 12) {
            const obj = {
                greeting_message: 'Good Morning',
                user_name: userName,
                data: data,
            }
            return obj
        } else if (curHr < 18) {
            const obj = {
                greeting_message: 'Good Afternoon',
                user_name: userName,
                data: data,
            }
            return obj
        } else if (curHr < 21) {
            const obj = {
                greeting_message: 'Good Evening',
                user_name: userName,
                data: data,
            }
            return obj
        } else {
            const obj = {
                greeting_message: 'Good Night',
                user_name: userName,
                data: data,
            }
            return obj
        }

    }
    else {
        console.log("data didn't get");
    }
}

exports.getOneUser = async (req, res) => {
    const { _id } = req.params
    const data = await User.findById({ _id: _id })
    console.log('data', data);
    if (data) {
        const obj = {
            statusCode: 0,
            message: "user data fetched successfully",
            data: data
        }
        return obj
    }
    else {
        const obj = {
            statusCode: 1,
            message: "user data didn't fetch"
        }
        return obj
    }
}

exports.delete_user = async (req, res) => {
    const { id } = req.params;
    console.log("Id--->", id);
    const data = await User.findByIdAndDelete(id)
    console.log("Deleted result--->", data);
    if (data != null) {
        const obj = {
            statusCode: 0,
            message: "user removed successfully"
        }
        return obj
    } else {
        const obj = {
            statusCode: 1,
            message: "user didn't removed"
        }
        return obj
    }
}

exports.login_user = async (req, res) => {
    const { user_email, user_password } = req.body
    try {
        const user_data = await User.findOne({ user_email: user_email, user_password: user_password })
        // console.log("userdata", user_data);

        if (user_data) {
            const username = user_data.user_name
            const role = user_data.role
            console.log("username---->", username);
            let data = {
                username: username,
                role: role
            }
            let secretkey = "xyz"
            const token = jwt.sign(data, secretkey);
            console.log(token);
            const obj = {
                statusCode: 0,
                token: token,
                role: role
            }
            return obj
        } else {
            const obj = {
                statusCode: 1,
                message: "email or password is wrong"
            }
            return obj
        }
    } catch (error) {
        return error

    }


}

exports.updateByToken = async (req, res) => {
    // let user_name=objController
    // console.log('ussser----',user_name);
    try {
        const { _id } = req.params
        const data = await User.findOne({ _id: _id })
        console.log("data----->", data);

        if (data) {
            const { user_name, user_email, user_password } = req.body

            const data = await User.updateOne({ _id }, {
                user_name, user_email, user_password
            })
            const obj = {
                _id: _id,
                user_name: user_name,
                user_email: user_email,
                user_password: user_password
            }
            console.log("data======>", obj);
            return obj
        } else {
            console.log("data didn't find");
        }

    } catch (error) {
        console.log(error);
    }
}

exports.excel_sheet = async (req, res) => {
    const data = await User.find()
    console.log("data", data);

    const workbook = new ExcelJS.Workbook
    const worksheet = workbook.addWorksheet('Sheet 1')

    const header = ['All id', 'User Name', 'User Email', 'User Password', 'User Role'];
    worksheet.addRow(header)

    data.forEach(doc => {
        const rowData = [doc._id, doc.user_name, doc.user_email, doc.user_password, doc.role]
        worksheet.addRow(rowData)
    })

    const writefile = workbook.xlsx.writeFile('data.xlsx')

    if (writefile) {
        const obj = {
            status: 0,
            message: "excelsheet generated successfully",
            data: data
        }
        return obj
    } else {
        const obj = {
            status: 1,
            message: "excelsheet generating failed"
        }
        return obj
    }
}

