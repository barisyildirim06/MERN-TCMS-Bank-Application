const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const { interestrateCreate, interestrateList } = require('../controllers/interestRate.js')

//=================================
//            Subscriber
//=================================

router.post("/create", auth, interestrateCreate);
router.get("/list", auth, interestrateList);

module.exports = router;
