const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a title of the expense"],
    },
    cost: {
      type: Number,
      required: [true, "Please enter the cost"],
    },
    category: {
      type: String,
      required: [true, "Please select the category"],
    },
    date: {
      type: Number,
      require: [true],
    },
    month: {
      type: String,
      required: [true],
    },
    year: {
      type: Number,
      required: [true],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
