/*
🎯 Your target
Your auth.routes.ts should only do five things:
1. Import Router
2. Create router
3. Import register controller
4. router.post("/register", register)
5. Export router
*/

import {Router} from "express";//This imports the Router class from Express.
import { register } from "../controllers/auth.controller";//Import the register function from the controller.
import upload from "../middleware/multer";

const router =Router();//Create a new router.
//Player registration
router.post(
    "/register",//जब frontend ले request पठाउँछ:
    upload.single("profilePhoto"),//यो Multer middleware हो।  Request मा image छ कि छैन हेर्ने Image लाई parse गर्ने  Image लाई req.file मा राख्ने  बाँकी fields लाई req.body मा राख्ने
    register//Multer ले request तयार गरेपछि यो controller चल्छ।
);

export default router;