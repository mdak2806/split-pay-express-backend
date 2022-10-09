const mongoose = require('mongoose');
const Payment = require('./Payment');

const GroupSchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId, 
    groupName: String, 
    description: String, 
    numberUsers: Number, 
    users: [ 
        {
        user: 
            {
                // A group belongs to many users
                ref: 'User', 
                type: mongoose.Schema.Types.ObjectId
            }, 
        }
    ], 
    // Creating an assoication with Group and Group Debts
    groupDebts: [
        {
            groupDebt:
            {
                ref: 'GroupDebt', 
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ]

});

// customer model method to save the information
GroupSchema.methods.saveUser = async function( user ){

    // Save our new group with the user
    this.users.push({user: user});
    await this.save();
    
    // chain the method and return relevant data
    return this;

}

// customer model method to save the information
GroupSchema.methods.saveGroupDebt = async function( groupDebt ){

    // Save our new debt to the group
    this.groupDebts.push({groupDebt: groupDebt});
    await this.save();

    // also save onto the Payment model
    Payment.debt_id.push({ groupDebt: this})
    // chain the method and return relevant data
    return this;

}
// GroupSchema.hasMany('User'),
// GroupSchema.hasMany('GroupDebt'),
// GroupSchema.hasMany('Payment'),

module.exports = mongoose.model('Group', GroupSchema)