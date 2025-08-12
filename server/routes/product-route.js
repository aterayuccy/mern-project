const router = require("express").Router();
const Product = require("../models").product;
const productValidation = require("../validation").productValidation;
const passport = require("passport");

router.use((req,res,next)=>{
    console.log("product route正在接受請求");
    next();
});

router.get("/", async (req, res) => {
    try{
        let productFound = await Product.find({})    
        .populate("seller",["username","email","password"])
        .exec();
        return res.send(productFound);
    } catch (e) {
        return res.status(5000).send(e);
    }    
});


router.get("/seller/:_seller_id",  async(req, res) => {
    let {_seller_id} = req.params;
    let productFound = await Product.find({seller:_seller_id})
    .populate("seller",["username","email"])
    .exec();
    return res.send(productFound);
});

router.get("/buyer/:_buyer_id",async(req,res)=>{
    let{_buyer_id}=req.params;
    let productFound = await Product.find({buyer:_buyer_id})
    .populate("seller",["username","email"])
    .exec();
    return res.send(productFound);

});

router.get("/findByName/:name",async(req,res)=>{
    let {name} =req.params;
    try{
        let productFound = await Product.find({title:name})
        .populate("seller",["email","username"])
        .exec();
        return res.send(productFound);
    } catch (e) {
        return res.status(500).send(e);
    }
});


router.get("/:_id",async(req,res)=>{
    let {_id} =req.params;
    try{
        let productFound = await Product.findOne({_id})
        .populate("seller",["email"])
        .exec();
        return res.send(productFound);
    } catch (e) {
        return res.status(500).send(e);
    }
});


router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {

    let { error } = productValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

        if (req.user.isBuyer()) {
        return res
        .status(400)
        .send("只有賣家才能發布新商品");
    }

    let {title,description,price} = req.body;
    try{
        let newProduct = new Product({
        title,
        description,
        price,
        seller:req.user._id,
     });
     let savedProduct = await newProduct.save();
     return res.send({
        message:"新商品已經保存",
        savedProduct,
     })
    } catch (e) {
        return res.status(500).send("無法發布商品");
    }      
});


router.post("/enroll/:_id", passport.authenticate("jwt", { session: false }),async(req,res)=>{
    let{_id}=req.params;
    try{
        let product=await Product.findOne({_id}).exec();
    product.buyer.push(req.user._id);
    await product.save();
    return res.send("您已註冊完成")
    } catch(e){
        return res.send(e)
    }
})

router.patch("/:_id",async(req,res)=>{
    let{error}=productValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let{_id}=req.params;
    try{
        let productFound = await Product.findOne({_id});
        if (!productFound) {
            return res.send("找不到商品，無法更新");      
            }
        
        
        if (productFound.seller.equals(req.user._id)){
                let updatedProduct=await Product.findOneAndUpdate({_id},req.body,{
                    new:true,
                    runValidators:true
                });
                return res.send({
                    message:"您的商品已被更新成功",
                    updatedProduct,
                })
                } else {
                    return res.status(403).send("只有此商品的賣家可以編輯商品");
                }
        } catch (e) {
        return res.status(500).send(e);
    }
})

router.delete("/:_id",async(req,res)=>{
     let{_id}=req.params;
    try{
        let productFound = await Product.findOne({_id});
        if (!productFound) {
            return res.send("找不到商品，無法刪除");      
            }       
        
        if (productFound.seller.equals(req.user._id)){
            await Product.deleteOne({_id}).exec();
            return res.send({
                message:"您的商品已被刪除",
            })

               
                } else {
                    return res.status(403).send("只有此商品的賣家可以刪除商品");
                }
        } catch (e) {
        return res.status(500).send(e);
    }
    
})

module.exports = router;