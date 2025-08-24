import Product from "../../schemas/productSchema.js";
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { pName, price, color } = req.body;
  const reqid = req.user._id;
  try {
    const product = await Product.findOne({ _id: id, userId: reqid });
    if (!product) {
      res.status(400).json({ message: "Product not found" });
    }
    await product.findByIdAndUpdate(
      id,
      {
        $set: {
          pName: pName,
          price: price,
          color: color,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
