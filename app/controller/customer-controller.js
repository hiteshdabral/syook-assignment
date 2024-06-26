const { validationResult } = require("express-validator");
const Customer = require("../models/customer-model");
const customerCtrl = {};

customerCtrl.create = async (req, res) => {
  const body = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const customer=await Customer.create(body)
    return res.status(201).json(customer)
  } catch (err) {
    res.status(500).json({ error: 'something went wrong'})
    console.log(body)
  }
};

module.exports = customerCtrl;
