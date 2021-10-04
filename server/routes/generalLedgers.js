const express = require('express');
const router = express.Router();
const {generalLedgerIndex, generalLedgerCreate, } = require('../controllers/generalLedger.js')

//=================================
//             Product
//=================================

router.get("/",generalLedgerIndex);

router.post("/create", generalLedgerCreate);

module.exports = router;
