const  mongoose = require('mongoose');

const GroupDebtSchema = new mongoose.Schema({
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

    group_id: [{
        group: {
            // Group Debt belongs to a group
            ref: 'Group', 
            // ID of the group
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

    // object payer for Users who will make the payement
    payer: [{
        user: {
            ref: 'User', 
            type: mongoose.Schema.Types.ObjectId
        }
    }], 

   

}); // Schema()

// GroupDebtSchema.hasMany('User');
// GroupDebtSchema.belongsTo('Group');
// GroupDebtSchema.hasMany('Payment');

module.exports = mongoose.model('Debt', GroupDebtSchema)