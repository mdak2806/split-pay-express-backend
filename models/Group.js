const mongoose = require('mongoose');

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

// GroupSchema.hasMany('User'),
// GroupSchema.hasMany('GroupDebt'),
// GroupSchema.hasMany('Payment'),

module.exports = mongoose.model('Group', GroupSchema)