const express = require('express');
const router = express.Router();
const { subscriberCreate, } = require('../controllers/subscriber.js')

//=================================
//            Subscriber
//=================================

router.post("/create", subscriberCreate);

module.exports = router;
