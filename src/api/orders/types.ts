import mongoose from "mongoose";

export interface IOrders {
  products: [
    {
      _id: mongoose.Types.ObjectId;
      name: string;
      quantity: string | number;
      price: string | number;
    }
  ];
  total_mount: string | number;
  buyer: {
    _id: mongoose.Types.ObjectId;
    username: string;
  };
  sellers: [
    {
      _id: mongoose.Types.ObjectId;
      username: string;
    }
  ];
  createdAt: Date;
  expireAt: Date;
}
