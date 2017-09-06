const express = require("express")
const app = express()
const session = require("express-session")
const mongooseSession = require("mongoose-session")
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb")
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use( express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

const url = "mongodb://127.0.0.1:27017/robots"
mongoose.connect(url)

var sess = {
  secret: "keyboard cat",
  cookie: {},
  saveUninitialized: true,
  resave: true
}
app.use(session(sess))

const users = require("./routes/users")
app.use(users)

const welcome = require("./routes/welcome")
app.use(welcome)

const register = require("./routes/register")
app.use(register)

app.listen(3000, function(req, res){
  console.log("We are live HOLMES");
})
