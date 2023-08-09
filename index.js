require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./productModel");
const app = express();

app.use(express.json());

app.get("/ex", (req, res) => {
  res.send("HELLO WORLD");
});
// READ
app.get("/expenses", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/expense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create
app.post("/expense", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update
app.put("/expense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any expense with ID ${id}` });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
app.delete("/expense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any expense with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to the database
mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://piya:${process.env.MONGODB_PASSWORD}@expenseapi.w09i3uo.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8080, () => {
      console.log(`Node API app is running on port 8080`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
