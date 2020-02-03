
const express = require('express');
var router = express.Router();
const Student = require("../models/student")
const Category =require("../models/categorymodel")
// const mongoose = require('mongoose');
// const Employee = mongoose.model('Employee');


// const Student = require("../models/employee.model")




router.get('/', (req, res) => {
    res.send({
        type:"GET"
    });
        
    });


router.post('/register', function(req, res,next){
    Student.create(req.body).then(function(student){
        res.send(student);
        
    }).catch(next);
   
});



router.post("/login", function(req, res, next){
    var name = req.body.name;
    var password = req.body.password;
   
    Student.findOne({password : password , name : name})
    .then(user =>{
        if(user)
        {
              res.send(user)
        }else
        {
            
                res.send("No user Exist");
        }

    }).catch(err =>{
        console.log(err);
    });
})



router.delete('/:id', (req, res) => {
    Student.findByIdAndRemove({_id:req.params.id}).then(function(student){
    
    res.send(student);
        
    });

});

router.put('/:id', (req, res) => {
    Student.findByIdAndUpdate({_id:req.params.id},req.body).then(function(student){
        Student.findOne({_id:req.params.id}).then(function(student){
            res.send(student);
        })
    });
        
    });
    




router.post("/register/category",(req, res, next)=>{
    var email = req.body.email;
    Student.findOne({email : email})
    .then(user =>{
        if(user)
        {
            Category.create(req.body).then(function(category){
                res.send(category);
        })
    }  else
        {
            
                res.send("No user Exist");
        }

    }).catch(err =>{
        console.log(err);
    });
    // Category.create(req.body).then(function(category){
    //     res.send(category);
    // })

})

router.put('/category/update/:id', (req, res) => {
    Category.findByIdAndUpdate({_id:req.params.id},req.body).then(function(category){
        Category.findOne({_id:req.params.id}).then(function(category){
            res.send(category);
        })
    });
        
    });


    router.delete('/category/delete/:id', (req, res) => {
       Category.findByIdAndRemove({_id:req.params.id}).then(function(category){
        
        res.send(category);
            
        });
    
    });



    router.get('/list/:id', (req, res) => {
        Student.findOne({_id:req.params.id})
       
        .then(user =>{
                if(user)
                {

                    var MongoClient = require('mongodb').MongoClient;
                    var url = "mongodb://localhost:27017/";
                   
                    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
                      if (err) throw err;
                      var dbo = db.db("AKGEC");
                      var email =user.email;
                      console.log(email);
                      var query = { email: email};
                      dbo.collection("categories").find(query).toArray(function(err, result) {
                        if (err) throw err;
                        
                        res.send(result);
                        res.send();
                        db.close();
                      });
                    });
                            
                    }else
                {
                    
                        res.send("No user Exist");
                }
        
            }).catch(err =>{
                console.log(err);
            });
        
        });
    

       

    // Employee.find((err, docs) => {
    //     if (!err) {
    //         res.render("employee/list", {
    //             list: docs

    //         });
    //     }
    //     else {
    //         console.log('Error in retrieving employee list :' + err);
    //     }
    // });

   





    module.exports = router;
