const express = require('express');
const router = express.Router();
const {generalLedgerIndex, } = require('../controllers/generalLedger.js')

//=================================
//             Product
//=================================

router.post("/",generalLedgerIndex);

module.exports = router;
