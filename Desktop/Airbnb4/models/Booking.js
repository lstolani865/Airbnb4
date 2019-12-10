const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user:
     {
        type:mongoose.Types.ObjectId,
        ref:"regForms",
        required:true
     },
 
     room:
     {
         type:mongoose.Types.ObjectId,
         ref:"ROOM",
         required:true
     },

     dateBooked :
     {
         type :Date ,
         default : Date.now()
     }
 
 
 
 });
 const bookingModel =mongoose.model("BOOK",bookingSchema);
 
 module.exports=bookingModel;