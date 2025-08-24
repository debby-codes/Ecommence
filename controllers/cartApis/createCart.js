import Cart from "../../schemas/cartSchema.js";
import Product from "../../schemas/productSchema.js";
// create product

export const createCartItem = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  try {
    // firstly check for product
    const product = await Product.findById(productId);
    if (!product) {
      res.status(400).json({ message: "product not found" });
      return;
    }
    // secondly check for cart
    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      cart = new Cart({
        userId: userId,
        products: [
          { productId: product._id, quantity: 1, price: product.price },
        ],
      });
    } else {
      const existingCartItem = cart.products.find(
        (item) => item.productId.toString() === productId
      );
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        cart.products.push({
          productId: product._id,
          quantity: 1,
          price: product.price,
        });
      }
    }
    // update the totalItemPrice of each of the array
    cart.products.forEach((item) => {
      item.totalItemPrice = item.price * item.quantity;
    });
    // update the totalItemPrice of each member of the cart array
    cart.totalCartPrice = cart.products.reduce(
      (sum, item) => sum + item.totalItemPrice,
      0
    );
    // save the cart both existing or newly created
    await cart.save();
    await cart.populate({
      path: "products.productId",
      populate: { path: "categoryId", select: "nameOfCategory" },
    });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};
