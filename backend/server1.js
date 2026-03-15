const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'otpapp';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
  port: process.env.MAIL_PORT || 2525,         
  secure: false,     
  auth: {
    user: process.env.GMAIL_USER || '2b5da1dfa1b6ec',
    pass: process.env.GMAIL_PASSWORD || 'e5a2f9c4b1d8e7'
  }
});

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  // Attempt to send email but ensure OTP is stored regardless so verification works
  // In development: skip external SMTP to guarantee flow works locally
  if (process.env.NODE_ENV !== 'production') {
    try {
      const client = new MongoClient(mongoUrl);
      await client.connect();
      const db = client.db(dbName);
      await db.collection('otps').updateOne(
        { email },
        { $set: { email, otp, expiresAt } },
        { upsert: true }
      );
      await client.close();
      // Return OTP in response for local testing only
      return res.json({ message: 'OTP stored (dev mode).', otp });
    } catch (err) {
      console.error('OTP Store Error (dev):', err.message);
      return res.status(500).json({ message: 'Failed to store OTP' });
    }
  }

  // Production: attempt to send email but ensure OTP is stored
  let mailError = null;
  // ALWAYS Log OTP for debugging/demo purposes (Security Warning: Do not do this in real prod)
  console.log(`[DEBUG] Generated OTP for ${email}: ${otp}`);

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || transporter.options.auth.user || 'no-reply@example.com',
      to: email,
      subject: 'OTP for Campus Connect',
      text: `Your OTP is: ${otp}`
    });
  } catch (err) {
    mailError = err;
    console.error('OTP Send Error (email):', err.message);
  }

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(dbName);
    await db.collection('otps').updateOne(
      { email },
      { $set: { email, otp, expiresAt } },
      { upsert: true }
    );
    await client.close();

    if (mailError) return res.status(500).json({ message: 'Failed to send OTP email' });
    return res.json({ message: 'OTP sent successfully!' });
  } catch (err) {
    console.error('OTP Store Error:', err.message);
    return res.status(500).json({ message: 'Failed to store OTP' });
  }
});


app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(dbName);
    const record = await db.collection('otps').findOne({ email });
    await client.close();

    if (record && record.otp === otp && new Date() < new Date(record.expiresAt)) {
      res.json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid or expired OTP' });
    }
  } catch (err) {
    console.error('OTP Verification Error:', err.message);
    res.status(500).json({ message: 'Verification failed' });
  }
});


app.post('/register', async (req, res) => {
  const { firstName, lastName, email, studentId, department, password } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(dbName);

    const existing = await db.collection('users').findOne({ email });
    if (existing) {
      await client.close();
      return res.status(409).json({ message: 'User already registered' });
    }

    await db.collection('users').insertOne({
      firstName,
      lastName,
      email,
      studentId,
      department,
      password,
      joinedDate: new Date()
    });
    await client.close();

    res.json({ message: 'Registration successful!' });
  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ message: 'Registration failed' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(dbName);
    const user = await db.collection('users').findOne({ email });
    await client.close();

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.json({ 
      message: 'Login successful', 
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        studentId: user.studentId,
        department: user.department,
        joinedDate: user.joinedDate || new Date(),
      }
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Login failed' });
  }
});

app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
