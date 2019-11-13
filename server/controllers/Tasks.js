const mongoose = require('mongoose');
const Task = mongoose.model('Task');
//add mongoose validations inside create and update routes
//var let in both functions

// console.log("We have an error!", err);
            // // adjust the code below as needed to create a flash message with the tag and content you would like
            // for (var key in err.errors) {
            //     req.flash('registration', err.errors[key].message);
            // }

module.exports = {
    index: (req, res) => {
        Task.find()
            .then(allTasks => {
                console.log('*'.repeat(25), "All Tasks", '*'.repeat(25));
                console.log(allTasks);
                console.log('*'.repeat(25), "All Tasks", '*'.repeat(25));
                res.json({
                    status: true,
                    allTasks: allTasks
                })
            })
            .catch(err => {
                console.log('*'.repeat(25), "All Errors", '*'.repeat(25));
                console.log(err);
                console.log('*'.repeat(25), "All Errors", '*'.repeat(25));
                res.json({
                    status: false,
                    errors: err
                });
            })
    },
    addTask: (req, res) => {
        // var err = [];
        // for (var key in err.errors) {
        //     err.push(err.err[key].message);
        // }
        console.log("*"*30,req.body);
        Task.create(req.body)
            .then(addedTask => res.json({
                status: true,
                addedTask:addedTask
            }))
            .catch(err => res.json({
                status: false,
                err:err
            }))
    },
    find: (req, res) => {
        const {
            id
        } = req.params
        
        Task.findOne({
                _id: id
            })
            
            .then(oneTask => res.json({
                status: true,
                oneTask: oneTask
            }))
            .catch(err => res.json({
                status: false,
                err: err
            }))
    },
    update: (req, res) => {
        const {
            id
        } = req.params
        const task = Task.find({
            _id: id
        })
        task.update({
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed
            })
            .then(updatedTask => res.json(updatedTask))
            .catch(err => res.json({
                err: err
            }))
    },
    delete: (req, res) => {
        const {
            id
        } = req.params
        Task.deleteOne({
                _id: id
            })
            .then(result => res.json({
                status: true
            }))
            .catch(err => res.json({
                status:true,
                err: err
            }))
    }
}