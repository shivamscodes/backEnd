import express from "express";
import * as transactionController from "../controller/transaction.controller.js";



const router = express.Router();

router.post("/save", transactionController.save);

router.get("/fetch",transactionController.fetch);

router.delete("/delete",transactionController.deletetransaction);


export default router;
