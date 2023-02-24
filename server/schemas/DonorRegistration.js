const mongoose =require("mongoose");

const DonorRegistration=mongoose.Schema({
    donorName:String,
    gender:String,
    donorAge:Number,
    aadharNumber:String,
    mobileNumber:String,
    dateOfBirth:String,
    bloodGroup:String,
    organisation:String,
    donationDate:String,
    donationType:String,
    timeSlot:String,
    address:String,
    pincode:String,
    donationStatus:{
        type:String,
        default:"registered",
    },
    rejectReason:{
        type: Object,
        default: {},
    },
    userEmail:String,
})
module.exports =mongoose.model("donor_registrations",DonorRegistration)