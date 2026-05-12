const express = require('express');
const { getAllOrders, createOrder, updateOrder, deleteOrder } = require('../controllers/orders.controller');
const { createValidation } = require('../middlewares/orders.validation');

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', createValidation, createOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;