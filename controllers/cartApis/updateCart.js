import Cart from "../../schemas/cartSchema.js";

export const updateCartItem = async (req, res) => {
  const { productId, type } = req.body;
  // types can be increase or decrease
  if (!productId || !type) {
    res.status(400).json({ message: "please provide all fields" });
    return;
  }
  const userId = req.user._id;

  try {
    //check for users cart
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      res.status(400).json({ message: "Cart not found" });
      return;
    }
    //check for the specific item in the products array
    const existingCartItem = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (type === "increase") {
      existingCartItem.quantity += 1;
    } else if (type === "decrease" && existingCartItem.quantity > 1) {
      existingCartItem.quantity -= 1;
    } else {
      res
        .status(400)
        .json({ message: "type can be either increase or decrease" });
      return;
    }
    //update totalItemPrice of each member of the cart array
    cart.products.forEach((item) => {
      item.totalItemPrice = item.price * item.quantity;
    });
    //update the totalCartPrice of the cart
    cart.totalCartPrice = cart.products.reduce(
      (sum, item) => sum + item.totalItemPrice,
      0
    );
    //save the cart both existing or newly updated cart
    await cart.save();
    await cart.populate("products.productId");
    res.status(200).json(cart);
  } catch (error) {}
};
