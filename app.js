const express=require("express")
const ejs=require('ejs')
const app=express()
const http=require("http")
const socketio=require("socket.io")
const server=http.createServer(app)
const io=socketio(server)
const path=require("path")

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location", {id:socket.id, ...data})
    })
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id)
    })
})

app.get("/", (req,res)=>{
    res.render("index")
})


server.listen(5345)