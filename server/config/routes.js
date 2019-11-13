const controller = require('./../controllers/Tasks');
module.exports = (app) => {
    app.get('/tasks', controller.index)
    //show one
    app.get('/tasks/:id', controller.find)
    //create a task by id
    app.post('/tasks', controller.addTask)
    //update a task by id
    app.put('/tasks/:id', controller.update)
    //delete a task by id
    app.delete('/tasks/:id', controller.delete)
}