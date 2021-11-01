const nodemailer = require("nodemailer");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require("./models/User");

const sendMail = async (user,token) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });
    const confirmUrl = `${process.env.SERVER_URL}/api/confirmation/${token}`
    const refUrl = `${process.env.SERVER_URL}/register?refCode=${user.userID}`

    // send mail with defined transport object
    let info = await transporter.sendMail({
        to: user.email, 
        subject: "TCMS Confirmation Email", 
        html: `
            <div>
            <div>
            Please click this link to confirm your email: <a href="${confirmUrl}">${confirmUrl}</a>
            <div />
            <div>
            If you want to invite other users here is your referrance Link: <a href="${refUrl}">${refUrl}</a>
            <div />
            </div>
        `, 
    });

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
