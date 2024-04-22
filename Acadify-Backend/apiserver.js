const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const app = express();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const router = express.Router();

app.use(compression());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', router);

const conn = mongoose.createConnection('mongodb+srv://harshitshukla:945252786@acadify.zsiyyca.mongodb.net/Acadify');

conn.on('open', () => {
    console.log('Connection to MongoDB established...');
});

conn.on('error', (err) => {
    console.log(err);
});

const questionSchema = new mongoose.Schema({}, { strict: false }); // Use a non-strict schema to allow any structure
const Question = conn.model('Question', questionSchema, 'Quiz'); // The 'Quiz' collection

router.get('/api/questions', async (req, res) => {
    const questions = await Question.find({});
    res.json(questions);
});

const questionSchema1 = new mongoose.Schema({}, { strict: false }); // Use a non-strict schema to allow any structure
const Question1 = conn.model('Question1', questionSchema1, 'Code'); // The 'Code' collection

router.get('/api/questions1', async (req, res) => {
    const questions = await Question1.find({});
    res.json(questions);
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    educational_institute: {
        type: String,
        default: "Lovely Professional University"
    },
    password: String,
    otp: Number
});

const User = conn.model('User', userSchema, 'User'); // The 'User' collection

router.post('/api/user/getotp', async (req, res) => {
    const { email } = req.body;
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);

    // Save OTP in user's document
    let user = await User.findOne({ email });
    if (!user) {
        user = new User({ email, otp });
    } else {
        user.otp = otp;
    }
    await user.save();
    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail', // replace with your email service
        auth: {
            user: 'contact.acadify@gmail.com', // replace with your email
            pass: 'hvdi fhrm dmiz xxfq' // replace with your password
        }
    });

    // Set up email data
    let mailOptions = {
        from: 'contact.acadify+otp@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Your OTP', // Subject line
        text: `Your OTP is ${otp}` // plain text body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error while sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('OTP sent');
        }
    });
});

// Route to verify OTP
router.post('/api/user/verifyotp', async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    console.log('OTP from request:', otp); // Add this line
    console.log('OTP from database:', user ? user.otp : 'User not found'); // Add this line
    if (user && String(user.otp) === String(otp)) {
        res.json({ msg: 'Verification Success' });
    } else {
        res.json({ msg: 'Verification Failed' });
    }
});

// Route to sign up
router.post('/api/user/signup', async (req, res) => {
    const { firstName, lastName, username, email, educational_institute, password } = req.body;
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ firstName, lastName, username, email, educational_institute, password: hashedPassword });
    await user.save();
    res.json({ msg: 'User Created Successfully' });
});
router.get('/api/user/logout', (req, res) => {
    // Delete the cookie
    res.clearCookie('token');
    res.json({ msg: 'Logged out' });
});

router.post('/api/user/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
        // Verify the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            // Generate a JWT
            const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY');
            // Store the JWT in a cookie
            res.cookie('token', token, { httpOnly: true });
            res.json({ msg: 'Log In Success', token });
        } else {
            res.json({ msg: 'Invalid password' });
        }
    } else {
        res.json({ msg: 'User not found' });
    }
});

app.get('/api/user/checkAuth', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ isLoggedIn: false });
    }

    try {
        jwt.verify(token, 'YOUR_SECRET_KEY');
        return res.json({ isLoggedIn: true });
    } catch (err) {
        console.error(err);
        return res.json({ isLoggedIn: false });
    }
});

module.exports = app;