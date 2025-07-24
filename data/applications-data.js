// data/applications-data.js

export const applications = {
    shopping: {
        id: 'shopping',
        title: 'Shopping Math',
        icon: '🛒',
        description: 'Calculate discounts, sales tax, and find the best deals.',
        scenarios: [
            {
                title: 'Discount Calculator',
                inputs: [
                    { id: 'originalPrice', label: 'Original Price ($)', type: 'number' },
                    { id: 'discountPercent', label: 'Discount (%)', type: 'number' }
                ],
                calculate: (vals) => {
                    const finalPrice = vals.originalPrice * (1 - vals.discountPercent / 100);
                    const saved = vals.originalPrice - finalPrice;
                    return `Final Price: $${finalPrice.toFixed(2)}<br>You saved: $${saved.toFixed(2)}`;
                }
            }
        ]
    },
    travel: {
        id: 'travel',
        title: 'Travel Planning',
        icon: '✈️',
        description: 'Calculate travel time, fuel costs, and speed.',
        scenarios: [
            {
                title: 'Time Calculator',
                inputs: [
                    { id: 'distance', label: 'Distance (km)', type: 'number' },
                    { id: 'speed', label: 'Speed (km/h)', type: 'number' }
                ],
                calculate: (vals) => {
                    const time = vals.distance / vals.speed;
                    const hours = Math.floor(time);
                    const minutes = Math.round((time - hours) * 60);
                    return `Estimated Travel Time: ${hours} hours and ${minutes} minutes.`;
                }
            }
        ]
    },
    finance: {
        id: 'finance',
        title: 'Finance & Banking',
        icon: '💰',
        description: 'Understand simple interest on loans and savings.',
        scenarios: [
            {
                title: 'Simple Interest Calculator',
                inputs: [
                    { id: 'principal', label: 'Principal Amount ($)', type: 'number' },
                    { id: 'rate', label: 'Annual Rate (%)', type: 'number' },
                    { id: 'time', label: 'Time (years)', type: 'number' }
                ],
                calculate: (vals) => {
                    const interest = (vals.principal * vals.rate * vals.time) / 100;
                    const total = vals.principal + interest;
                    return `Interest Earned/Paid: $${interest.toFixed(2)}<br>Total Amount: $${total.toFixed(2)}`;
                }
            }
        ]
    },
    construction: {
        id: 'construction',
        title: 'Construction Math',
        icon: '🏗️',
        description: 'Calculate area for flooring, painting, and more.',
        scenarios: [
            {
                title: 'Area Calculator (Rectangle)',
                inputs: [
                    { id: 'length', label: 'Length (m)', type: 'number' },
                    { id: 'width', label: 'Width (m)', type: 'number' }
                ],
                calculate: (vals) => {
                    const area = vals.length * vals.width;
                    return `Total Area: ${area.toFixed(2)} square meters.`;
                }
            }
        ]
    }
};

export const applicationCategories = [
    { id: 'shopping', title: 'Shopping Math', description: 'Discounts, tax, and budgeting', icon: '🛒' },
    { id: 'travel', title: 'Travel Planning', description: 'Distance, time, and speed', icon: '✈️' },
    { id: 'finance', title: 'Finance & Banking', description: 'Interest, loans, and investments', icon: '💰' },
    { id: 'construction', title: 'Construction', description: 'Area, volume, and materials', icon: '🏗️' }
];