const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type:String, required:true },
    description:{ type:String, required:true },
    completed:{ type :Boolean, default: false },
},{ timestamps: true })
mongoose.model('Task', TaskSchema);