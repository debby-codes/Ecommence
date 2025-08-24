import axios from "axios";
import Order from "../../schemas/orderSchemas.js";
const pSk = process.env.PAYSTACK_SECRET_KEY;
export const initializePayment = async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: req.email,
        amount: req.amount * 100,
        callback_url: "http://localhost:2000/api/paystack/verify",
        metadata: {
          orderId: req.orderId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${pSk}`,
          "Content-Type": "application/json",
        },
      }
    );
    // update order with reference
    const reference = response.data.data.reference;
    await Order.findByIdAndUpdate(req.orderId, { reference });

    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
};
