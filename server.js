// require('./models/db');

const express = require('express');

const mongoose= require("mongoose");
mongoose.connect('mongodb://localhost:27017/AKGEC', { useNewUrlParser: true }, (err) => {
    if
     (!err) { console.log('MongoDB Connection Succeeded.')}
    else { console.log('Error in DB connection : ' +err) }
});


const bodyparser = require('body-parser');


const studentController = require('./controllers/studentController');

const app = express();

// app.use(bodyparser());
// app.use(bodyparser.urlencoded({
//     extended: true
// }));
app.use(bodyparser.json());


app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/api/student', studentController);

app.use(function(err,req,res,next){
console.log(err);
res.status(422).send({error:err.message})
});
