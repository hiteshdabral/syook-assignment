const { validationResult, body } = require("express-validator");
const Order = require("../models/orders-model");
const Customer = require("../models/customer-model");
const DeliveryVehicle = require("../models/delivery-vehicle-model");
const Item = require("../models/items-model");
const orderCtrl = {};

orderCtrl.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { itemId, customerName, customerCity } = req.body;
  try {
    let customer = await Customer.findOne({
      name: customerName,
      city: customerCity,
    });

    if (!customer) {
      customer = new Customer({ name: customerName, city: customerCity });
      await customer.save();
    }

    const availableVehicle = await DeliveryVehicle.findOne({
      city: customerCity,
      activeOrdersCount: { $lt: 2 },
    });

    if (!availableVehicle) {
      return res.status(404).json({ error: "No available vehicles" });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const newOrder = new Order({
      itemId,
      price: item.price,
      customerId: customer._id,
      deliveryVehicleId: availableVehicle._id,
    });

    await newOrder.save();

    return res.status(201).json(newOrder);
  }
   catch (err) {
    return res
      .status(500)
      .json({ error: "Something went wrong while creating order" });
  }
};

orderCtrl.show=async(req,res)=>{
     try{
    const orders=await Order.find()
    res.status(200).json(orders)
    }
    catch(err){
        res.status(500).json({ error: "something went wrong" });
    }
}


orderCtrl.updateOrder = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
  
    try {
      const order = await Order.findOneAndUpdate({_id:id}, body, { new: true });
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      return res.status(200).json(order);
    } catch (err) {
      console.error("Error in  updating order:", err);
      return res.status(500).json({ error: "Something went wrong while updating the order" });
    }
  };

module.exports = orderCtrl;
