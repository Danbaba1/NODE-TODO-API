const todos = [
    {
      title: "Todo 1",
      desc: "This is my first Todo",
      completed: true,
    },
  
    {
      title: "Todo 2",
      desc: "This is my second Todo",
      completed: true,
    },
  
    {
      title: "Todo 3",
      desc: "This is my third Todo",
      completed: true,
    },
  
    {
      title: "Todo 4",
      desc: "This is my fourth Todo",
      completed: true,
    },
  
    {
      title: "Todo 5",
      desc: "This is my fifth Todo",
      completed: true,
    },
  ];
const router = async (req,res)=>{
    if(req.url === "/api/todos" && req.method === "GET"){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(todos));
    }

    if (req.url.match('^/\api/todos/(\d+)$') && req.method === "GET") {
        try {
            // extract id from url
            const id = req.url.split("/")[3];
     
            // get todo from DB
            const todo = await todos.find((todo) => todo.id === id);
     
            if (todo) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(todo));
            } else {
                throw new Error("Todo does not exist");
            }
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    if (req.url === "/api/todos" && req.method === "POST") {
        try {
            let body = "";
     
            // Listen for data event
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
     
            // Listen for the end event
            req.on("end", async () => {
                // Create a new todo
                await todos.push(JSON.parse(body));
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(todos.slice(-1));
            });
        } catch (error) {
            console.log(error);
        }
    }

    if (req.url.match('/\\\\/api\\\\/todos\\\\/([0-9]+)/') && req.method === "PUT") {
        try {
            // extract id from url
            const id = req.url.split("/")[3];
            let body = "";
     
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
    
            req.on("end", async () => {
                // Find and update document
                const todo = todos.find((todo) => todo.id === id);
    
            if(!todo) throw new Error("Todo does not exist");
    
            // Not the best approach to update arrays :)
            todos[todo] = JSON.parse(body);
     
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(todo));
            });
        } catch (error) {
            console.log(error);
        }
    }

    if (req.url.match('/\\\\/api\\\\/todos\\\\/([0-9]+)/') && req.method === "DELETE") {
        try {
            const id = req.url.split("/")[3];
            
           // Delete todo from DB
    
        const todoIndex = todos.findIndex((todo) => (todo.id = id));
        if(!todoIndex) throw new Error("Todo does not exist");
                    
            todos.splice(todoIndex, 1);
    
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Todo deleted successfully" }));
    
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }
}

module.exports = router;