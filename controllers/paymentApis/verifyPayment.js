import axios from "axios";
import Order from "../../schemas/orderSchemas.js";
const pSk = process.env.PAYSTACK_SECRET_KEY;
export const verifyPayment = async (req, res) => {
  try {
    const { referenceId } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${referenceId}`,
      {
        headers: {
          Authorization: `Bearer ${pSk}`,
        },
      }
    );

    const paymentData = response.data.data;

    if (paymentData.status === "success") {
      await Order.findOneAndUpdate(
        { referenceId },
        { status: "paid" },
        { new: true }
      );
      res.status(201).json(paymentData);
    } else {
      await Order.findOneAndUpdate(
        { referenceId },
        { status: "failed" },
        { new: true }
      );
      res.status(401).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
  }
};
