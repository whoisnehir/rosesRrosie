// The questions on the Help page, in groups. Each answer is a list of parts:
// a string is plain text, and an object { to, label } is a link to another page of the site.
export const helpGroups = [
    {
        id: 'shopping',
        title: 'Shopping',
        questions: [
            {
                question: 'Is rosesRrosie a real shop?',
                answer: [
                    'No. rosesRrosie is a demo project for a fictional makeup brand, so no real products are sold and no payment is ever taken.',
                ],
            },
            {
                question: 'Can I place an order?',
                answer: [
                    'Not yet. The cart and the checkout will come in the next stage of the project, together with accounts.',
                ],
            },
            {
                question: 'Where are your stores?',
                answer: [
                    'rosesRrosie sells online only. The ',
                    { to: '/warehouses', label: 'Warehouses' },
                    ' page lists the locations where our products are kept.',
                ],
            },
        ],
    },
    {
        id: 'products',
        title: 'Products',
        questions: [
            {
                question: 'How do I find products for my skin type?',
                answer: [
                    'Open ',
                    { to: '/shop', label: 'Shop All' },
                    ' and choose your skin type in the Skin type filter. You can combine it with a category and a sort order.',
                ],
            },
            {
                question: 'Where can I see the shades and ingredients?',
                answer: [
                    'Open a product: the details table under the gallery lists its shades, its ingredients and the skin types it suits.',
                ],
            },
            {
                question: 'What collections do you have?',
                answer: [
                    'Three: The Bloom Collection, Iced Flowers and Magical Blossom. Each one has its own video on the Home page.',
                ],
            },
        ],
    },
    {
        id: 'using-the-site',
        title: 'Using the site',
        questions: [
            {
                question: 'How do I switch to the dark theme?',
                answer: [
                    'Use the Dark button with the moon icon in the header, or in the menu on a phone. The site remembers your choice on this device.',
                ],
            },
            {
                question: 'Do I need to type diacritics when I search?',
                answer: [
                    'No. The search ignores diacritics and capital letters, so you can type the way you usually do.',
                ],
            },
            {
                question: 'How can I contact you?',
                answer: ['Write to us from the ', { to: '/contact', label: 'Contact' }, ' page.'],
            },
        ],
    },
];
