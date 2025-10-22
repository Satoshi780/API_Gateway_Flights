const {StatusCodes}=require('http-status-codes');
const {UserService}=require('../services');
const AppError=require('../utils/errors/app-error');
const { SuccessResponse,ErrorResponse} = require('../utils/common');



/**
 * POST :/signup
 * req-body : {email,password}
 */

async function signup(req,res,next){
    try{
        const user=await UserService.create({
            email:req.body.email,
            password:req.body.password
        });
        SuccessResponse.data=user;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse); 
    }
}

async function signin(req,res,next){
    try{
        const jwt=await UserService.signin({
            email:req.body.email,
            password:req.body.password
        });
        SuccessResponse.data={token:jwt};
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

module.exports={
    signup,
    signin
};