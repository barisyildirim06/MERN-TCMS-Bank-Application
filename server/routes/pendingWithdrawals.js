const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const {pendingWithdrawalIndex, pendingWithdrawalCreate, pendingWithdrawalList } = require('../controllers/pendingWithdrawal.js')

//=================================
//             Product
//=================================

router.post("/",pendingWithdrawalIndex);
router.post("/create", pendingWithdrawalCreate);
router.get("/list", auth, pendingWithdrawalList);

module.exports = router;
