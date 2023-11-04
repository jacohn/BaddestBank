var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
var swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());


// Swagger definition
var swaggerDefinition = {
    info: {
      title: 'BadBank API Documentation',
      version: '1.0.0',
      description: 'low security for everyone!',
    },
    host: 'localhost:3000',
    basePath: '/',
  };
  
  // Options for the swagger docs
  var options = {
    // Import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // Path to the API docs
    apis: ['./index.js'],
  };
  
  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  var swaggerSpec = swaggerJSDoc(options);
  

/**
 * @swagger
 * /api-docs:
 *   use:
 *     summary: BadBank API Documentation.
 *     description: a bunch of gets!.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response.
 *       500:
 *         description: Error
 *     parameters:

 */

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// check if a user already exist by searching database for the email

/**
 * @swagger
 * /account/transactions/:email:
 *   get:
 *     summary: get transaction information for one account
 *     description: Uses email to get all transaction details
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response.
 *       500:
 *         description: Error
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         type: string

 */

app.get('/account/transactions/:email', function (req, res) {
    dal.getTransactions(req.params.email).
        then((transactions) => {
            console.log(transactions);
            res.send(transactions);
        });
});



/**
 * @swagger
 * /account/find/:email:
 *   get:
 *     summary: Locates a single user's information
 *     description: Uses email to locate a user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response.
 *       500:
 *         description: Error
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         type: string

 */

app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// create user account

/**
 * @swagger
 * /account/create:
 *   post:
 *     summary: Create a new user account
 *     description: Registers a new user with a name, email, and initial balance.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - email
 *             - password
 *             - balance
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             balance:
 *               type: number
 *     responses:
 *       200:
 *         description: Account created successfully
 *       400:
 *         description: Error occurred
 */


app.get('/account/create/:name/:email/:password/:balance', function (req, res) {
    dal.create(req.params.name,req.params.email,req.params.password,req.params.balance).
        then((user) => {
            dal.logTransaction(req.params.email, 'Account Creation', req.params.balance, req.params.balance)
                .then(() => {
                    console.log(user);
                    res.send(user);
                });
        });    
});

// deposit into user account


/**
 * @swagger
 * /account/deposit/{email}/{amount}:
 *   post:
 *     summary: Deposit money into an account
 *     description: Adds a specified amount of money to the user's account balance.
 *     parameters:
 *       - in: path
 *         name: email
 *         type: string
 *         required: true
 *         description: The email of the user to deposit to.
 *       - in: path
 *         name: amount
 *         type: number
 *         required: true
 *         description: The amount to deposit.
 *     responses:
 *       200:
 *         description: Deposit completed successfully
 *       400:
 *         description: Error occurred
 */

app.get('/account/deposit/:email/:balance', function (req, res) {
    dal.deposit(req.params.email,req.params.balance).
        then((user) => {
            dal.balance(req.params.email)
                .then((balanceData) => {
                    let newBalance = balanceData[0].balance;
                    dal.logTransaction(req.params.email, 'Deposit', req.params.balance, newBalance)
                        .then(() => {
                            console.log(user);
                            res.send(user);
                        });
                });
        });    
});

// withdraw from user account

/**
 * @swagger
 * /account/withdraw/{email}/{amount}:
 *   post:
 *     summary: Withdraw money from an account
 *     description: Deducts a specified amount of money from the user's account balance.
 *     parameters:
 *       - in: path
 *         name: email
 *         type: string
 *         required: true
 *         description: The email of the user to withdraw from.
 *       - in: path
 *         name: amount
 *         type: number
 *         required: true
 *         description: The amount to withdraw.
 *     responses:
 *       200:
 *         description: Withdrawal completed successfully
 *       400:
 *         description: Error occurred
 */

app.get('/account/withdraw/:email/:balance', function (req, res) {
    dal.withdraw(req.params.email,req.params.balance).
        then((user) => {
            dal.balance(req.params.email)
                .then((balanceData) => {
                    let newBalance = balanceData[0].balance;
                    dal.logTransaction(req.params.email, 'Withdraw', req.params.balance, newBalance)
                        .then(() => {
                            console.log(user);
                            res.send(user);
                        });
                });
        });    
});

// user login 


/**
 * @swagger
 * /account/login/:email/:password:
 *   get:
 *     summary: logs a user in.
 *     description: uses email and password to authenticate and log in user.
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response.
 *       500:
 *         description: Error
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *       - name: password
 *         in: path
 *         required: true
 *         type: string

 */

app.get('/account/login/:email/:password', function (req, res) {
    dal.login(req.params.email,req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// user account balance

/**
 * @swagger
 * /account/balance/{email}:
 *   get:
 *     summary: Get account balance
 *     description: Retrieves the current balance of the user's account.
 *     parameters:
 *       - in: path
 *         name: email
 *         type: string
 *         required: true
 *         description: The email of the user to get the balance for.
 *     responses:
 *       200:
 *         description: Balance retrieved successfully
 *       404:
 *         description: Account not found
 */

app.get('/account/balance/:email', function (req, res) {
    dal.balance(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// all accounts

/**
 * @swagger
 * /account/all:
 *   get:
 *     summary: Get all accounts data
 *     description: Fetches data of all user accounts including transactions.
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *       500:
 *         description: Error occurred
 */

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
// get all transactions for a user
