const mockConversations = [
    {
        convId: 3,
        participants: ['johannes', 'johanna'],
        messages: [
            { sender: 'johannes', content: 'Hello Johanna', timestamp: new Date('2025-01-23T01:00:00Z') },
            { sender: 'johanna', content: 'Hey Johannes!', timestamp: new Date('2025-01-23T01:05:00Z') }
        ],
        createdAt: new Date('2025-01-23T00:00:00Z'),
    },
    {
        convId: 4,
        participants: ['johannes', 'johanna'],
        messages: [
            { sender: 'johanna', content: 'How are you today?', timestamp: new Date('2025-01-23T02:00:00Z') }
        ],
        createdAt: new Date('2025-01-23T00:30:00Z'),
    },
];

module.exports = mockConversations;

