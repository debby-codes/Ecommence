import Cart from "../../schemas/cartSchema.js";
export const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "products.productId"
    );
    if (!cart) {
      res.status(400).json({ message: "Cart not found" });
      return;
    }
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};
