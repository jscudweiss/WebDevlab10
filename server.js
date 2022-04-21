const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Add sessions
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

//Configure body-parser and set static dir path.
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//Initialize passport
app.use(session({
    secret: "MyLittleSecretThatIdontWantOthersToKnow",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
            minlength: 3
        },
        password: {
            type: String,
            require: true
        },
        fullname: {
            type: String,
            require: true,
        },
        profile: {
            type: String,
        },
        brand: {
            type: String,
            require: true,
        },
        favorites: {
            type: Array
        }

    }
)

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Configure Mongoose
mongoose.connect('mongodb://localhost:27017/carDB', {useNewUrlParser: true, useUnifiedTopology: true});


app.listen(3000, function () {
    console.log("server started at 3000");
});

app.get('/get_current_user', function (req, res) {
    if (req.isAuthenticated()) {
        res.send({
            message: "success",
            data: req.user
        })
    } else {
        res.send({
            message: "user not found",
            data: {}
        })
    }
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/login', (req, res) => {
    if (req.query.error) {
        res.redirect("/login.html?error=" + req.query.error);
    } else {
        res.redirect("/login.html");
    }
});

app.get('/register', (req, res) => {
    if (req.query.error) {
        res.redirect("/register.html?error=" + req.query.error);
    } else {
        res.redirect("/register.html");
    }
});

app.get('/account', (req, res) => {
    if (req.isAuthenticated) {
        res.sendFile(__dirname + "/src/account.html");
    } else {
        res.redirect("/account.html");
    }
});

app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (err) => {
        if (err) {
            res.redirect("/login?error=Database error");
        } else {
            const authenticate = passport.authenticate('local', {
                successRedirect: "/",
                failureRedirect: "/login?error=User name or password do not match"
            })
            authenticate(req, res);
        }
    });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
});

app.post('/register', (req, res) => {
    const newUser = {
        username: req.body.username,
        fullname: req.body.fullname,
        profile: req.body.profile,
        brand: req.body.brand
    }
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            const msg = ("?error=" + err);
            res.redirect('/register' + msg)
        } else {
            console.log(user);
            const authenticate = passport.authenticate('local');
            authenticate(req, res, () => {
                res.redirect('/');
            })
        }

    });
});


app.post('/like_car', (req, res) => {
    if (req.isAuthenticated()) {
        const car = JSON.parse(req.body.carItem);
        const uid = req.body.uid;
        User.updateOne(
            {
                _id: uid,
            },
            {
                $push: {
                    favorites: car
                }
            },
            (err) => {
                if (err) {
                    res.send({
                        message: "database error"
                    })
                } else {
                    res.send({
                        message: "success"
                    })
                }
            }
        )
    } else {
        console.log("logged_out")
        // navigate to login page
        res.send({
            message: "login required",
            data: "/login"
        })
    }
});