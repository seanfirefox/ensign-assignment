import React, { useContext } from 'react';
import Cart from '../components/Cart';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="container mx-auto p-4">
      <Cart cart={cart} />
    </div>
  );
};

export default CartPage;
