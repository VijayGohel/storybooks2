const express = require("express");
const router = express.Router();
const {ensureAuth, ensureGuest} = require("../middleware/auth")
const Story = require("../models/Story")

router
    .get("/",ensureGuest,(req,res)=>{
        res.render("login"); 
    });

router
    .get("/dashboard",ensureAuth, async (req,res)=>{

        try {

            const stories = await Story.find({user: req.user.id}).lean()    ;
            res.render("dashboard", 
                {userName: req.user.firstName, stories});

        } catch (err) {
            res.render("/Errors/500");
        }
        
    });

module.exports = router;