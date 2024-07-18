// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId });

  if (cart) {
    // Cart exists, update it
    const itemIndex = cart.items.findIndex(item => item.productId == productId);

    if (itemIndex > -1) {
      let item = cart.items[itemIndex];
      item.quantity += quantity;
      cart.items[itemIndex] = item;
    } else {
      cart.items.push({ productId, quantity });
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } else {
    // No cart for user, create new cart
    const newCart = await Cart.create({
      userId,
      items: [{ productId, quantity }]
    });
    return res.status(201).send(newCart);
  }
});

module.exports = router;
