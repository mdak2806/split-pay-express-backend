const mongoose = require('mongoose');

// Load models
const User = require('./User');
const Payment = require('./Payment');
const Group = require('./Group');
const GroupDebt = require('./GroupDebt');
const Category = require('./Category');
const UserDebt = require('./UserDebt');

// Give a path to the Seeds DATA
mongoose.connect('mongodb://127.0.0.1/');

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
            passwordDigest: 'chicken',

            address: {
                street: '80 Station St',
                postCode: 2200, 
                Country: 'Australia'
            }, 

            bankAcount: {
                accountName: 'Mohamad',
                bsb: 002333, 
                accountNumber: 223848,
            },

            creditCard: {
                // 
                cardNumber: 3333444455556666, 
                // Date object Departure Date
                expiryDate: `11/22`, 
                securityNumber: 222

            }
        }, 

        {
            name: 'Wen', 
            email: 'wen@gmail.com',
            passwordDigest: 'chicken',

            address: {
                street: '34 Station St',
                postCode: 2200, 
                Country: 'Australia'
            }, 

            bankAcount: {
                accountName: 'Wen',
                bsb: 002311, 
                accountNumber: 223811,
            },

            creditCard: {
                cardNumber: 3333444455551111, 
                expiryDate: `11/22`, 
                securityNumber: 111,

            }
        }, 
        {
            name: 'Craig', 
            email: 'craig@gmail.com',
            passwordDigest: 'chicken',

            address: {
                street: '90 Station St',
                postCode: 2200, 
                Country: 'Australia'
            }, 

            bankAcount: {
                accountName: 'Craig',
                bsb: 002322, 
                accountNumber: 223822,
            },

            creditCard: {
                cardNumber: 3333444455552222, 
                expiryDate: `12/22`, 
                securityNumber: 222,

            }
        }, 
        {
            name: 'Kris', 
            email: 'kris@gmail.com',
            passwordDigest: 'chicken',

            address: {
                street: '30 Station St',
                postCode: 2200, 
                Country: 'Australia'
            }, 

            bankAcount: {
                accountName: 'Kris',
                // Store bsb and Account as a string
                bsb: 002300, 
                accountNumber: 223800,
            },

            creditCard: {
                // 
                cardNumber: 3333444455550000, 
                expiryDate: `12/22`, 
                securityNumber: 000,

            }
        }, 


        console.log('Users:', createdUsers),

        




    ]);

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
                categoryName: 'Health',
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
                    {
                        user: createdUsers[0],
                    },
                    {
                        user: createdUsers[1],
                    }, 
                    {
                        user: createdUsers[2],
                    }
                ]
            }, 

            {
                groupName: 'Holiday',
                description: 'Holiday bill spliting',
                numberUsers: 4,
                users: [
                    {
                        user: createdUsers[0],
                    },
                    {
                        user: createdUsers[2],
                    }, 
                    {
                        user: createdUsers[3],
                    },
                    {
                        user: createdUsers[4],
                    },
                ]
            }, 
            {
                groupName: 'Social',
                description: 'Eating out spliting',
                numberUsers: 4,
                users: [
                    {
                        user: createdUsers[1],
                    },
                    {
                        user: createdUsers[2],
                    }, 
                    {
                        user: createdUsers[3],
                    },
                    {
                        user: createdUsers[4],
                    },
                ]
            }, 

        ]);

    // Debt

        // ActiveRecord: Delete Debt
        await GroupDebt.deleteMany();

        // ActiveRecord: Categories Create

        const createdGroupDebts = await GroupDebt.create([ 

            {
                totalAmount: 180, 
                description: 'Split of household expense electrical bills', 
                category_id:[
                    {
                       category: createdCaregories[4], 
                    }
                ], 
                group_id: [
                    {
                        group: createdGroups[2],
                    }
                ],
                payee: [
                    {
                        user: createdUsers[0],
                    }
                ],
                payer: [
                    {
                        user: createdUsers[1],
                    },
                    {
                        user: createdUsers[2]
                    },
                ], 

            }, 
            {
                totalAmount: 4000, 
                description: 'Split of household expense rent bills', 
                category_id:[
                    {
                       category: createdCaregories[7], 
                    }
                ], 
                group_id: [
                    {
                        group: createdGroups[1],
                    }
                ],
                payee: [
                    {
                        user: createdUsers[2],
                    }
                ],
                payer: [
                    {
                        user: createdUsers[0],
                    },
                    {
                        user: createdUsers[3]
                    },
                    {
                        user: createdUsers[4]
                    },
                ], 

            }, 
            {
                totalAmount: 2000, 
                description: 'Split of holiday travel', 
                category_id:[
                    {
                       category: createdCaregories[7], 
                    }
                ], 
                group_id: [
                    {
                        group: createdGroups[1],
                    }
                ],
                payee: [
                    {
                        user: createdUsers[3],
                    }
                ],
                payer: [
                    {
                        user: createdUsers[1],
                    },
                    {
                        user: createdUsers[2]
                    },
                    {
                        user: createdUsers[4]
                    },
                ], 

            }, 
          


        ]);


        // Individual User to User Debt
        await UserDebt.deleteMany();

        const createdUserDebts = await UserDebt.create([

            {
                totalAmount: 200, 
                description: 'Split dinner', 
                category_id: [
                    {
                        category: createdCaregories[7]
                    }
                ], 
                payee: [
                    {
                        user: createdUsers[1]
                    }
                ], 
                payer: [
                    {
                        user: createdUsers[4]
                    }
                ]

            }, 
        

        ])


        // Payment

        // ActiveRecord: Delete Debt
        await Payment.deleteMany();

        // ActiveRecord: Categories Create

        const createdPayments = await Payment.create([ 

            {
                paymentAmount: 60, 
                debt_id:[
                    {
                        GroupDebt: createdGroupDebts[0]
                    }
                ],
                payee_id:[
                    {
                        user: createdUsers[0]
                    }
                ],
                payer_id: [
                    {
                        user: createdUsers[1]
                    }
                ]
            }, 
            {
                paymentAmount: 1000,
                debt_id:[
                    {
                        GroupDebt: createdGroupDebts[2]
                    }
                ],
                payee_id:[
                    {
                        user: createdUsers[2]
                    }
                ],
                payer_id: [
                    {
                        user: createdUsers[0]
                    }
                ]
            }, 
            {
                paymentAmount: 1000,
                debt_id:[
                    {
                        GroupDebt: createdGroupDebts[2]
                    }
                ],
                payee_id:[
                    {
                        user: createdUsers[2]
                    }
                ],
                payer_id: [
                    {
                        user: createdUsers[3]
                    }
                ]
            }, 
            {
                paymentAmount: 50,
                debt_id:[
                    {
                        UserDebt: createdUserDebts[0]
                    }
                ],
                payee_id:[
                    {
                        user: createdUsers[1]
                    }
                ],
                payer_id: [
                    {
                        user: createdUsers[4]
                    }
                ]
            },

        ]);

    process.exit(0) // stay on program
});
