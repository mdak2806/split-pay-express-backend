const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId, 
    categoryName: String, 

    // Adding Category assoication to Group

    groups: [
        {
                ref: 'Group',
                type: mongoose.Schema.Types.ObjectId
        }
    ],

    // Adding Category assoication to User Debt
    userDebts: [
        {
                ref: 'UserDebt',
                type: mongoose.Schema.Types.ObjectId
        }
    ], 
    // Adding Category assoication to Payments
    payments: [
        {
                ref: 'Payement',
                type: mongoose.Schema.Types.ObjectId
        }
    ]

})


module.exports = mongoose.model('Category', CategorySchema)