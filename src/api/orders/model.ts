import { IOrders } from "./types";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema<IOrders>({
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  total_mount: {
    type: Number,
    required: true,
  },
  buyer: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  sellers: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  expireAt: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 2),
  },
});

export const Orders = mongoose.model("Orders", OrderSchema);
