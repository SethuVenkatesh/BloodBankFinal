const mongoose =require('mongoose');

const Organisation=mongoose.Schema({
    organisationname:String,
    organisationmail:String,
    organisationpassword:String,
    staffs:{
        type:[String],
        default:[],
    },
})
module.exports=mongoose.model("organisations",Organisation);