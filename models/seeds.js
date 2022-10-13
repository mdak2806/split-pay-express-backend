const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Load models
const User = require('./User');
const Payment = require('./Payment');
const Group = require('./Group');
// const GroupDebt = require('./GroupDebt');
const Category = require('./Category');
const UserDebt = require('./UserDebt');
require('dotenv').config();

// Give a path to the Seeds DATA
mongoose.connect(process.env.MONGODB_CLOUD_URL);

const db = mongoose.connection;

// loading and controlling the errors below

db.on('error', err => {
    console.log('DB Connection error', err);
    process.exit( 1 ); // quit the program
  });


// loading and controlling success

db.once('open', async () => {

    console.log('Success! DB connected, model loaded');

    // 1. USERS

    // ActiveRecord DELETE
    await User.deleteMany();
    // ActiveRecord Create
    const createdUsers = await User.create([
        {
            name: 'Mohamad', 
            email: 'mdak2806@gmail.com',
            passwordDigest: bcrypt.hashSync('chicken', 10),

            address: {
                street: '80 Station St',
                postCode: '2200', 
                Country: 'Australia'
            }, 

            bankAcount: {
                accountName: 'Mohamad',
                bsb: '002333', 
                accountNumber: '223848',
            },

            creditCard: {
                // 
                cardNumber: '3333444455556666', 
                // Date object Departure Date
                expiryDate: `11/22`, 
                securityNumber: '222'

            }, 
            // groups: [
            //     createdGroups[0],
            //     createdGroups[1]   
            // ], 
            // payments: [
            //     createdPayments[0],createdPayments[1], createdPayments[3]
            // ]
        }, 

        {
            name: 'Wen', 
            email: 'wen@gmail.com',
            passwordDigest: bcrypt.hashSync('chicken', 10),

            address: {
                street: '34 Station St',
                postCode: '2200', 
                Country: 'Australia'
            }, 

            bankAcount: {
                accountName: 'Wen',
                bsb: '002311', 
                accountNumber: '223811',
            },

            creditCard: {
                cardNumber: '3333444455551111', 
                expiryDate: `11/22`, 
                securityNumber: '111',

            },
            // groups: [
            //     createdGroups[0], 
            //     createdGroups[2]   
            // ], 
            // userDebts: [
            //     createdUserDebts[0]
            // ],
            // payments: [
            //      createdPayments[0], createdPayments[3]
            // ]
        }, 
        {
            name: 'Craig', 
            email: 'craig@gmail.com',
            passwordDigest: bcrypt.hashSync('chicken', 10),

            address: {
                street: '90 Station St',
                postCode: '2200', 
                Country: 'Australia'
            }, 

            bankAcount: {
                accountName: 'Craig',
                bsb: '002322', 
                accountNumber: '223822',
            },

            creditCard: {
                cardNumber: '3333444455552222', 
                expiryDate: `12/22`, 
                securityNumber: '222',

            },
            // groups: [
            //     createdGroups[0], createdGroups[1],
            //     createdGroups[2]   
            // ], 
            // payments: [
            //      createdPayments[3]
            // ]
        }, 
        {
            name: 'Kris', 
            email: 'kris@gmail.com',
            passwordDigest: bcrypt.hashSync('chicken', 10),

            address: {
                street: '30 Station St',
                postCode: '2200', 
                Country: 'Australia'
            }, 

            bankAcount: {
                accountName: 'Kris',
                // Store bsb and Account as a string
                bsb: '002300', 
                accountNumber: '223800',
            },

            creditCard: {
                // 
                cardNumber: '3333444455550000', 
                expiryDate: `12/22`, 
                securityNumber: '000',

            },
            // groups: [
            //      createdGroups[1],createdGroups[2]   
            // ], 
            // payments: [
            // createdPayments[2]
            // ]
        },
        {
            name: 'Luke', 
            email: 'luke@gmail.com',
            passwordDigest: bcrypt.hashSync('chicken', 10),

            address: {
                street: '2 Station St',
                postCode: '2200', 
                Country: 'Australia'
            }, 

            bankAcount: {
                accountName: 'Luke',
                // Store bsb and Account as a string
                bsb: '002311', 
                accountNumber: '223811',
            },

            creditCard: {
                // 
                cardNumber: '3333444455550001', 
                expiryDate: `12/22`, 
                securityNumber: '001',

            },
            // groups: [
            //     createdGroups[1], createdGroups[2]   
            // ], 
            // userDebts: [
            //     createdUserDebts[0]
            // ],
            // payments: [
            //      createdPayments[3]
            // ]
        },



        




    ]);
    console.log('Users:', createdUsers)


        // 2. Categories

        // ActiveRecord: Delete Categories
        await Category.deleteMany();

        // ActiveRecord: Categories Create

        const createdCaregories = await Category.create([

            {
                categoryName: 'Entertainment',
            },
            {
                categoryName:'Utilities',
            },
            {
                categoryName: 'Groceries',
            },
            {
                categoryName: 'Accesslth',
            }, 
            {
                categoryName: 'Holidays',
            },
            {
                categoryName: 'Transport',
            }, 
            {
                categoryName: 'Shopping',
            },
            {
                categoryName: 'Eating Out',
            },
            {
                categoryName: 'Rent',   
            },
            {
                categoryName: 'Mortgage',
            }, 
            {
                categoryName: 'Gifts',
            }, 
            {
                categoryName: 'General'
            },

        ]);

     console.log('Categories:', createdCaregories)

    // 3. Groups
        // ActiveRecord: Delete Categories
        await Group.deleteMany();

        // ActiveRecord: Categories Create

        const createdGroups = await Group.create([ 
            {
                groupName: 'HouseHold',
                description: 'House share bills with roommates',
                numberUsers: 3,
                users: [
                    // createdUsers[0],
                    // createdUsers[1], createdUsers[2]
                ], 
                groupDebts: {
                    amount: 180, 
                    description: 'Split of household expense electrical bills', 
                    category: createdCaregories[4], 
                    payee:createdUsers[0],
                    payer: [   {
                        share: 60, 
                        users: createdUsers[1]
                    },
                    {
                        share: 60, 
                        users: createdUsers[2]
                    },
                   ],  
                }
            }, // group 0

            {
                groupName: 'Holiday',
                description: 'Holiday bill spliting',
                numberUsers: 4,
                users: [ 
                    // // createdUsers[0],
                    // createdUsers[2],
                    // createdUsers[3],
                    // createdUsers[4],
                ], 
                groupDebts: [{
                    amount: 4000, 
                    description: 'Split of household expense rent bills', 
                    category: createdCaregories[7], 
                    payee:createdUsers[2],
                    payers: [
                        {
                            share: 1000, 
                            users: createdUsers[0]
                        },
                        {
                            share: 1000, 
                            users: createdUsers[3]
                        },
                        {
                            share: 1000, 
                            users: createdUsers[4]
                        }
                        ], 

                    }
                ]
            },
            {
                    amount: 2000, 
                    description: 'Split of holiday travel', 
                    category: createdCaregories[7], 
                    payee: createdUsers[3],
                    payers: [
                        {
                            share: 500, 
                            users: createdUsers[1]
                        },
                        {
                            share: 500, 
                            users: createdUsers[2]
                        },
                        {
                            share: 500, 
                            users: createdUsers[4]
                        }
                        ]
            },
         
            //     amount: 100,
            //     groupName: 'Social',
            //     description: 'Eating out spliting',
            //     numberUsers: 4,
            //     users: [
            //         // createdUsers[1],
            //         // createdUsers[2],
            //         // createdUsers[3],
            //         // createdUsers[4],
            //     ]
            // }, 

        ]);

        console.log('createdGroups:', createdGroups)


        // Individual User to User Debt
        await UserDebt.deleteMany();

        const createdUserDebts = await UserDebt.create([

            {
                totalAmount: 200, 
                description: 'Split dinner', 
                category: createdCaregories[7], 
                payee: createdUsers[1],
                payer:  createdUsers[4]

            }, 
            {
                totalAmount: 400, 
                description: 'Split dinner', 
                category: createdCaregories[7], 
                payee: createdUsers[2],
                payer:  createdUsers[3]

            }, 

        ]);
        console.log('createdUserDebts', createdUserDebts);


        // Payment

        // ActiveRecord: Delete Debt
        await Payment.deleteMany();

        // ActiveRecord: Categories Create

        const createdPayments = await Payment.create([ 

            {
                paymentAmount: 60, 
                receipt: 'X01020202', 
                group: createdGroups[0],
                payee: createdUsers[0], 
                payer: createdUsers[1],
            }, 
            {
                paymentAmount: 60, 
                receipt: 'X01020202', 
                group: createdGroups[0],
                payee: createdUsers[0], 
                payer: createdUsers[2],
            }, 
            {
                paymentAmount: 1000,
                receipt: 'Y00020303',
                group: createdGroups[1],
                payee: createdUsers[2],
                payer: createdUsers[0]
            }, 
            {
                paymentAmount: 1000,
                receipt: 'Y00020303',
                group:createdGroups[1], 
                payee: createdUsers[2],
                payer: createdUsers[3]
            }, 
            {
                paymentAmount: 1000,
                receipt: 'Y00020303',
                group:createdGroups[1], 
                payee: createdUsers[2],
                payer: createdUsers[4]
            }, 
            {
                paymentAmount: 1200,
                receipt: 'HUDKJ093298',
                group: createdUserDebts[2],
                payee: createdUsers[3],
                payer: createdUsers[4]
            },
            {
                paymentAmount: 1200,
                receipt: 'HUDKJ093298',
                group: createdUserDebts[2],
                payee: createdUsers[3],
                payer: createdUsers[2]
            },
            // {
            //     paymentAmount: 50,
            //     receipt: 'HUDKJ093298',
            //     group: createdUserDebts[0],
            //     payee: createdUsers[1],
            //     payer: createdUsers[4]
            // },
            // {
            //     paymentAmount: 50,
            //     receipt: 'HUDKJ093298',
            //     group: createdUserDebts[0],
            //     payee: createdUsers[1],
            //     payer: createdUsers[4]
            // },

        ]);

        console.log('createdPayments:', createdPayments)


        // // assoicated the new Groups back to the Users
        createdUsers[0].groups.push(createdGroups[0], createdGroups[1]);
        await createdUsers[0].save();
        // Linking Users to Groups many to many assoications
        await createdGroups[0].saveUser(createdUsers[0]);
        await createdGroups[0].saveUser(createdUsers[1]);
        await createdGroups[0].saveUser(createdUsers[2]);
        await createdGroups[1].saveUser(createdUsers[0]);
        await createdGroups[1].saveUser(createdUsers[2]);
        await createdGroups[1].saveUser(createdUsers[3]);
        await createdGroups[1].saveUser(createdUsers[4]);
        await createdGroups[2].saveUser(createdUsers[2]);
        await createdGroups[2].saveUser(createdUsers[3]);
        await createdGroups[2].saveUser(createdUsers[4]);
        await createdGroups[2].saveUser(createdUsers[1]);


        // Linking User Debts to Users (Many to Many assoications)
        await createdUserDebts[0].saveUser(createdUsers[1]);
        await createdUserDebts[0].saveUser(createdUsers[4]);
        await createdUserDebts[1].saveUser(createdUsers[2]);
        await createdUserDebts[1].saveUser(createdUsers[3]);

        await createdPayments[0].saveUser(createdUsers[0]);
        await createdPayments[0].saveUser(createdUsers[1]);
        await createdPayments[1].saveUser(createdUsers[2]);
        await createdPayments[1].saveUser(createdUsers[0]);
        await createdPayments[2].saveUser(createdUsers[2]);
        await createdPayments[2].saveUser(createdUsers[0]);
        await createdPayments[3].saveUser(createdUsers[2]);
        await createdPayments[3].saveUser(createdUsers[3]);

        console.log('first users groups', createdUsers[0].groups, createdUsers[1].groups );
        console.log('checked added first group', createdGroups[0]);
        console.log('User Debts 2 and 4:', createdUsers[2].userDebts, createdUsers[3].userDebts );
        console.log('First user payments:', createdUsers[0].payments);

        console.log('User Debts 1 and 4:', createdUsers[1].userDebts, createdUsers[4].userDebts );
        console.log('checked added UserDebt', createdUserDebts[0]);


    process.exit(0) // stay on program
});




        // // ActiveRecord: Delete Debt
        // await GroupDebt.deleteMany();

        // // ActiveRecord: Categories Create

        // const createdGroupDebts = await GroupDebt.create([ 

        //     {
        //         totalAmount: 180, 
        //         description: 'Split of household expense electrical bills', 
        //         category_id:[
        //             {
        //                category: createdCaregories[4], 
        //             }
        //         ], 
        //         group_id: [
        //             {
        //                 group: createdGroups[2],
        //             }
        //         ],
        //         payee: [
        //             {
        //                 user: createdUsers[0],
        //             }
        //         ],
        //         payer: [
        //             {
        //                 user: createdUsers[1],
        //             },
        //             {
        //                 user: createdUsers[2]
        //             },
        //         ], 

        //     }, 
        //     {
        //         totalAmount: 4000, 
        //         description: 'Split of household expense rent bills', 
        //         category_id:[
        //             {
        //                category: createdCaregories[7], 
        //             }
        //         ], 
        //         group_id: [
        //             {
        //                 group: createdGroups[1],
        //             }
        //         ],
        //         payee: [
        //             {
        //                 user: createdUsers[2],
        //             }
        //         ],
        //         payer: [
        //             {
        //                 user: createdUsers[0],
        //             },
        //             {
        //                 user: createdUsers[3]
        //             },
        //             {
        //                 user: createdUsers[4]
        //             },
        //         ], 

        //     }, 
        //     {
        //         totalAmount: 2000, 
        //         description: 'Split of holiday travel', 
        //         category_id:[
        //             {
        //                category: createdCaregories[7], 
        //             }
        //         ], 
        //         group_id: [
        //             {
        //                 group: createdGroups[1],
        //             }
        //         ],
        //         payee: [
        //             {
        //                 user: createdUsers[3],
        //             }
        //         ],
        //         payer: [
        //             {
        //                 user: createdUsers[1],
        //             },
        //             {
        //                 user: createdUsers[2]
        //             },
        //             {
        //                 user: createdUsers[4]
        //             },
        //         ], 

        //     }, 
          


        // ]);

            // Debt

        // console.log('createdGroupDebts:', createdGroupDebts);
