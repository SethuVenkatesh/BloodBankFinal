const mongoose=require('mongoose');

const BloodRequest=mongoose.Schema({
    patientName:String,
    reason:String,
    bloodGroup:String,
    bloodComponent:String,
    units:Number,
    deliveryAddress:String,
    requestDate:String,
    userEmail:String,
    organisation:String,
    isDelivered:{
        type:Boolean,
        default:false
    },
    bloodId:{
        type:Array,
        default:[]
    }
})
module.exports=mongoose.model("blood_requests",BloodRequest)