const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models/user-model");
const jwt=require("jsonwebtoken");

router.use((req,res,next)=>{
    console.log("正接收請求");
    next();
});

router.get("/testAPI",(req,res) =>{
    return res.send("成功連線");
});

router.post("/register", async(req,res) =>{

    let {error}=registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const emailExist = await User.findOne({email:req.body.email});
    if (emailExist) return res.status(400).send("Email already exists");


    let {email,username,password,role}=req.body;
    let newUser=new User({email,username,password,role});
    try {
        let savedUser=await newUser.save();
        return res.send({
            msg:"使用者成功儲存",
            savedUser
        });
    } catch (e) {
        return res.status(500).send("無法儲存使用者");        
    }
})

router.post("/login", async(req,res) =>{

    let {error}=loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const foundUser = await User.findOne({email:req.body.email});
    if (!foundUser) {
        return res.status(401).send("無法找到使用者");
    }

    foundUser.comparePassword(req.body.password,(err,isMatch)=>{
        if (err) return res.status(500).send(err);

        if (isMatch) {
            const tokenObject={_id:foundUser._id,email:foundUser.email};
            const token=jwt.sign(tokenObject,process.env.PASSPORT_SECRET);
            return res.send({
                message:"登入成功",
                token:"JWT "+token,
                user:foundUser
            });
        }
        else {
            return res.status(401).send("密碼錯誤");
        }

    })
    
})

module.exports = router;
