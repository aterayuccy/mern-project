const mongoose=require('mongoose');
const {Schema}=mongoose;

const courseSchema=new Schema({
    id : {type: String},
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    // buyer: [
    // {
    //     user: {
    //     type: [String],
    //     default: []
    //     },
    //     quantity: {
    //     type: Number,
    //     required: true,
    //     min: 1,
    //     },
    // }
    // ]

    buyer:{
        type:[String],
        default:[]
    },
});


module.exports=mongoose.model('Product',courseSchema);