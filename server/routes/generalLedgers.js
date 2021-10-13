const express = require('express');
const router = express.Router();
const {generalLedgerIndex, generalLedgerCreate, } = require('../controllers/generalLedger.js')

//=================================
//             Product
//=================================

router.post("/",generalLedgerIndex);

router.post("/create", generalLedgerCreate);

module.exports = router;
