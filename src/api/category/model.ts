import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

export const Category = mongoose.model("Category", categorySchema);
