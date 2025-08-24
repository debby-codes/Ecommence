import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    nameOfCategory: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
