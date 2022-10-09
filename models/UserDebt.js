const mongoose = require('mongoose');

const UserDebtSchema = new mongoose.Schema({
    // Mongoose creates its own unquie ID
    // _id: Schema.Types.ObjectId, 

    totalAmount: Number, 
    description: String, 
    receipt: String, 
    // object to store the category
    category_id: [{
        category:{
            ref: 'Category',
            type: mongoose.Schema.Types.ObjectId,
        }
    }], 
    //  object payee for User who will recieve payment
    payee: [{
        user: {
            ref: 'User', 
            type: mongoose.Schema.Types.ObjectId
        }

    }],
     // object payer for User who will make the payement
     payer: [{ 
        user: {
            ref: 'User', 
            type: mongoose.Schema.Types.ObjectId
        }
    }], 


}); // Schema()

// UserDebtSchema.hasMany('User'),
// UserDebtSchema.belongsTo('Payment'),

module.exports = mongoose.model('UserDebt', UserDebtSchema )