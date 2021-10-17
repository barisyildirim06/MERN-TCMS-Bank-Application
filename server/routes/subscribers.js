const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const { subscriberCreate, subscriberList } = require('../controllers/subscriber.js')

//=================================
//            Subscriber
//=================================

router.post("/create", subscriberCreate);
router.get("/list", auth, subscriberList);

module.exports = router;
