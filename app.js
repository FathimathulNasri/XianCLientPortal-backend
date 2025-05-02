const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
const allowedOrigins = ['https://xian-client-portal.netlify.app', 'http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins
}));


// your routes...

app.use('/uploads', express.static('uploads'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));

module.exports = app;
