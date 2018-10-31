const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routers/api/users');
const passport = require('passport');
 //Body parser midleware
 app.use(bodyParser.urlencoded({extended:false}));
 app.use(bodyParser.json());

 //DB config
 const db = require('./config/keys').mongoURI;

 //connnect to MongoDB

 mongoose
   .connect(db)
   .then(()=> console.log('MongoDB connected'))
   .catch(err => console.log(err))
//passport midelware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);
app.use('/api/users',users);
const port = process.env.port || 5000;

app.listen(port,() => console.log(`server running on port ${port}`))