const express = require('express');
const { auth } = require("../middleware/auth");
const router = express.Router();
const { transferCreate } = require('../controllers/transfer.js')

//=================================
//             Transfer
//=================================

router.post("/create", auth, transferCreate);

module.exports = router;
