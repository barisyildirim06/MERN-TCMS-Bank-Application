const nodemailer = require("nodemailer");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require("./models/User");

const sendMail = async (email,token) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });
    const url = `${process.env.SERVER_URL}/api/confirmation/${token}`

    // send mail with defined transport object
    let info = await transporter.sendMail({
        to: email, 
        subject: "TCMS Confirmation Email", 
        html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`, 
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return;
}

const confirmEmail = async (req, res) => {
    const _id = jwt.verify(req.params.token, 'TcmsUpwork');
    await User.findOneAndUpdate({ _id: _id }, { confirmed: true }, { new: true })
    return res.redirect(`${process.env.SERVER_URL}/login`)
}
module.exports = {
    sendMail,
    confirmEmail
}
