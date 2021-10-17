const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { userUpdate, listUsers } = require('../controllers/user.js')
const { auth } = require("../middleware/auth");
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'client/public/static/img/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             User
//=================================

router.post("/uploadImage", auth, (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        isAdmin: req.user.isAdmin? true : false,
        email: req.user.email,
        phone: req.user.phone,
        companyName: req.user.companyName,
        irdNumber: req.user.irdNumber,
        companyOfficeNumber: req.user.companyOfficeNumber,
        name: req.user.name,
        lastname: req.user.lastname,
        verified: req.user.verified,
        image: req.user.image,
        agentFirstName: req.user.agentFirstName,
        agentLastName: req.user.agentLastName,
        agentJobTitle: req.user.agentJobTitle,
        nzdWithdrawalAccount: req.user.nzdWithdrawalAccount,
        usdWithdrawalAccount: req.user.usdWithdrawalAccount,
        audWithdrawalAccount: req.user.audWithdrawalAccount,
        idimage: req.user.idimage,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res.cookie("w_auth", user.token)
                .status(200)
                .json({
                    loginSuccess: true, userId: user._id, isAdmin: user.isAdmin? true : false
                });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post('/update/:id',userUpdate)
router.get('/list', auth, listUsers)

module.exports = router;
