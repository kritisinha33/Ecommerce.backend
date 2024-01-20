const express = require("express")
const mongoose = require("mongoose")
const user = require("./src/Models/users")
const { register,login, finduser } = require("./src/controllers/users")


const http = require("http")
const {Server} = require("socket.io")
const server = express()
const app = http.createServer(server)

const io = new Server(app)

const cors = require("cors")
const { verifyToken, validateForm, isValidated } = require("./src/Middlewares")
const { addForm } = require("./src/controllers/Form")


server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
    res.status(200).json({
        uname: "Kriti",
        uphone: "4883838"
    })
})
server.post("/register", register)
server.post("/login",login)
server.post("/addForm",validateForm,isValidated,addForm);


server.get("/get-user",verifyToken,finduser)

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

app.listen("3000", () => {
    console.log("server started")
})
mongoose.connect("mongodb://localhost:27017")
    .then(data => console.log("Database Connected"))
    .catch(error => console.log("Error"))



