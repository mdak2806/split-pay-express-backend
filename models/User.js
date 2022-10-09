const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
    // _id: Schema.Types.ObjectId, 
    name: String,
    email: String, 
    profilePicture: String, 
    passwordDigest: String, 

    createdAt: {
        type: Date, 
        default: Date.now, 
    },

    // User address information
    address: {
        street: String, 
        postCode: String, 
        country: String, 
    }, 
   
    // User Bank Account details
    bankAcount: {
        accountName: String, 
        bsb: String, 
        accountNumber: String
    }, 

    //  Credit Card details
    creditCard: {
        cardNumber: String, 
        expiryDate: String,
        secuirtyNumber: String,
    },

    //  Adding Group to create the assoication

    groups: [
        {
           group:
           {
            ref: 'Group', 
            type: mongoose.Schema.Types.ObjectId
           } 
        }
    ], 

    // Adding User assoication to Debt Group

    groupDebts: [
        {
            groupDebt:
            {
                ref: 'GroupDebt',
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ],

    // Adding User assoication to User Debt
    userDebts: [
        {
            userDebt:
            {
                ref: 'UserDebt',
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ], 
    // Adding User assoication to Payments
    payments: [
        {
            payment:
            {
                ref: 'Payment',
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ]



}); // User Schema()

// UserSchema.hasMany('Group');
// UserSchema.hasMany('GroupDebt');
// UserSchema.hasMany('UserDebt');
// UserSchema.hasMany('Payment');

module.exports = mongoose.model('User', UserSchema)