const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../errors/app-error');
const jwt = require('jsonwebtoken');

const {ServerConfig}=require('../../config');
function checkPassword(plainPassword,encryptedPassword){
    try{
        return bcrypt.compareSync(plainPassword,encryptedPassword);
    }catch(error){
        throw new AppError('Password comparison failed',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

function createToken(input){
    try{
        return jwt.sign(input,ServerConfig.JWT_SECRET,{expiresIn:ServerConfig.JWT_EXPIRY});
    }catch(error){
        throw new AppError('Token creation failed',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    checkPassword,
    createToken
};