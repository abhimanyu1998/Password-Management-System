const express = require('express');
// var cookieParser = require('cookie-parser');
var router = express.Router();
const Student = require("../models/student")
const Category = require("../models/categorymodel")
const bodyParser = require('body-parser');


const app = express();
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat'
}))



// const app = express();
// const mongoose = require('mongoose');
// const Employee = mongoose.model('Employee');


// const Student = require("../models/employee.model")

var sess;


router.get('/', (req, res) => {

    sess = (req.session = {});

    if (sess.email) {

        console.log("in sess email")
        return res.redirect('/admin');
    }

    // res.send({
    //     type:"GET"
    // });

});

router.get('/admin', (req, res) => {
    sess = (req.session = {});
    if (sess.email) {
        res.write(`<h1>Hello ${sess.email} </h1><br>`);
        //     res.end('<a href='+'/logout'+'>Logout</a>');
    } else {
        res.write('<h1>Please login first.</h1>');
        // res.end('<a href='+'/'+'>Login</a>');
    }
});


router.post('/register', function (req, res, next) {
    Student.create(req.body).then(function (student) {
        res.send(student);

    }).catch(next);

});



router.post("/login", function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    Student.findOne({
            password: password,
            email: email
        })
        .then(user => {
            if (user) {
                // sess=req.session;
                sess = (req.session = {});
                sess.email = req.body.email;
                res.send(user)
                console.log(sess.id);
                // console.log("Session Id:"+sess.id);
            } else {
                res.send("No user Exist");
            }

        }).catch(err => {
            console.log(err);
        });
})


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});

router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    Student.findOne({
            _id: req.params.id
        })
        .then(user => {
            console.log(user.email);
            if (user) {
                var MongoClient = require('mongodb').MongoClient;
                var url = "mongodb://localhost:27017/"
                MongoClient.connect(url, {
                   useNewUrlParser: true
                }, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("AKGEC");
                    var email = user.email;
                    var query = {
                        email: email
                    };
                    dbo.collection("categories").deleteMany(query)
                        .then(result => {
                            res.status(200).send(result);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(501);
                        });
                });
                //     if (err) throw err;
                //     res.send(result); 
                //                     res.send();
                //     db.close();
                //   });
                // );
            } else {
                res.send("No user Exist");
            }

        }).catch(err => {
            console.log(err);
        });
         Student.findByIdAndRemove({
            _id: req.params.id
        }).then(function (student) {
                res.send(student);
         });
});


router.put('/:id', (req, res) => {
    Student.findByIdAndUpdate({
        _id: req.params.id
    }, req.body).then(function (student) {
        Student.findOne({
            _id: req.params.id
        }).then(function (student) {
            res.send(student);
        })
    });

});





router.post("/register/category", (req, res, next) => {
    var email = req.body.email;
    Student.findOne({
            email: email
        })
        .then(user => {
            if (user) {
                Category.create(req.body).then(function (category) {
                    res.send(category);
                })
            } else {

                res.send("No user Exist");
            }

        }).catch(err => {
            console.log(err);
        });
    // Category.create(req.body).then(function(category){
    //     res.send(category);
    // })

})

router.put('/category/update/:id', (req, res) => {
    Category.findByIdAndUpdate({
        _id: req.params.id
    }, req.body).then(function (category) {
        Category.findOne({
            _id: req.params.id
        }).then(function (category) {
            res.send(category);
        })
    });

});


router.delete('/category/delete/:id', (req, res) => {
    Category.findByIdAndRemove({
        _id: req.params.id
    }).then(function (category) {

        res.send(category);

    });

});



router.get('/list/:id', (req, res) => {
    Student.findOne({
            _id: req.params.id
        })

        .then(user => {
            if (user) {

                var MongoClient = require('mongodb').MongoClient;
                var url = "mongodb://localhost:27017/";

                MongoClient.connect(url, {
                    useNewUrlParser: true
                }, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("AKGEC");
                    var email = user.email;
                    console.log(email);
                    var query = {
                        email: email
                    };
                    dbo.collection("categories").find(query).toArray(function (err, result) {
                        if (err) throw err;

                        res.send(result);
                        res.send();
                        db.close();
                    });
                });

            } else {
                  res.send("No user Exist");
            }

        }).catch(err => {
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