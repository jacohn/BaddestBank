const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb://localhost:27017';
let db            = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('badbank');
});

// create user account
function create(name, email, password, balance) {
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        balance = parseInt(balance);
        const doc = {name, email, password, balance};
        
        collection.insertOne(doc, {w:1}, function(err, result) {
            // Record the account creation transaction
            logTransaction(email, "account creation", 0);
            err ? reject(err) : resolve(doc);
        });    
    })
}

// deposit into database
function deposit(email, amount) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        amount = parseInt(amount);
        collection.updateOne(
            { "email": email },
            { $inc: { "balance": amount } },
            function(err, result) {
                if (err) {
                    reject(err);
                } else if (result.matchedCount === 0) {
                    reject("User not found");
                } else {
                    resolve(result);
                }
            }
        )
    });
}

// withdraw from database
function withdraw(email, amount) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        amount = -parseInt(amount);
        collection.updateOne(
            { "email": email },
            { $inc: { "balance": amount } },
            function(err, result) {
                if (err) {
                    reject(err);
                } else if (result.matchedCount === 0) {
                    reject("User not found");
                } else {
                    resolve(result);
                }
            }
        )
    });
}

// find user account balance
function balance(email) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');        
        collection.find({"email":email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            }); 
    });   
}

// find user with given email and password, returns an empty array if doesn't exist
function login(email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');        
        collection.find({
            $and: [
                {"email": {$eq: email}}, 
                {"password": {$eq: password}}
            ]
        })
        .toArray(function(err, docs) {
            err ? reject(err) : resolve(docs);
        }); 
    });   
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({"email": email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

function logTransaction(email, type, amount) {
    return new Promise((resolve, reject) => {    
        const collection = db.collection('transactions');
        const doc = {email, type, amount, date: new Date()};
        
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// retrieve all transactions for a user
function getTransactions(email) {
    return new Promise((resolve, reject) => {    
        const collection = db.collection('transactions');
        collection.find({"email": email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

module.exports = {create, all, deposit, withdraw, balance, login, find, logTransaction, getTransactions};
