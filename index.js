var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// check if a user already exist by searching database for the email
app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// create user account
app.get('/account/create/:name/:email/:password/:balance', function (req, res) {
    dal.create(req.params.name,req.params.email,req.params.password,req.params.balance).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// deposit into user account
app.get('/account/deposit/:email/:balance', function (req, res) {
    dal.deposit(req.params.email,req.params.balance).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// withdraw from user account
app.get('/account/withdraw/:email/:balance', function (req, res) {
    dal.withdraw(req.params.email,req.params.balance).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// user login 
app.get('/account/login/:email/:password', function (req, res) {
    dal.login(req.params.email,req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// user account balance
// user account balance
app.get('/account/balance/:email', function (req, res) {
    dal.balance(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);