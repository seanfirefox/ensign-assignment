import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = ({ cart }) => {
  const { updateCart, removeFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? <p>Your cart is empty</p> : (
        <div>
          {cart.map(product => (
            <div key={product.id} className="cart-item flex items-center justify-between border-b py-4">
              <div className="cart-item-details flex items-center">
                <img src={product.image} alt={product.title} className="thumbnail w-16 h-16 object-cover" />
                <div className="ml-4">
                  <h2 className="font-bold">{product.title}</h2>
                  <p className="text-gray-500">Unit Price: ${product.price}</p>
                </div>
              </div>
              <div className="cart-item-actions flex items-center">
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  onChange={(e) => updateCart(product.id, parseInt(e.target.value))}
                  className="border rounded p-1 w-12 text-center"
                />
                <button onClick={() => removeFromCart(product.id)} className="ml-4 text-red-500">Remove</button>
              </div>
            </div>
          ))}
          <div className="total-price font-bold text-right mt-4">Total: ${calculateTotal()}</div>
          <button className="checkout-button bg-red-500 text-white font-bold py-2 px-4 rounded w-full mt-4">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
