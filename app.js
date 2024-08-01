const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const cors=require("cors")
const adminModel = require("./models/admin")


let app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://bhagya:bhagya20@cluster0.gszky.mongodb.net/swiggydb?retryWrites=true&w=majority&appName=Cluster0")



app.post("/signUp",async(req,res)=>{
    let input=req.body
    let hashedPassword=bcrypt.hashSync(req.body.password,10)
    req.body.password=hashedPassword


    adminModel.find({email:req.body.email}).then(
        (items)=>{
            if(items.length>0){
                    res.json({"status":"email id already exist"})
                } else {
                    let result=new adminModel(input)
                    result.save()
                    res.json({"status":"success"})
                }
        }
    ).catch(
        (error)=>{}
    )
    

    
    })


app.listen(3030,()=>{
    console.log("server started")
})
