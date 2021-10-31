const express = require('express');
const { auth } = require("../middleware/auth");
const router = express.Router();
const { availableBalance } = require('../controllers/availableBalance.js')

//=================================
//             Product
//=================================

router.get("/", auth, availableBalance);


module.exports = router;
