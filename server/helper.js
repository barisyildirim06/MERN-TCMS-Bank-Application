const nodemailer = require("nodemailer");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require("./models/User");

const sendMail = async (user,token) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tcmsupwork@gmail.com',
            pass: 'Tcms_Upwork0',
        },
    });
    const confirmUrl = `https://tcms-upwork.herokuapp.com/api/confirmation/${token}`
    const refUrl = `https://tcms-upwork.herokuapp.com/register?refCode=${user.userID}`

    // send mail with defined transport object
    try {
        await transporter.sendMail({
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
    }
    catch (error) {
        console.log(error)
    }
    return 
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
