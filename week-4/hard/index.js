const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/healthy", (req, res)=> res.send("I am Healthy"));

//  start writing your routes here
app.use("/api/users", userRoutes)
app.use("/api/todos", todoRoutes)

app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));

