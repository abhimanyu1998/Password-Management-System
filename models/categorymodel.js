const mongoose = require('mongoose');
const Schema =mongoose.Schema;

var CategorySchema = new mongoose.Schema({
    pass_Category: {
        type: String,
        required:[true,"Category field is required"]
    },
    
   
    password:{
        type:String,
    },

    email:{
        type:String,
    }

    
    
    
});
const Category = mongoose.model("category", CategorySchema);
module.exports = Category;