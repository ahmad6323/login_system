const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ahmad:upUIGYkS7BSKCjLP@api.oyiy89b.mongodb.net/')
.then(()=>{
   console.log("database is connected ")
})
.catch(()=>{
    console.log("connection error ")
})

const loginSchema =  mongoose.Schema({
    email:{
  type:String,
  required :true,

    },
    password:{
   type:Number,
   required:true
}
})

const collection  = new mongoose.model("users",loginSchema)
module.exports = collection