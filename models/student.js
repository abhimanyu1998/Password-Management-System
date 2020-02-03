
const mongoose = require('mongoose');
const Schema =mongoose.Schema;

var StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"name field is required"]
    },
    
    email:{
        type:String,
    },
   
    mobile:{
        type:Number,
    },

    password:{
        type:String,
    }

    
    
    
});
const Student = mongoose.model("student", StudentSchema);
module.exports = Student;

// const Student =mongoose.model("student",employeeSchema )
// module.exports =Student;

// mongoose.model('Employee', employeeSchema);// 

