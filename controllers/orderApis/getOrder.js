import Order from "../../schemas/orderSchemas.js";
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAnOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};
