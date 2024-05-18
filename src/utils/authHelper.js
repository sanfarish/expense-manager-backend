require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require("../models/users");

exports.hashPassword = async (pass) => {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(pass, salt);
    return hashedPass;
};

exports.comparePassword = async (email, pass) => {
    const allUsers = await users.findAll();
    const user = allUsers.find(item => item.user_email === email);
    const data = await bcrypt.compare(pass, user.user_password);
    return data;
};

exports.buildToken = async (email) => {
    const allUsers = await users.findAll();
    const user = allUsers.find(item => item.user_email === email);
    const body = { user_id: user.user_id };
    const data = jwt.sign(body, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '24h'});
    return data;
};