// const  mongoose = require('mongoose');
// const Payment = require('./Payment');
// const User = require('./User');

// const GroupDebtSchema = new mongoose.Schema({
//     // _id: Schema.Types.ObjectId, 
//     totalAmount: Number, 
//     description: String, 
//     receipt: String, 

//     // object to store the category
//     categories: [{

//         ref: 'Category',
//         type: mongoose.Schema.Types.ObjectId,

//     }], 

//     group_id: [{
//         group: {
//             // Group Debt belongs to a group
//             ref: 'Group', 
//             // ID of the group
//             type: mongoose.Schema.Types.ObjectId,
//         }
//     }],
//     //  object payee for User who will recieve payment
//     payee: [{
//         user: {
//             ref: 'User', 
//             type: mongoose.Schema.Types.ObjectId
//         }

//     }],

//     // object payer for Users who will make the payement
//     payer: [{
//         user: {
//             ref: 'User', 
//             type: mongoose.Schema.Types.ObjectId
//         }
//     }], 

   

// }); // Schema()

// GroupDebtSchema.methods.saveGroup = async function( group ){
//     this.group_id.push({group: group});
//     await this.save();

//     User.group_id.push({group: this});
//     await Payment.save();

//     return this;
// },

// GroupDebtSchema.methods.savePayer = async function( user ){
//     this.payeer.push({user: user});
//     await this.save();

//     Payment.payer_id.push({user: this});
//     await Payment.save();
    
//     return this;
// },
// GroupDebtSchema.methods.savePayer = async function( user ){
//     this.payeer.push({user: user});
//     await this.save();

//     Payment.payer_id.push({user: this});
//     await Payment.save();
    
//     return this;
// }


// // GroupDebtSchema.hasMany('User');
// // GroupDebtSchema.belongsTo('Group');
// // GroupDebtSchema.hasMany('Payment');

// module.exports = mongoose.model('Debt', GroupDebtSchema)