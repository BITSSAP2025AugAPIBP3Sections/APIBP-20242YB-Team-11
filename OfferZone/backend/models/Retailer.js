const mongoose = require("mongoose");
const User = require("./User");

const retailerSchema = new mongoose.Schema(
  {
    retailerCode: {                 // unique code for your shop system
        type: String,
        required: true,
    },            
    shopName: {
      type: String,
      required: true,
      unique: true,
    },
    ownerName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    businessType: {      
      type: String,
      enum: ["Grocery", "Bakery", "Salon", "Mobile", "Electronics", "Clothing", "Other"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    openingTime: {
      type: Date,
      trim: true,
    },
    closingTime: {
      type: Date,
      trim: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    offers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],
  },
  { timestamps: true }
);


module.exports = mongoose.model("Retailer", retailerSchema);
