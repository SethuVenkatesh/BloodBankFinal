const mongoose =require('mongoose');

const Staff=mongoose.Schema({
    staffname:String,
    staffmail:String,
    staffpassword:String,
    organisation:String
})
module.exports=mongoose.model("staffs",Staff);