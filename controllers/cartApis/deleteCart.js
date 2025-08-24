import Cart from "../../schemas/cartSchema.js";
export const deleteCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      res.status(400).json({ message: "Cart not found" });
      return;
    }
    cart.products = [];
    cart.totalCartPrice = 0;
    await cart.save();
    res.status(200).json({ mess: "Cart deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
