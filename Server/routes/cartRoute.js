import express from 'express'
import { addToCard, getUserCart, updateCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router()

cartRouter.post('/get', authUser, getUserCart)
cartRouter.post('/add', authUser, addToCard)
cartRouter.post('/update', authUser, updateCart)

export default cartRouter