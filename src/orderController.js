// src/orderController.js
const express = require('express');
const verifyToken = require('./authMiddleware');
const db = require('./db'); 

const router = express.Router();

// GET all orders (protected endpoint)
router.get('/orders', verifyToken, (req, res) => {
  const userId = req.user.userId;

  // Retrieve orders for the logged-in user from the database
  const sql = `
    SELECT o.OrderID, o.PizzaID, p.Type AS PizzaType, o.Quantity, o.Address, o.Status, o.TotalPrice
    FROM \`Order\` o
    INNER JOIN Pizza p ON o.PizzaID = p.PizzaID
    WHERE o.UserID = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ orders: results });
  });
});

// POST a new order (protected endpoint)
router.post('/orders', verifyToken, (req, res) => {
  const userId = req.user.userId;
  const { pizzaId, quantity, address } = req.body;

  // Validate inputs 
  if (!pizzaId || !quantity || !address) {
    return res.status(400).json({ error: 'Invalid order details' });
  }

  // Retrieve pizza details from the database
  const getPizzaSql = 'SELECT * FROM Pizza WHERE PizzaID = ?';
  db.query(getPizzaSql, [pizzaId], (err, pizzaResults) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (pizzaResults.length === 0) {
      return res.status(404).json({ error: 'Pizza not found' });
    }

    const pizza = pizzaResults[0];
    const totalPrice = pizza.Price * quantity;

    // Insert the new order into the database
    const insertOrderSql = `
      INSERT INTO \`Order\` (UserID, PizzaID, Quantity, Address, Status, TotalPrice)
      VALUES (?, ?, ?, ?, 'Pending', ?)
    `;

    db.query(insertOrderSql, [userId, pizzaId, quantity, address, totalPrice], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const newOrderId = result.insertId;
      const newOrder = {
        orderId: newOrderId,
        userId,
        pizzaId,
        pizzaType: pizza.Type,
        quantity,
        address,
        status: 'Pending',
        totalPrice,
      };

      res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    });
  });
});

// PUT (update) an order status (protected endpoint)
router.put('/orders/:orderId', verifyToken, (req, res) => {
  const userId = req.user.userId;
  const orderId = parseInt(req.params.orderId);
  const { status } = req.body;

  // Update the order status in the database
  const updateOrderSql = 'UPDATE \`Order\` SET Status = ? WHERE OrderID = ? AND UserID = ?';
  db.query(updateOrderSql, [status, orderId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order status updated successfully', orderId, status });
  });
});

// DELETE a specific order (protected endpoint)
router.delete('/orders/:orderId', verifyToken, (req, res) => {
  const userId = req.user.userId;
  const orderId = parseInt(req.params.orderId);

  // Delete the order from the database
  const deleteOrderSql = 'DELETE FROM \`Order\` WHERE OrderID = ? AND UserID = ?';
  db.query(deleteOrderSql, [orderId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully', orderId });
  });
});

module.exports = router;
