const moongose=require('mongoose');

//connecting to mongoDB Atlas 
moongose.connect('mongodb+srv://iasourav:passadmin@cluster.h85fklz.mongodb.net/?retryWrites=true&w=majority')
.then(ok=>console.log("Connected to MongoDB "))
.catch(err=>console.log("Failed to Connect to MongoDB",err))
module.exports=moongose;