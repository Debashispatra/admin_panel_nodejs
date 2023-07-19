const mongoose = require('mongoose');


let mongoConnect = mongoose.connect("mongodb://localhost:27017/crud");




module.exports = mongoConnect;
