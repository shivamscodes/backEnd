import "../models/connection.js"
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import Mail from "./Mail.controller.js";


import userSchemaModel from "../models/user.model.js";

export const save =async(req,res)=>{
   // console.log(req.body);
   const users = await userSchemaModel.find();
   let l = users.length;
   const _id = l==0?1:users[l-1]._id+1;
// console.log(users);

   const userDetails = {...req.body,"_id":_id,"role":"user","status":0,"info":Date()};
   //  console.log(userDetails);
    
    try{
    await userSchemaModel.create(userDetails);

    
    Mail(req.body.email,req.body.password);
res.status(201).json({"status": true});    
}
catch{
   res.status(500).json({"status": false});
}



    // res.send("user regestration successful");
    // console.log(req.body);
};




//login

export const login=async(req,res)=>{

   const userDetails = {...req.body,"status":1};
   const users = await userSchemaModel.find(userDetails);
   // console.log(users);
   
   
   if(users.length>0){
      const payload = users[0].email;
      const key = rs.generate(20);
      const token  = jwt.sign(payload,key);

      res.status(200).json({"status":true ,"token":token, "info": users[0]});
   }else{
      res.status(404).json({"status": false});
   }

};



//fetchAPI

export const fetch = async(req,res)=>{
   var condition_obj = req.query;
   // let condition_obj = req.query.condition_obj;
   // if(condition_obj!=undefined){
   //    condition_obj = JSON.parse(condition_obj);
   // }
   // else{
   //    condition_obj={};
   // }


   // if(condition_obj.reset){
   //    delete condition_obj.reset;
   // }

   let userList = await userSchemaModel.find(condition_obj);
   if(userList.length!=0){

      // if(req.query.reset === "true"){
      //    const email = userList[0].email;
      //    // const link = `http://localhost:3000/resetpassword/${email}`;
        
      //    ResetPasswordMail(email);
      // }

      res.status(200).json({"status": true, "info": userList});
   }else{
      res.status(404).json({"status":false});
   }

};



//delete

export const deleteUser = async(req,res)=>{
     try{
       let userDetails = await userSchemaModel.findOne(req.body);

      if(userDetails){
         let user =await userSchemaModel.deleteOne(req.body);
        if(user){
         res.status(200).json({"status": true});
        }
        else{
         res.status(500).json({"status": false});
        }
      }else{
         res.status(404).json({"status":"not found"});
      }
   }
   catch(error){
       res.status(500).json({"status": false});
   }
};




//update

export const update =async(req,res)=>{
// console.log(req.body);
     try{
   let userDetails =await userSchemaModel.findOne(req.body.condition_obj);
    
   if(userDetails){
      let user = await userSchemaModel.updateOne(req.body.condition_obj,{$set:req.body.content_obj})
      
      if(user){
         res.status(200).json({"status":true});
      }else{
         res.status(500).json({"status": false});
      }
   }
   else{
      res.status(404).json({"status":"not found"});
   }

}
   catch(error){
       res.status(500).json({"status": false});
   }

};