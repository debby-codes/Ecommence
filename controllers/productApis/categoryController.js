import Category from "../../schemas/categorySchema.js";
// Create Category
export const createCategory = async (req, res) => {
  const { nameOfCategory } = req.body;

  if (!nameOfCategory) {
    res.status(401).json({ message: "Fill in the categories" });
    return;
  }
  try {
    const category = await Category.findOne({ nameOfCategory });
    if (category) {
      res.status(400).json({ message: "Category already exists" });
      return;
    }
    const newCategory = new Category({ nameOfCategory });
    await newCategory.save();

    res.status(201).json({ message: "Category created succesfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
// Get all Categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
};
