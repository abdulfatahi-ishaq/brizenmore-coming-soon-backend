const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const transporter = nodemailer.createTransport({
  host: 'premiumtrustfinancials.com',
  port: 465,
  secure: true,
  auth: {
    user: 'admin@premiumtrustfinancials.com',
    pass: 'Admin@2021!',
  },
});

app.post('/send-mail', (req, res) => {
  const { fullname, email } = req.body;
  console.log(req.body);
  const mailOptions = {
    from: '"Admin", admin@premiumtrustfinancials.com',
    to: 'info@brixenmore.com',
    subject: 'New Subscriber',
    html: `
        <h2 style="font-size: 18px; color: #1ee0ac; font-weight: 600; margin: 0;">New Subscriber To Waitlist</h2>
        <p>The following user has requested to be added to your waitlist</p>
        <p style="margin-bottom: 10px;"><b>Subscriber Name: ${fullname}</b></p>
        <p style="margin-bottom: 10px;"><b>Subscriber Email: ${email}</b></p>
        `,
  };
  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      res.json({ err, message: 'Mail Not Sent' });
      console.log(err);
    } else {
      res.json({ result, message: 'Successful!' });
      console.log(result);
    }
  });
});

app.listen(process.env.PORT || 3019, function () {
  console.log('Server started on port 3019:');
});
