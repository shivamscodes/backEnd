import mongoose from 'mongoose';
import UniqueValidator from 'mongoose-unique-validator';


const categorySchema = mongoose.Schema({
    _id: Number,

    catnm: {
        type : String,
        required : [true, "category name is required"],
        lowercase : true,
        unique: true,
        trim: true
    },

    caticonnm:{
        type: String,
        required : [true,"icon name is required"],
        trim: true
    }

});


//unique validator
categorySchema.plugin(UniqueValidator);


//model

const categorySchemaModel = mongoose.model("category_collection",categorySchema);

export default categorySchemaModel;
