import Product from "../../schemas/productSchema.js";

export const createProduct = async (req, res) => {
  const { pName, price, color, categoryId } = req.body;
  const user = req.user;
  if (!categoryId) {
    res.status(400).json({ message: "Category is required" });
    return;
  }
  try {
    const newProduct = new Product({
      ...req.body,
      userId: user._id,
    });
    await newProduct.save();

    res.status(201).json({ message: "New product created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
