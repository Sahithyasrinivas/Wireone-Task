let mongoose=require('mongoose')
const userRecordSchema = new mongoose.Schema({
    "userId": String, 
     "checkInTime": Date,
     "checkOutTime": Date,
   });
module.exports= mongoose.model('UserRecord', userRecordSchema);