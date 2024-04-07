const http = require("http");
const router = require("./routes.js");


const server = http.createServer((req,res)=>{
    router(req,res);
});



server.listen(3000, ()=>{
    console.log("Server is running")
});