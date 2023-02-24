const mongoose=require('mongoose');

const BloodComponent=mongoose.Schema({
    donorId:String,
    staffHandled:String,
    bloodGroup:String,
    units:Number,
    component:String,
    donationDate:String,
    expiryDate:String,
    bloodLocation:String,
    organisation:String,
    isExpired:{
        type:Boolean,
        default:false,
    },
    bloodStatus:{
        type:String,
        default:"donated",
    },
})
module.exports=mongoose.model("blood_components",BloodComponent)