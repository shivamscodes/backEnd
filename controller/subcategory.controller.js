import "../models/connection.js";
import url from 'url';
import path from 'path';
import subcategorySchemaModel from "../models/subcategory.model.js";
import rs from "randomstring";


export const save = async(req,res)=>{
    
    let subcategory =await subcategorySchemaModel.find();
    let l = subcategory.length;
    let _id = l==0?1:subcategory[l-1]._id+1;

    const caticon = req.files.caticon;
    
    const caticonnm = rs.generate(10)+"_"+Date.now()+"_"+caticon.name;

    const __dirname = url.fileURLToPath(new URL('.',import.meta.url));
    const uploadfilepath =path.join(__dirname,'../../UI/public/assets/uploads/subcaticons',caticonnm);
     
    let subcategoryDetails = {...req.body, "subcaticonnm":caticonnm, "_id":_id};
     
    try{
        
        // console.log(subcategoryDetails);
    await subcategorySchemaModel.create(subcategoryDetails); 
     caticon.mv(uploadfilepath);
    res.status(200).json({"status": true});
    }catch(error){
        //  console.log(error);
     res.status(500).json({"status": false});
    }
};


export const fetch = async(req,res)=>{
    
    let condition_obj = req.query;

    let subcategorylist =await subcategorySchemaModel.find(condition_obj);
    if(subcategorylist!=0){
        res.status(200).json({"status": true , "info": subcategorylist});
    }else{
        res.status(500).json({"status": false});
    }
};


export const deletesubcat = async(req,res)=>{

    try{
    let subcategoryDetails = await subcategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
    // console.log(subcategoryDetails);
    if(subcategoryDetails){
        let details = await subcategorySchemaModel.deleteOne(JSON.parse(req.body.condition_obj));
        if(details){
            res.status(200).json({"status":true});
        }else{
            res.status(500).json({"status":false});
        }
    }
    else{
        res.status(404).json({"status":false});
    }
}catch(error){
      res.status(500).json({"status":false});  
}
};






export const update = async(req,res)=>{
   try { 
    let userdetails = await subcategorySchemaModel.find(req.body.condition_obj);

    if(userdetails.length>0){
        let user = await subcategorySchemaModel.updateOne(req.body.condition_obj,{$set:req.body.content_obj});

        if(user)
            res.status(200).json({"status":true})
        else
            res.status(500).json({"status":false})
    }else{
         res.status(404).json({"status":false})
    }
}
catch(error){
    res.status(500).json({"status":false})
}
}