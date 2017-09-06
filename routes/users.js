const express = require("express")
const router = express.Router()
const users = require("../models/Robots")
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")

const requireAuth = function(req, res, next) {
  // console.log(req.session.user);
  if (req.session.user) {
    next()
  } else {
    res.redirect("/sign_in")
  }
}

router.get("/", requireAuth, function(req, res) {
    console.log("Connected");
    const title = "ChipedIn: LinkedIn for Robots"
    users.find()
    .then(function(users){
      res.render("index", {
        title: title,
        users: users
      })
    })
  })

router.get("/NewRobot", function (req, res) {
  res.render("NewRobot")
})

router.post("/NewRobot", function(req, res) {
  const name = req.body.name
  const avatar = req.body.avatar
  const email = req.body.email
  const phone = req.body.phone
  const university = req.body.university
  const company = req.body.company
  const job = req.body.job
  const skills = req.body.skills
  const user = new users()
  user.name = name
  user.avatar = avatar
  user.email = email
  user.phone = phone
  user.university = university
  user.company = company
  user.job = job
  user.skills = skills
  user.save().then(function(user) {
    res.redirect("/")
  })
  .catch(function(error) {
    console.log("error", error)
    res.render("newRobot", {
      user: user,
      errors: error.errors
    })
    console.log(error);
  })
})

router.post("/users/:id", requireAuth, function(req, res) {
users.findOne({ _id: req.params.id }).then(function(user) {
  const name = req.body.name
  const avatar = req.body.avatar
  const email = req.body.email
  const phone = req.body.phone
  const university = req.body.university
  const company = req.body.company
  const job = req.body.job
  const skills = req.body.skills
  user.name = name
  user.avatar = avatar
  user.email = email
  user.phone = phone
  user.university = university
  user.company = company
  user.job = job
  user.skills = skills
  user.save().then(function(user) {
      res.redirect("/")
    })
    .catch(function(error) {
      res.render("edit", {
        user: user,
        errors: error.errors
      })
    })
  })
})

router.get("/users/:id", requireAuth, function (req, res) {
  users.findOne({_id: req.params.id})
  .then(function(user){
    res.render("profile", {
      user:user
    })
  })
})

router.get("/users/:id/edit", requireAuth, function(req, res) {
  users.findOne({_id: req.params.id})
  .then(function(user){
    res.render("edit", {
      user:user
    })
  })
})

router.get("/users/:id/delete", requireAuth, function(req, res){
  users.deleteOne({_id: req.params.id})
  .then(function(user){
    res.redirect("/")
  })
})


module.exports = router
