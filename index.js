const express = require("express")
const mongoose = require("mongoose")
require ('dotenv').config()
const user = require("./src/Models/users")
const { register,login, finduser, updateUser } = require("./src/controllers/users")


const http = require("http")
const {Server} = require("socket.io")
const server = express()
const app = http.createServer(server)

const io = new Server(app)

const cors = require("cors")
const { verifyToken, validateForm, isValidated } = require("./src/Middlewares")
const { addForm } = require("./src/controllers/Form")
const { sendEmail } = require("./src/Helper/Email")


server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
    res.status(200).json({
        uname: "Kriti",
        uphone: "4883838"
    })
})
server.post("/register", register,sendEmail)
server.post("/login",login)
server.post("/addForm",validateForm,isValidated,addForm);
server.put("/updateUser",verifyToken,updateUser);
server.get("/get-product/:id",(req,res)=>{
    res.send(req.params.id)
})

server.get("/get-user",verifyToken,finduser,updateUser)

io.on("connection",socket=>{
    console.log("new user connected");
   socket.on("message",(message,room) =>{
    console.log(` new message recieved in ${room} and message is ${message}`);
    socket.to(room).emit("message",message)
   })
   socket.on("join",(room)=>{
    console.log(room)
    socket.join(room)
    socket.emit("joined")
   })
})
const port = process.env.PORT ;

app.listen(port, () => {
    console.log("server started")
})
const mongodb =process.env.MONGODB_url
mongoose.connect(`mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASS}@ac-6rlxssb-shard-00-00.asoxiru.mongodb.net:27017,ac-6rlxssb-shard-00-01.asoxiru.mongodb.net:27017,ac-6rlxssb-shard-00-02.asoxiru.mongodb.net:27017/?ssl=true&replicaSet=atlas-cviqqs-shard-0&authSource=admin&retryWrites=true&w=majority`)
    .then(data => console.log("Database Connected"))
    .catch(error => console.log(error))



