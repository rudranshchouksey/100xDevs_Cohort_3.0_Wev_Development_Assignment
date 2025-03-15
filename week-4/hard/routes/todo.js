const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const { Todo } = require("../database/index")
const router = Router();

// todo Routes
router.post('/', (req, res) => {
    // Implement todo creation logic
    const { title, description, status, createBy } = req.body

    const newTodo = new Todo({
        title,
        description,
        status,
        createBy
    })
    newTodo.save()
    .then(todo =>  res.status(201).json({message: "Todo created successfully", todo}))
    .catch((err) => res.status(500).json({message: "Error creating todo", error: err.message}))
});

router.put('/:id', adminMiddleware, (req, res) => {
    // Implement update todo  logic
    const { id } = req.params
    const updateData = req.body

    Todo.findByIdAndUpdate(id, updateData, {new: true})
        .then(updateTodo => {
            if(!updateTodo) return res.status(404).json({message: 'Todo not found'})
            res.json({ message: "Todo updated successfully", todo: updateTodo})    
        })
        .catch(err => res.status(400).json({message: 'Error updating todo', error: err.message}))
});

router.delete('/', adminMiddleware, (req, res) => {
    // Implement delete todo logic
    Todo.deleteMany({})
        .then(() => res.json({ message: "All todos deleted successfully "}))
        .catch(err => res.status(400).json({ message: 'Error deleting todos', error: err.message }))
});

router.delete('/:id', adminMiddleware, (req, res) => {
    // Implement delete todo by id logic
    const { id } = req.params

    Todo.findByIdAndDelete(id)
        .then(deletedTodo => {
            if (!deletedTodo) return res.status(404).json({ message: "Todo not found" })
            res.json({ message: 'Todo deleted successfull', todo: deletedTodo})
        })
        .catch(err => res.status(400).json({ message: 'Error deleting todo', error: err.message}))
});


router.get('/', adminMiddleware, (req, res) => {
    // Implement fetching all todo logic
    Todo.find()
        .then(todos => res.json({ todos }))
        .catch(err => res.status(400).json({ message: "Error fetching todos", error: err.message }))
});

router.get('/:id', adminMiddleware, (req, res) => {
    // Implement fetching todo by id logic
    const { id } = req.params

    Todo.findById(id)
        .then(todo => {
            if (!todo) return res.status(404).json({ message: 'Todo not found' })
                res.json({ todo })
        })
        .catch(err => res.status(400).json({ message: 'Error fetching todo', error: err.message }))
});

module.exports = router;