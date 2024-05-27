const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'thisisnotagoodsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }))

app.get('/', (req, res) => {
    res.send("connected");
})

app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    
    if (req.session.count === 1) {
        res.send(`YOU HAVE VIEWED THIS PAGE ${req.session.count} TIME`)
    } else {
        res.send(`YOU HAVE VIEWED THIS PAGE ${req.session.count} TIMES`)
    }
})

app.get('/register', (req, res) => {
    const { username = 'anonymous' } = req.query;
    req.session.username = username;
    res.redirect('/greet');
})

app.get('/greet', (req, res) => {
    const { username } = req.session;
    res.send(`Welcome back, ${username}!`)
})



app.listen(3000, () => {
    console.log('APP CONNECTED ON PORT 3000!!!');
})