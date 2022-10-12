const mongoose = require('mongoose');
const Payment = require('./Payment');

const GroupSchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId, 
    groupName: String, 
    description: String, 
    numberUsers: Number, 
    users: [ 
        {
            // A group belongs to many users
            ref: 'User', 
            type: mongoose.Schema.Types.ObjectId
         
        }
    ], 
    // Creating an assoication with Group and Group Debts
    groupDebts: [{
        amount: Number,
        description: String,
        receipt: String, 

        category: {
            ref: 'Category', 
            type: mongoose.Schema.Types.ObjectId
        },
        payee: {
            ref: 'User', 
            type: mongoose.Schema.Types.ObjectId
        },
        payers:[{
            ref: 'User', 
            type: mongoose.Schema.Types.ObjectId 
        }]


    }]

});

// customer model method to save the information
GroupSchema.methods.saveUser = async function( user ){

    console.log(`GroupSchema saveUser`,user);

    // Save our new group with the user
    this.users.push(user);
    await this.save();

    user.groups.push(this);

    await user.save();

    
    // chain the method and return relevant data
    return this;
  
}

// customer model method to save the information
// GroupSchema.methods.saveGroupDebt = async function( groupDebt ){

//     // Save our new debt to the group
//     this.groupDebts.push({groupDebt: groupDebt});
//     await this.save();

//     // also save onto the Payment model
//     Payment.debt_id.push({ groupDebt: this})
//     // chain the method and return relevant data
//     return this;

// }
// // GroupSchema.hasMany('User'),
// GroupSchema.hasMany('GroupDebt'),
// GroupSchema.hasMany('Payment'),

module.exports = mongoose.model('Group', GroupSchema)