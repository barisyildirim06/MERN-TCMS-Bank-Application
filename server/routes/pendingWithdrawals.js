const express = require('express');
const router = express.Router();
const {pendingWithdrawalIndex, pendingWithdrawalCreate, } = require('../controllers/pendingWithdrawal.js')

//=================================
//             Product
//=================================

router.get("/",pendingWithdrawalIndex);

router.post("/create", pendingWithdrawalCreate);

module.exports = router;