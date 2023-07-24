const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const constants = require('../utils/constants');

exports.signup = async (req, res) => {
    const hashPassword = bcrypt.hashSync(req.body.password, 8);

    var userStatus = req.body.userStatus;

    if (!userStatus) {
        if (req.body.userType == constants.userTypes.customer) {
            userStatus = constants.userStatus.approved;
        } else {
            userStatus = constants.userStatus.pending;
        }
    }
    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        password: hashPassword,
        userType: req.body.userType,
        userStatus: userStatus,
    }
    try {
        const userCreated = await User.create(userObj);
        const postResponse = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            userStatus: userCreated.userStatus,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        }
        res.status(201).send(postResponse);
    } catch (err) {
        console.log(`Error while inserting user ${err}`);
        res.status(500).send({
            message: `Some internal error while registration`
        });
    }
}