let express=require('express')
let UserRecord = require('../model/schema');
let route=new express.Router()
route.post('/checkin', async (req, res) => {
    const { userId } = req.body;
    const checkInTime = new Date();
    const userRecord = new UserRecord({
      userId,
      checkInTime,
    });
  
    await userRecord.save();
    res.json(userRecord);
  });
route.post('/checkout', async (req, res) => {
    const { userId } = req.body;
    const checkOutTime = new Date();
    const userRecord = await UserRecord.findOne({ userId, checkOutTime: null });
    if (!userRecord) {
        return res.status(404).json({ message: 'User must check in before checking out.' });
      }
    userRecord.checkOutTime = checkOutTime;
    await userRecord.save();
    const duration = userRecord.checkOutTime - userRecord.checkInTime;
    res.json({ userRecord, duration });
  });
  module.exports=route