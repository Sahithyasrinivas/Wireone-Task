let express=require('express')
let cors=require('cors')
let mongoose=require('mongoose')
let cron=require('node-cron')
let app=express()
app.use(express.json())
app.use(cors())
let route=require('./routes/userroute')
mongoose.connect("mongodb://127.0.0.1:27017/test",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
  console.log("ok")
}).catch((err)=>{
  console.log(err)
})
cron.schedule('* * * * *', async () => {
  const users = await UserRecord.find({ checkOutTime: null });
  users.forEach(async (user) => {
    const currentTime = new Date();
    const duration = currentTime - user.checkInTime;
    await UserRecord.findByIdAndUpdate(user._id, { duration });
  });
});
app.use("/",route)
app.listen(5000)
