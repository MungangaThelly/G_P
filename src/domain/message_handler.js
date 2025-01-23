const mockConversations = [
    {
        convId: 3,
        participants: ['johannes', 'johanna'],
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
    },
    {
        convId: 4,
        participants: ['johannes', 'johanna'],
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
