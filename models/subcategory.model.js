import mongoose from "mongoose";
import UniqueValidator from "mongoose-unique-validator";


const subcategorySchema = mongoose.Schema({

    _id: Number,

    catnm: {
        type : String,
        required : [true, "category name is required"],
        lowercase : true,
        trim: true
    },

    subcatnm:{
        type: String,
        required :  [true, "subcategory name is required"],
        lowercase: true,
        unique: true,
        trim: true
    },

    subcaticonnm:{
        type: String,
        required  : [true,"icon name is required"],
        trim: true
    }


});



subcategorySchema.plugin(UniqueValidator);


const subcategorySchemaModel = mongoose.model("subcategory_collection",subcategorySchema);


export default subcategorySchemaModel;