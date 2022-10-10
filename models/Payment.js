const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId, 
    paymentAmount: Number,
    receipt: String, 
    group: {
            ref: 'Group', 
            type: mongoose.Schema.Types.ObjectId
        },

    userDebt: {
            ref: 'UserDebt',
            type: mongoose.Schema.Types.ObjectId
        },
    // user to recieve transaction
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



// PaymentSchema.belongsTo('UserDebt')
// PaymentSchema.hasMany('User')
// PaymentSchema.belongsTo('GroupDebt')
module.exports = mongoose.model('Payment', PaymentSchema)