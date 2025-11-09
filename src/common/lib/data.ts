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
        image: 'https://placehold.co/400x600/2c2c2c/white/png?text=Black+T-Shirt',
    },
    {
        id: '2',
        name: 'Green Hoodie',
        price: 699,
        description: 'Warm hoodie with green accents.',
        image: 'https://placehold.co/400x600/1a4d1a/white/png?text=Green+Hoodie',
    },
    {
        id: '3',
        name: 'Jeans',
        price: 914,
        description: 'Classic blue jeans.',
        image: 'https://placehold.co/400x600/2a4b8c/white/png?text=Jeans',
    },
    {
        id: '4',
        name: 'Sneakers',
        price: 1799,
        description: 'Stylish black sneakers with green laces.',
        image: 'https://placehold.co/400x600/333333/white/png?text=Sneakers',
    },
];