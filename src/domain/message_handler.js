const mockConversations = [
    {
        convId: 3,
        participants: ['johannes', 'johanna'],
<<<<<<< HEAD
        messages: [],
        createdAt: new Date(),
=======
        messages: [
            {
                sender: 'johannes',
                text: 'Hello Johanna!',
                createdAt: new Date('2023-01-01T12:00:00Z'),
            },
            {
                sender: 'johanna',
                text: 'Hi Johannes! How are you?',
                createdAt: new Date('2023-01-01T12:05:00Z'),
            },
        ],
        createdAt: new Date('2023-01-01T12:00:00Z'),
>>>>>>> 89d2f636acf73e4dd7498e9c88326f657ccc2d69
    },
    {
        convId: 4,
        participants: ['johannes', 'johanna'],
<<<<<<< HEAD
        messages: [],
        createdAt: new Date(),
    },
];

module.exports = mockConversations;
=======
        messages: [
            {
                sender: 'johannes',
                text: 'What time are we meeting?',
                createdAt: new Date('2023-02-01T09:00:00Z'),
            },
            {
                sender: 'johanna',
                text: 'Let\'s meet at 10 AM!',
                createdAt: new Date('2023-02-01T09:15:00Z'),
            },
        ],
        createdAt: new Date('2023-02-01T09:00:00Z'),
    },
];

module.exports = mockConversations;
>>>>>>> 89d2f636acf73e4dd7498e9c88326f657ccc2d69
