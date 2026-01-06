require('./config/env');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/skills', require('./routes/skill.routes'));

const errorHandler = require('./middleware/error.middleware');

// after all routes
app.use(errorHandler);


module.exports = app;
