export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Black T-Shirt',
        price: 199,
        description: 'Comfortable cotton t-shirt in black.',
        image: 'https://placehold.co/400x600/black/white/png?text=Black+T-Shirt',
    },
    {
        id: '2',
        name: 'Green Hoodie',
        price: 699,
        description: 'Warm hoodie with green accents.',
        image: 'https://placehold.co/400x600/green/black/png?text=Green+Hoodie',
    },
    {
        id: '3',
        name: 'Jeans',
        price: 914,
        description: 'Classic blue jeans.',
        image: 'https://placehold.co/400x600/blue/white/png?text=Jeans',
    },
    {
        id: '4',
        name: 'Sneakers',
        price: 1799,
        description: 'Stylish black sneakers with green laces.',
        image: 'https://placehold.co/400x600/black/green/png?text=Sneakers',
    },
];