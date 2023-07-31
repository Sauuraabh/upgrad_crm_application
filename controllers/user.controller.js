const User = require('../models/user.model');
const objectConverter = require('../utils/objectConverter');

exports.findAll = async (req, res) => {
    const users = await User.find({});

    //only engineers or customer
    //query String
    //userType and userStatus

    res.status(200).send(objectConverter.userResponse(users));
}

exports.update = async (req, res) => {
    
}