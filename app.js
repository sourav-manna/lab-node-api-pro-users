//getting express,body=parser,cors package
const express=require('express');       
const bodyParser=require('body-parser');
const cors=require('cors');

//creating express server
const app=express();

//Parsing request body in bodyparser middleware and enabling cors to all origin
app.use(bodyParser.json());
app.use(cors({origin:'*'}));

//connection to DB in Atlas
const {moongose}=require('./config/connection');

//Perfoming CRUD
const user=require('./Crud/crud');

app.get('/',(req,res)=>{
    res.send('<table><tr><th>Method</th><th>URL</th><th>Description</th></tr><tr><td>POST</td><td>/api/users</td><td>Creates a user using the information sent inside the request body.</td></tr><tr><td>GET</td><td>/api/users</td><td>Returns an array users.</td></tr><tr><td>GET</td><td>/api/users/:id</td><td>Returns the user object with the specified id.</td></tr><tr><td>DELETE</td><td>/api/users/:id</td><td>Removes the user with the specified id and returns the deleted user.</td></tr><tr><td>PUT</td><td>/api/users/:id</td><td>Updates the user with the specified id using data from the request body. Returns the modified user</td></tr></table>')
})




//start server
app.listen(process.env.PORT|| 8000,(err,res)=>{
    if(err) throw err;
    console.log("Server started..")}
    );
app.use('/api',user);