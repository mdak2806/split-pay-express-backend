const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId, 
    categoryName: String, 

    // Adding Category assoication to Debt Group

    groupDebts: [
        {
            groupDebt:
            {
                ref: 'GroupDebt',
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ],

    // Adding Category assoication to User Debt
    userDebts: [
        {
            userDebt:
            {
                ref: 'UserDebt',
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ], 
    // Adding Category assoication to Payments
    payments: [
        {
            payment:
            {
                ref: 'Payement',
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ]

})


module.exports = mongoose.model('Category', CategorySchema)