import express from 'express';

import { isAuth } from '../middleware/isAuth.js';
import uploadFile from '../middleware/multer.js';

import {CreateCard,getCards,updateCard,deleteCard}from '../controller/cardcontrol.js'


const router=express.Router()

router.post('/new',isAuth,uploadFile,CreateCard) ;

router.get('/all',isAuth,getCards)

router.put('/up/:id',isAuth,uploadFile,updateCard)

router.delete('/delete/:id',isAuth,deleteCard)



export default router