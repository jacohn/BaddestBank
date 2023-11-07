require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = process.env.MONGO



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

let db=null; 

async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      console.log("Connected to MongoDB!");
      db = client.db("badbank"); // Assign the correct database reference to `db`
    } catch (err) {
      console.error(err);
    }
  }

  async function initializeDb() {
    await run(); // Now we wait for the run function to complete
  }
  


// create user account
// create user account
async function create(name, email, password, balance) {
    try {
        console.log("Attempting to access 'users' collection...");
        const collection = db.collection('users');
        balance = parseInt(balance);
        const doc = {name, email, password, balance};
        
        console.log("Attempting to insert document:", doc);
        // Insert the document and wait for the result
        const result = await collection.insertOne(doc, {w:1});
        
        console.log("Document inserted successfully:", result);
        // If the insertion is successful, return the document
        return doc;
    } catch (err) {
        console.error("Error in create function:", err);
        // If there's an error, throw it
        throw err;
    }
}


// deposit into database
async function deposit(email, amount) {
    const collection = db.collection('users');
    amount = parseInt(amount);

    try {
        const result = await collection.updateOne(
            { "email": email },
            { $inc: { "balance": amount } }
        );

        if (result.matchedCount === 0) {
            throw new Error("User not found");
        } else {
            return result;
        }
    } catch (err) {
        throw err;
    }
}

// withdraw from database
async function withdraw(email, amount) {
    const collection = db.collection('users');
    amount = -parseInt(amount);

    try {
        const result = await collection.updateOne(
            { "email": email },
            { $inc: { "balance": amount } }
        );

        if (result.matchedCount === 0) {
            throw new Error("User not found");
        } else {
            return result;
        }
    } catch (err) {
        throw err;
    }
}


// find user account balance
async function balance(email) {
    const collection = db.collection('users');

    try {
        const docs = await collection.find({"email": email}).toArray();

        if (docs.length === 0) {
            
            return { message: "User not found", balance: null };
        }
        
        return { balance: docs[0].balance };
    } catch (err) {
        // Handle the error by returning an error message
        return { message: err.message, balance: null };
    }
}


// find user with given email and password, returns an empty array if doesn't exist
async function login(email, password) {
    const collection = db.collection('users');

    try {
        const user = await collection.findOne({
            email: email, 
            password: password
        });

        if (!user) {
            throw new Error("Login failed");
        }
        
        console.log(user);
        return user; 
    } catch (err) {
        throw err;
    }
}


// find user account
async function find(email) {
    const collection = db.collection('users');

    try {
        // Use await to wait for the promise to resolve
        const docs = await collection.find({ "email": email }).toArray();
        
        // Assuming you want to return all documents with this email (though there should typically be only one)
        return docs;
    } catch (err) {
        // If there's an error, throw it
        throw err;
    }
}


// all users
async function all() {
    const collection = db.collection('users');

    try {
        // Use await to wait for the promise to resolve
        const docs = await collection.find({}).toArray();
        
        // This will return all documents from the 'users' collection
        return docs;
    } catch (err) {
        // If there's an error, throw it
        throw err;
    }
}


async function logTransaction(email, type, amount) {
    const collection = db.collection('transactions');
    const doc = { email, type, amount, date: new Date() };

    try {
        // Use await to wait for the promise to resolve
        await collection.insertOne(doc, { w: 1 });
        
        // The operation was successful, so we return the document that was inserted
        return doc;
    } catch (err) {
        // If there's an error, throw it
        throw err;
    }
}


// retrieve all transactions for a user
async function getTransactions(email) {
    const collection = db.collection('transactions');

    try {
        // Use await to wait for the promise to resolve
        const docs = await collection.find({ "email": email }).toArray();
        
        // This will return all transactions for the given email
        return docs;
    } catch (err) {
        // If there's an error, throw it
        throw err;
    }
}

// Close the MongoDB connection when the Node.js process ends
process.on('SIGINT', async () => {
    console.log('Closing MongoDB connection');
    await client.close();
    process.exit(0);
  });
  
  module.exports = { create, all, deposit, withdraw, balance, login, initializeDb, find, run, logTransaction, getTransactions };