import '../models/connection.js'
import url from 'url';
import path from 'path';
import rs from 'randomstring'

import categorySchemaModel from '../models/category.model.js';



//saveAPI

export const save = async(req,res)=>{
//    console.log(req.files);
    let categorys =await categorySchemaModel.find();
    let l = categorys.length;
    let _id = l==0?1: categorys[l-1]._id+1;
    
    const caticon =req.files.caticon;
    const caticonnm = rs.generate(10)+"_"+Date.now() +"_"+ caticon.name;

    const __dirname = url.fileURLToPath(new URL ('.',import.meta.url));
     const uploadfilepath = path.join(__dirname,'../../UI/public/assets/uploads/caticons',caticonnm);


    let cDetails = {...req.body,"caticonnm":caticonnm , "_id":_id};
    
  try{
    await categorySchemaModel.create(cDetails); 
     caticon.mv(uploadfilepath);
    res.status(200).json({"status":true});   
}catch(error){
    res.status(500).json({"status":false});
}

};



//fetch

export const fetch = async(req,res)=>{
     
    let condition_obj = req.query;

    let categoryList = await categorySchemaModel.find(condition_obj);
    if(categoryList.length!=0){
        res.status(200).json({"status":true, "info": categoryList});
    }else{
        res.status(404).json({"status":false});
    }
};



//delete 

export const deletecategory = async(req,res)=>{
    try{ 
    let cDetails =await categorySchemaModel.findOne(req.body);

    if(cDetails){
      let detail =await categorySchemaModel.deleteOne(req.body);
      if(detail){
      res.status(200).json({"status":true});
    }else{
        res.status(500).json({"status":false});
    }
}
else{
    res.status(404).json({"status":false});
}
}
catch(error){
    res.status(500).json({"status":false});
}

};

//update


export const update = async(req,res)=>{
   try { 
    let userdetails = await categorySchemaModel.find(req.body.condition_obj);

    if(userdetails.length>0){
        let user = await categorySchemaModel.updateOne(req.body.condition_obj,{$set:req.body.content_obj});

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