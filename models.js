const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: String,
    password: String
});

const User = mongoose.model('user',userSchema);

module.exports.checkPasswordValidity = function (usersPasswordHash, suppliedPassword) {
    return bcrypt.compareSync(suppliedPassword, usersPasswordHash);
};

module.exports.User = User;