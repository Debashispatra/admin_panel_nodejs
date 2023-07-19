const jwt = require("jsonwebtoken");

exports.jwtToken = (req, res, next) => {
    const token = req.headers["authorization"]

    console.log(`-token- ${token}`);

    if (!token) {
        console.log(`Token Error - no token`);
        return res.status(200).json({
            status: 1,
            dataObj: {
                responseMessage: "Token Error - no token",
            },
        });
    }
    const decoded = jwt.decode(token, {
        complete: true
    })

    const userName = decoded.payload.username
    const role = decoded.payload.role

    console.log("username", userName);
    console.log("role", role);
    if (!userName) {
        console.log(`No username found`);
        return res.status(200).json({
            status: 1,
            dataObj: {
                responseMessage: "No username found",
            },
        });
    } else if (role == 1) {
        req.userName = userName
        next()
    } else {
        return res.status(200).json({
            status: 1,
            dataObj: {
                responseMessage: "You are not a admin",
            },
        });
    }

    req.role = role

}