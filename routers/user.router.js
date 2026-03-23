import express from 'express';

import * as userController from '../controller/user.controller.js'


let router = express.Router();

router.post("/save",userController.save);

router.post("/login",userController.login);

router.get("/fetch",userController.fetch);

router.delete("/delete",userController.deleteUser);

router.patch("/update",userController.update);

export default router;