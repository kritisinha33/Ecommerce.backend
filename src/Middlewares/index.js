const jwt = require ("jsonwebtoken")
const{check} = require ("express-validator")
const{validationResult} = require("express-validator")

exports.verifyToken = (req,res,next) =>{
    try{
        const token = req.headers.authorization
        console.log(token);
        if(token){
            const data = jwt.verify(token,"MYAPPSECRET")
            const{id} = data;
            console.log(id);
            req.id = id;
            next();
        }else{
            return res.status(401).json({message:"Token is Missing"})
        }
    }catch (err){
        return res.status(401).json({err})
    }
}

exports.validateForm = [
    check("name").notEmpty().withMessage("Please Enter Name"),
    check("phoneNumber").isMobilePhone().withMessage("Please Enter Number"),
    check("email").isEmail().withMessage("Please Enter valid Email ID"),
    check("intrest").notEmpty().withMessage("Please Enter Intrest"),
    check("message").isLength({max:100,min:1}).withMessage("Please Enter within 100 character")
]

exports.isValidated = (req,res,next) =>{
 const errors = validationResult(req)
 if(errors.array().length > 0){
   return res.status(400).json({message:errors.array()[0]})
 }
 next()
}