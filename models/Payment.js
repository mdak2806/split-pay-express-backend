const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId, 
    paymentAmount: Number,
    receipt: Number, 
    debt_id: [{
        GroupDebt: {
            ref: 'GroupDebt', 
            type: mongoose.Schema.Types.ObjectId
        },

        UserDebt: {
            ref: 'UserDebt',
            type: mongoose.Schema.Types.ObjectId
        },

    }],
    // user to recieve transaction
    payee_id: [{
        user: {
            ref: 'User', 
            type: mongoose.Schema.Types.ObjectId
        }
    }],
    // user to send transaction
    payer_id: [{
        user: {
            ref: 'User', 
            type: mongoose.Schema.Types.ObjectId
        }
    }], 
   

});



// PaymentSchema.belongsTo('UserDebt')
// PaymentSchema.hasMany('User')
// PaymentSchema.belongsTo('GroupDebt')
module.exports = mongoose.model('Payment', PaymentSchema)