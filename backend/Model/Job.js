const mongoose=require("mongoose")
const Jobschema=new mongoose.Schema({
title: String,
    company: String,
    location: String,
    category: String,
    aboutCompany: String,
    aboutJob: String,
    whoCanApply: String,
    perks: String,
    numberOfOpening: String,
    CTC: String,
    AdditionalInfo: String,
    startDate: String,
    createdAt:{
        type:Date,
        default:Date.now,
    },
});
module.exports=mongoose.model("Job",Jobschema)