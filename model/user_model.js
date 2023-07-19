const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;

const adminSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    user_name: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    },
    user_password: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        default:0,
    },
    imageData:{
        imageData: Buffer
        
    }
});

const User = mongoose.model("user", adminSchema);

module.exports = User;