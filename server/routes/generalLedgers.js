const express = require('express');
const { auth } = require("../middleware/auth");
const router = express.Router();
const {generalLedgerIndex, generalLedgerCreate, generalLedgerList } = require('../controllers/generalLedger.js')

//=================================
//             Product
//=================================

router.post("/", auth, generalLedgerIndex);
router.post("/create", auth, generalLedgerCreate);
router.get("/list", auth, generalLedgerList);

module.exports = router;
