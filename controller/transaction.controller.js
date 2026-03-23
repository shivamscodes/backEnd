import "../models/connection.js";
import transactionSchemaModel from "../models/transaction.model.js";
import rs from "randomstring";

export const save = async (req,res)=>{

    let transactions = await transactionSchemaModel.find();
    let l = transactions.length;
    let _id = l==0 ? 1 : transactions[l-1]._id+1;
    
    let TxN = rs.generate(14);

    const transactionDetail = {...req.body, "_id" : _id , "TxN_id" : TxN, "info": new Date()};

    try{
      await transactionSchemaModel.create(transactionDetail);
        res.status(200).json({"status" : true});
    }
    catch(error){
        res.status(500).json({"status" : false});
    }


};



export const fetch = async (req,res)=>{
   let condition_obj = req.query;
   
   let transactions = await transactionSchemaModel.find(condition_obj);
   if(transactions!=0){
    res.status(200).json({"status" : true , "details" : transactions});
   }
   else{
    res.status(500).json({"status" : false});
   }
 
   
};



export const deletetransaction = async(req,res)=>{
    try{
        let transactionDetail = await transactionSchemaModel.findOne(req.body);

        if(transactionDetail){
          let transaction =   await transactionSchemaModel.deleteOne(req.body);
          if(transaction){  
          res.status(200).json({"status" : true });
          }else{
             res.status(500).json({"status" : true });
          }
        }else{
        res.status(404).json({"status" : "not found" });
        }
    }catch(error){
         res.status(500).json({"status" : false });
}
} 
