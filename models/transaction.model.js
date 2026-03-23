import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const transactionSchema = mongoose.Schema({
    _id: Number,

    TxN_id : {
        type : String,
       trim : true,
       required : [true , "TxN required"]

    },

    userId :{
        type : String,
        required : [true , "userID required"],
        trim : true
    },

    amount : {
        type : String,
        required : [true , "amount required"],
        trim : true
    }, 

    info :  {
  type: Date,
  default: Date.now
}




})


transactionSchema.plugin(mongooseUniqueValidator);

const transactionSchemaModel = mongoose.model("transaction_collection" , transactionSchema);

export default transactionSchemaModel;