const users = require("../Models/users")
const jwt = require("jsonwebtoken")


exports.register = async (req, res) => {
    const { name, phone, email, password } = req.body
    // console.log(req.body)
    const _user = new users({
        name, email, phone, password
    })
    const eusers = await users.findOne({
        email
    })
    if (!eusers) {
        _user.save().then(newUser => {
            return res.status(201).json({message:"Account Created Successfully"})
        }).
            catch(error => {
                res.status(400).json
                    ({
                        message: "Error occured",
                        error
                    })
            })
    } else {
        res
            .status(400).json({
                message: "user already exist"
            })
    }

}
exports.login = async (req, res) => {
    const {email, password} = req.body

    const eusers = await users.findOne({
        email})
    if (eusers) {
        if(eusers.authenticate(password)){
            const token = jwt.sign({
                id: eusers._id
            },"MyAPPSECRET",{
                expiresIn:"24h"
            })
            return res.status(200).json({
                message:"Login Successful",
                token , isSuccess:true
            })

        }else{
            return res.status(401).json({
                message:"Email or password incorrect"
            })
        }
        
    } else {
        return res.status(404).json({
                message: "user not found please signup"})
    }
    
}
exports.finduser = async (req,res)=>{
    const user = await users.findById(req.id)
    return res.status(200).json({user})
}


