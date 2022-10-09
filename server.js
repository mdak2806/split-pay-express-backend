const express = require('express');
const app = express();
const PORT = 3000; 

const cors = require('cors');
// Use this CORS package as part of the Express
// set the CORS allow header for us on every request, for AJAX requests
app.use( cors() ); 

// To get access to POSTed 'formdata' body content

app.use( express.json());
app.use(express.urlencoded( {extended: true }))


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT} ...`);
});

// Mongoose DB initialisation
const mongoose = require('mongoose');
const User = require('./models/User');
const Category = require('./models/Category');
const Payment = require('./models/Payment');
const UserDebt= require('./models/UserDebt');
const GroupDebt = require('./models/GroupDebt');
const Group = require('./models/Group');


mongoose.connect('mongodb://127.0.0.1/split_pay');
const db = mongoose.connection;

db.on('error', err => {
  console.log('Error connecting to DB server', err);
  process.exit( 1 );

});

// Split Pay Routes
app.get('/', (req, res) => {
    console.log('Root route was requested.');
    res.json( { hello: 'TEST to see if connected' } );
  });


// Index Users 
  app.get('/users', async(req, res) => {
    try{
        const users = await User.find();
        res.json(users)

    } catch( err ){
        console.error('Error loading all Users:', err);

        // res.sendStatus(422);
        res.status(422).json({error: 'Db connection error'})
    }
  }); // Get/Users

  // Show Page Users

  app.get('/users/:id', async(req, res) => {

    try{
        const user = await User.findOne({
            _id: req.params.id
        });

        console.log('user', user);
        res.send({ user})

    } catch(err){
        console.log('Error finding User by ID:', req.params, err);
        res.sendStatus( 422 );
    }

  });


//   Index Categories
  app.get('/categories', async(req, res) => {
    try{
        const categories = await Category.find();
        res.json(categories)

    } catch( err ){
        console.error('Error loading all Categories:', err);

        // res.sendStatus(422);
        res.status(422).json({error: 'Db connection error'})
    }
  }); // Get/Categoeris


// Index Groups page
  app.get('/groups', async(req, res) => {
    try{
        const groups = await Group.find();
        res.json(groups)

    } catch( err ){
        console.error('Error loading all Groups:', err);

        // res.sendStatus(422);
        res.status(422).json({error: 'Db connection error'})
    }
  }); // Get/groups

//   TODO: Group specific show page add req.params



// Index groupDebts
// TODO: Show page for User Debts


// TODO: EDIT page
// TODO: Delete page - once posted/ complete

  app.get('/groupDebts', async(req, res) => {
    try{
        const groupDebts = await GroupDebt.find();
        res.json(groupDebts)

    } catch( err ){
        console.error('Error loading all GroupDebt', err);

        // res.sendStatus(422);
        res.status(422).json({error: 'Db connection error'})
    }
  }); // Get/groupDebts


//   Index UserDebts page
// TODO: Show page for User Debts
// TODO: EDIT page
// TODO: Delete page - once posted/ complete

  app.get('/userDebts', async(req, res) => {
    try{
        const userDebts = await UserDebt.find();
        res.json(userDebts)

    } catch( err ){
        console.error('Error loading all UserDebt:', err);

        // res.sendStatus(422);
        res.status(422).json({error: 'Db connection error'})
    }
  }); // Get/userDebts

//   Index Payments page

  app.get('/payment', async(req, res) => {
    try{
        const payment = await Payment.find();
        res.json(payment)

    } catch( err ){
        console.error('Error loading all payment:', err);

        // res.sendStatus(422);
        res.status(422).json({error: 'Db connection error'})
    }
  }); // Get/payment

//   TODO: Payment show page

// TODO: Payment Post page