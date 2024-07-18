import React from 'react';
import { useCart } from '../contexts/CartContext';
import AuroraBackground from '../ui/AuroraBackground';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  if (!cart) {
    return <p>Loading...</p>;
  }

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AuroraBackground>
    <div className="container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id + item.size} className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5>{item.name}</h5>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.id, item.size)}
              >
                Remove
              </button>
            </div>
          ))}
          <hr />
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
    </AuroraBackground>
  );
};

export default Cart;
