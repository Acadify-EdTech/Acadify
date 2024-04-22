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
        html: `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
          <title>
          </title>
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <!--<![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
            #outlook a {
              padding: 0;
            }
        
            body {
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
        
            table,
            td {
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
        
            img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
        
            p {
              display: block;
              margin: 13px 0;
            }
          </style>
          <!--[if mso]>
                <noscript>
                <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG/>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
                </xml>
                </noscript>
                <![endif]-->
          <!--[if lte mso 11]>
                <style type="text/css">
                  .mj-outlook-group-fix { width:100% !important; }
                </style>
                <![endif]-->
          <style type="text/css">
            @media only screen and (min-width:480px) {
              .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
              }
            }
          </style>
          <style media="screen and (min-width:480px)">
            .moz-text-html .mj-column-per-100 {
              width: 100% !important;
              max-width: 100%;
            }
          </style>
          <style type="text/css">
          </style>
        </head>
        
        <body style="word-spacing:normal;background-color:#ffdbc8;">
          <div style="background-color:#ffdbc8;">
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#fff8f5" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="background:#fff8f5;background-color:#fff8f5;margin:0px auto;border-radius:20px 20px 0 0;max-width:600px;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff8f5;background-color:#fff8f5;width:100%;border-radius:20px 20px 0 0;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                          <tbody>
                            <tr>
                              <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                <div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#221a15;">
                                  <p style="line-height: 18px; margin: 10px 0; text-align: center;font-size:16px;color:#221a15;"><b>ACADIFY</b></p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#fff8f5" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="background:#fff8f5;background-color:#fff8f5;margin:0px auto;max-width:600px;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff8f5;background-color:#fff8f5;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                          <tbody>
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#fff8f5" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="background:#fff8f5;background-color:#fff8f5;margin:0px auto;max-width:600px;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff8f5;background-color:#fff8f5;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                          <tbody>
                            <tr>
                              <td align="left" style="font-size:0px;padding:10px 25px;padding-top:25px;padding-bottom:5px;word-break:break-word;">
                                <div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#221a15;">
                                  <p style="line-height: 60px; text-align: center; margin: 10px 0;font-size:55px;color:#221a15;font-family:monospace;letter-spacing:20px;"><b>${otp}</b></p>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:20px;word-break:break-word;">
                                <div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#221a15;"></div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#fff8f5" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="background:#fff8f5;background-color:#fff8f5;margin:0px auto;border-radius:0 0 20px 20px;max-width:600px;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff8f5;background-color:#fff8f5;width:100%;border-radius:0 0 20px 20px;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:0 0 0 0;padding-bottom:40px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                          <tbody>
                            <tr>
                              <td align="left" style="font-size:0px;padding:10px 25px;padding-top:5px;padding-bottom:0px;word-break:break-word;">
                                <div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#221a15;">
                                  <p style="line-height: 16px; text-align: center; margin: 10px 0;font-size:12px;color:#221a15;font-family:'Times New Roman',Helvetica,Arial,sans-serif">* Do not share your OTP with anyone else.&nbsp;<br /><span style="color:#221a15;font-family:'Times New Roman',Helvetica,Arial,sans-serif">This OTP is only valid for 10 minutes. If you did not generate this otp, please contact us.</span></p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#fff8f5" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="background:#fff8f5;background-color:#fff8f5;margin:0px auto;max-width:600px;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff8f5;background-color:#fff8f5;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                          <tbody>
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]></td></tr></table><![endif]-->
          </div>
        </body>
        
        </html>`
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

router.post('/api/user/logout', (req, res) => {
    // Delete the cookie
    res.clearCookie('token', { path: '/' });
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

router.get('/api/user/checkAuth', (req, res) => {
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

router.get('/api/check-token', (req, res) => {
    const token = req.cookies.token; // Assuming the token is sent in a cookie

    if (!token) {
        return res.json({ valid: false });
    }

    try {
        jwt.verify(token, 'YOUR_SECRET_KEY'); // Replace 'YOUR_SECRET_KEY' with your actual secret key
        return res.json({ valid: true });
    } catch (err) {
        console.error(err);
        return res.json({ valid: false });
    }
});

module.exports = app;