const moongose=require('mongoose'),Schema=moongose.Schema;

//create a schema that define the structure
const userDetails=new Schema({
    name: {type:String,required:true},
    email: {type:String,required:true},
    age: Number,
    prograd_id: Number,
    squad: Number
})

//Creating a model to interact with DB
const User=moongose.model("Users",userDetails);
module.exports={User}