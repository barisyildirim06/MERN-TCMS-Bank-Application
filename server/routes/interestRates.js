const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const { interestRateCreate, interestRateList, interestRateUpdate } = require('../controllers/interestRate.js')

//=================================
//            Subscriber
//=================================

router.post("/create", auth, interestRateCreate);
router.post("/update", auth, interestRateUpdate);
router.get("/list", auth, interestRateList);

module.exports = router;
