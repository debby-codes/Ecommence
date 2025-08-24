import Order from "../../schemas/orderSchemas.js";
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { email, pName, price, color, categoryId } = req.body;
  if (id == id) {
    try {
      await Order.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ message: "Order successfully updated" });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res
      .staus(401)
      .json({ message: "You are not allowed to update this order" });
  }
};
