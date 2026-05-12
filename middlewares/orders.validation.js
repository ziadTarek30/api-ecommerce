
const { StatusCodes } = require('http-status-codes');
const joi = require('joi');

const orderItemsSchema = joi.object({
    itemName: joi.string().required().max(20).trim(),
    quantity: joi.number().integer().required().min(1),
    unitPrice: joi.number().min(0).required()
})
const createSchema = joi.object({
  customerName: joi.string().required().max(30).trim(),
  branchLocation: joi.string().required().max(50).trim(),
  orderItems: joi.array().items(orderItemsSchema).min(1).required(),
  totalAmount: joi.number().min(0),
  paymentMethod: joi.string().valid('cash', 'card', 'online').required(),
  orderStatus: joi.string().valid('pending', 'delivered', 'cancelled').required(),
  orderDate: joi.date()
});

const updateSchema = createSchema.fork(['customerName', 'branchLocation', 'orderItems', 'paymentMethod', 'orderStatus'], schema => schema.optional()).keys({
  orderItems: joi.array().items(
    orderItemsSchema.fork(['itemName', 'quantity', 'unitPrice'], schema => schema.optional())
  ).optional()
});

const createValidation = (req, res, next) => {
  const { error } = createSchema.validate(req.body)

  if (error) {
    const errors = error.details.map(detail => detail.message);
    const err = new Error(errors[0]);
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  next();
}
const updateValidation = (req, res, next) => {
  const { error } = updateSchema.validate(req.body)

  if (error) {
    const errors = error.details.map(detail => detail.message);
    const err = new Error(errors[0]);
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  next();
}


module.exports = {createValidation, updateValidation};