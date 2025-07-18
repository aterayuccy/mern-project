const router = require("express").Router();
const Course = require("../models").course;
const courseValidation = require("../validation").courseValidation;

router.use((req,res,next)=>{
    console.log("Course route正在接受請求");
    next();
});

router.get("/", async (req, res) => {
    try{
        let courseFound = await Course.find({})    
        .populate("instructor",["username","email","password"])
        .exec();
        return res.send(courseFound);
    } catch (e) {
        return res.status(5000).send(e);
    }    
});


router.get("/instructor/:_instructor_id",  async(req, res) => {
    let {_instructor_id} = req.params;
    let coursesFound = await Course.find({instructor:_instructor_id})
    .populate("instructor",["username","email"])
    .exec();
    return res.send(coursesFound);
});

router.get("/student/:_student_id",async(req,res)=>{
    let{_student_id}=req.params;
    let coursesFound = await Course.find({students:_student_id})
    .populate("instructor",["username","email"])
    .exec();
    return res.send(coursesFound);

});

router.get("/findByName/:name",async(req,res)=>{
    let {name} =req.params;
    try{
        let courseFound = await Course.find({title:name})
        .populate("instructor",["email","username"])
        .exec();
        return res.send(courseFound);
    } catch (e) {
        return res.status(500).send(e);
    }
});


router.get("/:_id",async(req,res)=>{
    let {_id} =req.params;
    try{
        let courseFound = await Course.findOne({_id})
        .populate("instructor",["email"])
        .exec();
        return res.send(courseFound);
    } catch (e) {
        return res.status(500).send(e);
    }
});


router.post("/", async (req, res) => {

    let { error } = courseValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

        if (req.user.isStudent()) {
        return res
        .status(400)
        .send("You are not authorized to perform this action");
    }

    let {title,description,price} = req.body;
    try{
        let newCourse = new Course({
        title,
        description,
        price,
        instructor:req.user._id,
     });
     let savedCourse = await newCourse.save();
     return res.send({
        message:"新課程已經保存",
        savedCourse,
     })
    } catch (e) {
        return res.status(500).send("無法創建課程");
    }      
});


router.post("/enroll/:_id",async(req,res)=>{
    let{_id}=req.params;
    try{
        let course=await Course.findOne({_id}).exec();
    course.students.push(req.user._id);
    await course.save();
    return res.send("註冊完成")
    } catch(e){
        return res.send(e)
    }
})

router.patch("/:_id",async(req,res)=>{
    let{error}=courseValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let{_id}=req.params;
    try{
        let courseFound = await Course.findOne({_id});
        if (!courseFound) {
            return res.send("無法創建課程");      
            }
        
        
        if (courseFound.instructor.equals(req.user._id)){
                let updatedCourse=await Course.findOneAndUpdate({_id},req.body,{
                    new:true,
                    runValidators:true
                });
                return res.send({
                    message:"課程已經更新",
                    updatedCourse,
                })
                } else {
                    return res.status(403).send("你不能編輯課程");
                }
        } catch (e) {
        return res.status(500).send(e);
    }
})

router.delete("/:_id",async(req,res)=>{
     let{_id}=req.params;
    try{
        let courseFound = await Course.findOne({_id});
        if (!courseFound) {
            return res.send("無法刪除課程");      
            }       
        
        if (courseFound.instructor.equals(req.user._id)){
            await Course.deleteOne({_id}).exec();
            return res.send({
                message:"課程已經刪除",
            })

               
                } else {
                    return res.status(403).send("你不能刪除課程");
                }
        } catch (e) {
        return res.status(500).send(e);
    }
    
})

module.exports = router;