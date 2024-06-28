const DeliveryVehicle = require("../models/delivery-vehicle-model");

const deliveryVehicleValidation = {
  registrationNumber: {
    in: ["body"],
    exists: {
      errorMessage: "registrationNumber  is required",
    },
    notEmpty: {
      errorMessage: "registrationNumber cannot be empty",
    },
    isAlphanumeric: {
      errorMessage: "registrationNumber must be isAlphanumeric",
    },
    custom: {
      options: async function (value) {
        const vehicle = await DeliveryVehicle.findOne({
          registrationNumber: value,
        });
        if (vehicle) {
          throw new Error("vehicle already registered");
        } else {
          return true;
        }
      },
    },
    trim: true,
  },
  vehicleType: {
    in: ["body"],
    exists: {
      errorMessage: "city  is required",
    },
    notEmpty: {
      errorMessage: "city cannot be empty",
    },
    isIn: {
      options: [["bike", "truck"]],
      errorMessage: " only bike and truck allowed ",
    },
  },
  city: {
    in: ["body"],
    exists: {
      errorMessage: "city  is required",
    },
    notEmpty: {
      errorMessage: "city cannot be empty",
    },
    trim: true,
  },
  activeOrdersCount: {
    custom: {
      options: async function (value) {
        if (value > 2 || value < 0) {
          throw new Error("should be between 0-2");
        }
      },
    },
  },
};

module.exports = deliveryVehicleValidation;
