const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Counter = require("./counter-model");
const DeliveryVehicle = require("../models/delivery-vehicle-model.js");

const orderSchema = new Schema({
  orderNumber: {
    type: String,
    unique: true,
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  deliveryVehicleId: {
    type: Schema.Types.ObjectId,
    ref: "DeliveryVehicle",
    required: true,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});
orderSchema.pre("save", async function (next) {
  const order = this;

  if (order.isNew && !order.orderNumber) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { name: "orderNumber" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      order.orderNumber = counter.seq.toString().padStart(4, "0");
      next();
    } catch (err) {
      return next(err);
    }
  } else {
    next();
  }
});

orderSchema.post("save", async function (order) {
  try {
    const vehicle = await DeliveryVehicle.findById(order.deliveryVehicleId);
    if (vehicle) {
      vehicle.activeOrdersCount = vehicle.activeOrdersCount + 1;
      await vehicle.save();
    }
  } catch (err) {
    console.error(err);
  }
});
orderSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  console.log(update);
  if (update.isDelivered === true) {
    try {
      const order = await Order.findOne(this.getQuery());
      console.log(order);
      if (order && !order.isDelivered) {
        await DeliveryVehicle.findByIdAndUpdate(order.deliveryVehicleId, {
          $inc: { activeOrdersCount: -1 },
        });
      }
    } catch (err) {
      console.error("Error updating activeOrdersCount:", err);
    }
  }
  next();
});

const Order = model("Order", orderSchema);

module.exports = Order;
