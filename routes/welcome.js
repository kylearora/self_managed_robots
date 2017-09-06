const express = require("express")
const router = express.Router()
const NewUser = require("../models/User")
const bcrypt = require("bcryptjs")
const users = require("../models/Robots")

router.get("/sign_in", function(req, res){
  res.render("welcome")
})

router.post("/sign_in", function(req, res) {
  const username = req.body.username
  const password = req.body.password

  NewUser.findOne({username: username}).then(function(user) {
    if (!user) {
      // no user found, try again
      res.render("welcome", {
        message: "Your info is wrong, FOOL!"
      })
    } else {
      //if user found, redirect to root --> index
      if (bcrypt.compareSync(password, user.passwordHash)) {
        req.session.user = user
        res.redirect("/")
      } else {
        // if no user is found, try again
        res.render("welcome", {
          message: "Your info is wrong, FOOL!"
        })
      }
    }
  })
})




module.exports = router
