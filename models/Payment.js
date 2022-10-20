const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId, 
    paymentAmount: Number,
    receipt: String, 
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    users: [ 
        {
            // A group belongs to many users
            ref: 'User', 
            type: mongoose.Schema.Types.ObjectId
         
        }
    ], 
    group: {
            ref: 'Group', 
            type: mongoose.Schema.Types.ObjectId
        },
    payee:{
            ref: 'User', 
            type: mongoose.Schema.Types.ObjectId
        },
    // user to send transaction
    payer: {
            ref: 'User', 
            type: mongoose.Schema.Types.ObjectId
        },
   

});

// customer model method to save the information
PaymentSchema.methods.saveUser = async function( user ){

    // Save our new payment with the user
    this.users.push(user);
    await this.save();

    user.payments.push(this);


    await user.save();

    
    // chain the method and return relevant data
    return this;
  
}


module.exports = mongoose.model('Payment', PaymentSchema)