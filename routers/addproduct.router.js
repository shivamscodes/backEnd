import express from "express";
import * as addproductController from '../controller/addproduct.controller.js'


const router = express.Router();


 router.post("/save",addproductController.save);

  router.get("/fetch",addproductController.fetch);

  router.patch("/addreview",addproductController.addReview);




export default router;