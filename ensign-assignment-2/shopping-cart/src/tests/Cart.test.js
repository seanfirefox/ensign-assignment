import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from '../components/Cart';
import { CartContext } from '../context/CartContext';

test('displays the correct total price', () => {
    const cart = [
        { id: 1, title: 'Test Product', price: 10, quantity: 2 },
        { id: 2, title: 'Another Product', price: 20, quantity: 1 },
    ];

    render(
        <CartContext.Provider value={{ cart, updateCart: jest.fn(), removeFromCart: jest.fn() }}>
            <Cart cart={cart} />
        </CartContext.Provider>
    );

    const total = screen.getByText(/Total: \$40.00/i);
    expect(total).toBeInTheDocument();
});

test('displays remove button for each item', () => {
    const cart = [
        { id: 1, title: 'Test Product', price: 10, quantity: 2 },
        { id: 2, title: 'Another Product', price: 20, quantity: 1 },
    ];

    render(
        <CartContext.Provider value={{ cart, updateCart: jest.fn(), removeFromCart: jest.fn() }}>
            <Cart cart={cart} />
        </CartContext.Provider>
    );

    expect(screen.getAllByRole('button', { name: /Remove/i }).length).toBe(cart.length);
});
