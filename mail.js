const path = require('path');
require('dotenv').config({path: __dirname + '../.env'})

const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: process.env.MAILGUN_api_key,
        domain: process.env.MAILGUN_domain
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        // from: 'nikwok123@gmail.com',
        // to: 'nikhil.mittal60@gmail.com',
        // subject: 'Testing',
        // text: 'I would like to get in touch with you'
        from: email,
        to: 'nikhil.mittal60@gmail.com',
        subject: subject,
        text: text
    }
    
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            // console.log('Error Occurs');
            cb(err, null);
        } else {
            // console.log('Message sent!!!');
            cb(null, data);
        }
    });
}

module.exports = sendMail;
