const mongoose = require('mongoose');
const Order = require('../models/order.model');
const {StatusCodes} = require("http-status-codes");

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(StatusCodes.OK).json({message: 'success', data: {orders}});
  }
  catch (e) {
    e.statusCode = StatusCodes.BAD_REQUEST;
    next(e)
  }
  
}

const getHome = async (req, res, next) => {
  const orders = await Order.find();
  res.render('orders', {orders});
}

const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create({...req.body});

    res.status(StatusCodes.CREATED).json({message: 'success', data: {newOrder: order}});
  }
  catch(e) {
    e.statusCode = StatusCodes.BAD_REQUEST
    next(e)
  }

  
}

const updateOrder = async (req, res, next) => {
  const id = req.params.id;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    const err = new Error('Invalid id');
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(e);
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {returnDocument: 'after'});

    res.status(StatusCodes.OK).json({message: 'success', data: {updatedOrder}});
  }
  catch(e) {
    e.statusCode = StatusCodes.BAD_REQUEST;
    next(e);
  }
  
}

const deleteOrder = async (req, res) => {
  const id = req.params.id;

  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    const err = new Error('Invalid id');
    err.statusCode = StatusCodes.BAD_REQUEST;
    next(e);
  }

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({message: 'success', data: {deletedOrder}});
  }
  catch(e) {
    e.statusCode = StatusCodes.BAD_REQUEST;
    next(e);
  }
}

module.exports = {getAllOrders, createOrder, deleteOrder, updateOrder, getHome};