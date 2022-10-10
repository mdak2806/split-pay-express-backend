const mongoose = require('mongoose');

const UserDebtSchema = new mongoose.Schema({
    // Mongoose creates its own unquie ID
    // _id: Schema.Types.ObjectId, 

    totalAmount: Number, 
    description: String, 
    receipt: String, 
    // object to store the category
    category: {
            ref: 'Category',
            type: mongoose.Schema.Types.ObjectId,
        },
    //  object payee for User who will recieve payment
    payee: {
            ref: 'User', 
            type: mongoose.Schema.Types.ObjectId
        },
     // object payer for User who will make the payement
     payer: { 
            ref: 'User', 
            type: mongoose.Schema.Types.ObjectId
        }, 


}); // Schema()


UserDebtSchema.methods.savePayee = async function( user ){
    this.payee.push({user: user});
    await this.save();

    Payment.payee_id.push({user: this});
    await Payment.save();

    return this;
},

UserDebtSchema.methods.savePayer = async function( user ){
    this.payeer.push({user: user});
    await this.save();

    Payment.payer_id.push({user: this});
    await Payment.save();
    
    return this;
}
// UserDebtSchema.hasMany('User'),
// UserDebtSchema.belongsTo('Payment'),

module.exports = mongoose.model('UserDebt', UserDebtSchema )