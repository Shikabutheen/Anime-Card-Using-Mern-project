import express from "express";
import Reg from "../controller/register.js";
import Login from "../controller/login.js";
 import {myprofile}from '../controller/Me.js'
import { isAuth } from "../middleware/isAuth.js";
import { Logout } from "../controller/logout.js";
const router = express.Router();

router.post("/reg", Reg);
router.post("/login", Login);
router.get("/me", isAuth, myprofile);
router.get("/logout",isAuth,Logout)




export default router;
