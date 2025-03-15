//  start writing your code from here
const express = require('express');
const { Todo } = require("../db"); 
const { authenticateJwt } = require("../middleware/user"); 

const router = express.Router()
router.use(authenticateJwt)

router.post("/", async (req, res) => {
    const createPayload = req.body
    console.log(req.userid)

    if(!createPayload.title){
        return res.status(400).json({
            msg: "You sent the wrong input"
        })
    }

    try {
        const newTodo = new Todo.create({
            title: createPayload.title,
            completed: false,
            userId: req.userId,
        })

        res.status(201).json({
            message: "Todo Created",
            todo: newTodo,
        })
    } catch(error) {
        res.status(500).json({message: "Error creating Todo", error: error.message})
    }
})

router.get("/", async (req, res) => {
    try{
        const todos = await Todo.find({userId: req.userId})

        res.json({
            todos: todos
        })
    } catch(error) {
        res.status(500).json({message: "error fetching todo", error: error.message})
    }
})


router.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatePayload = req.body

    if(typeof updatePayload.completed == 'undefined'){
        return res.status(400).json({
            msg: "You must provide a completed status.",
        });
    }

    try{
        const result = await Todo.updateOne(
            {_id: id },
            { completed: updatePayload.completed }
        )
        res.json({
            message: "Todo marked as completed"
        })
    } catch(error) {
        res.status(500).json({message: "Error updating Todo", error: error.message})
    }
})