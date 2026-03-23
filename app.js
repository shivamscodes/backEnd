import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import fileUpload from 'express-fileupload';


import userRouter from './routers/user.router.js'
import categoryRouter from './routers/category.router.js'
import subcategoryRouter from './routers/subcategory.router.js'
import ResetPasswordMail from './controller/ResetPasswordMail.contoller.js';
import addproductRouter from  './routers/addproduct.router.js'
import aiChatRoute from "./routers/aiChat.js";
import transactionRouter from "./routers/transaction.router.js"

//to link controller
import Gateway from './controller/payment.controller.js';

const app = express();

//to handle cross origin request
app.use(cors());



//configuration to fetch req body content : body parser middleware
//used to fetch req data from methods like : POST , PUT , PATCH , DELETE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//configuration to fetch file content : file upload middleware
app.use(fileUpload());


app.use("/api/ai", aiChatRoute);

app.use("/user",userRouter);
app.use("/category",categoryRouter)
app.use("/subcategory",subcategoryRouter);
app.use("/addproducts",addproductRouter);
app.use("/transaction", transactionRouter);

//method to load Gateway
app.post("/payment",Gateway);

//route for forgetpassword
app.post("/resetpassword",ResetPasswordMail);



app.listen(3001);
console.log("port at http://localhost:3001");