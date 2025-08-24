import Product from "../../schemas/productSchema.js";

export const getUserProducts = async (req, res) => {
  const user = req.user;
  try {
    const Products = await Product.find({
      userId: user._id,
      categoryId: category._id,
    }).populate("categoryId", "pName");
    res.status(200).json(Products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "categoryId",
      "nameOfCategory"
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getByqueryParams = async (req, res) => {
  const { pName, price, color } = req.query;

  const filter = {};
  if (pName) filter.pName = pName;
  if (price) filter.price = price;

  try {
    const product = await Product.find(filter);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
