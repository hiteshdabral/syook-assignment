const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Counter=require("./counter-model")

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

orderSchema.pre('save', function (next) {
    const order = this;
  
    if (order.isNew && !order.orderNumber) {
      Counter.findByIdAndUpdate(
        { _id: 'orderNumber' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
        (err, counter) => {
          if (err) return next(err);
          order.orderNumber = counter.seq.toString().padStart(4, '0');
          next();
        }
      );
    } else {
      next();
    }
  });


  orderSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.isDelivered === true) {
      const order = await this.model.findOne(this.getQuery());
      if (!order.isDelivered) {
        await mongoose.model('DeliveryVehicle').findByIdAndUpdate(order.deliveryVehicleId, { $inc: { activeOrdersCount: -1 } });
      }
    }
    next();
  });

const Order = model("Order", orderSchema);

module.exports = Order;
