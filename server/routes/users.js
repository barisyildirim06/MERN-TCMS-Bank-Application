const express = require('express');
const router = express.Router();
const { userUpdate, listUsers, resetPassword, verifyUser, loginUser, registerUser, authUser, uploadImage, logoutUser } = require('../controllers/user.js')
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.post("/uploadImage", uploadImage);

router.get("/auth", auth, authUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", auth, logoutUser);

router.post('/update/:id',userUpdate);
router.post('/reset-password', resetPassword);
router.get('/list', auth, listUsers);
router.post('/verify-user', auth, verifyUser);

module.exports = router;
