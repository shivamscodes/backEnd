import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";


const addproductsSchema = mongoose.Schema({
    
    _id: Number,

    title : {
        type: String,
        required : [true, "Title is required"],
        lowercase : true,
        trim : true
    },

    catnm: {
        type: String,
        required: [true , "category name required"],
        lowercase: true,
        trim: true
    },

    subcatnm : {
         type: String,
        required: [true , "subcategory name required"],
        lowercase: true,
        trim: true
    },

    description : {
        type: String,
        required : [true, "description is required"],
        trim: true
    },

    filename : {
        type : String,
        required : [true, "file is required"],
        trim : true
    },

    expectation :{
           type : String,
        required : [true, "expectation is required"],
        trim : true
    },

    useremail : {     // 👈 ADD THIS
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },

      review: {
       type: String,
       default: ""
     },

    info: String,


});




addproductsSchema.plugin(mongooseUniqueValidator);


const addproductsSchemaModel = mongoose.model("addproduct_collection", addproductsSchema);


export default addproductsSchemaModel;