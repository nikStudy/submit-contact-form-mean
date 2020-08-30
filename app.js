if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const sendMail = require('./mail');

const app = express();
const path = require('path');

const PORT = 4000;

app.use(cors());

// data parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// email, subject, text
app.post('/email', (req, res) => {
    // send email here
    console.log('Email: ' + req.body.email);
    console.log('Subject: ' + req.body.subject);
    console.log('Text: ' + req.body.mssg);
    const email = req.body.email;
    const subject = req.body.subject;
    const text = req.body.mssg;
    sendMail(email, subject, text, function(err, data) {
        if (err) {
            res.status(500).json({ message: 'Internal Error', success: false });
        } else {
            res.json({ message: 'Message sent!!!', success: true });
        }
    });
    
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// listen for requests
app.listen(PORT, () => {
    console.log('Server now listening for requests on port, ', PORT);
})