import Order from "../../schemas/orderSchemas.js";
import Cart from "../../schemas/cartSchema.js";
import { initializePayment } from "../paymentApis/initializePayment.js";

export const createOrder = async (req, res) => {
  const { email } = req.body;
  const userId = req.user._id;
  try {
    // get user cart
    const cart = await Cart.findOne({ userId }).populate(
      "products.productId",
      "pName price color categoryId"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    // create order from cart
    const order = new Order({
      userId,
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.price,
        totalItemPrice: item.totalItemPrice,
      })),
      totalAmount: cart.totalCartPrice,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    await order.save();

    // optionally clear cart after creating order
    cart.products = [];
    cart.totalCartPrice = 0;
    await cart.save();

    res.status(201).json({
      message: "Order created successfully",
      order,
    });

    //  Link to Paystack initialize
    req.orderId = order._id; // pass orderId forward
    req.amount = order.totalAmount;
    req.email = email;

    return initializePayment(req, res); // call Paystack Controller
  } catch (error) {
    console.log(error);
  }
};
