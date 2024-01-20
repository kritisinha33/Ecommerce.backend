const Form = require("../Models/Form")
exports.addForm = async (req,res) =>{
 try {
    const _form = new Form(req.body);
    
    await  _form.save()
   return res.status(201).json({message:"Your Form is submitted"})
 } catch (error) {
    res.status(400).json({message:"Error Occured"})
 }   
}