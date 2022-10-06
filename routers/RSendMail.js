import express from 'express';
import { sendMail } from '../controllers/SendMail.js';
const router = express.Router();

router.post('/sendMail', async (req, res, next) => {
    let { fullname, phone, address, role, username, dob, email, code } = req.body;
    let response = sendMail(fullname, phone, address, role, username, dob, email, code);
    next(response);
})

export default router;
