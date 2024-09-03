import { IGetUserAuthInfoRequest } from "../../types/express";
import { Response } from "express";
import { orderService } from "./services";

const {
  // getProducts,
  createOrders,
} = orderService;

class OrderController {
  async createorder(req: IGetUserAuthInfoRequest, res: Response) {
    const data = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const dataOrder = {
      buyer: {
        _id: user._id,
        username: user.username,
      },
      ...data,
    };

    try {
      const newOrder = await createOrders(dataOrder);
      return res
        .status(200)
        .json({ message: "Order create successfully", data: newOrder });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return res.status(500).json({ error: errorMessage });
    }
  }

  //   async getorder(req: Request, res: Response) {
  //     const id = req.params.id;
  //     try {
  //       const order = await getorder(id);
  //       return res.status(200).json({
  //         message: "The order was fetched successfully.",
  //         data: order,
  //       });
  //     } catch (error) {
  //       const errorMessage =
  //         error instanceof Error ? error.message : "An unexpected error occurred";

  //       return res.status(500).json({ error: errorMessage });
  //     }
  //   }

  //   async getorders(req: Request, res: Response) {
  //     try {
  //       const orders = await getOrders();
  //       return res
  //         .status(200)
  //         .json({ message: "orders was fetched successfully", data: orders });
  //     } catch (error) {
  //       const errorMessage =
  //         error instanceof Error ? error.message : "An unexpected error occurred";

  //       return res.status(500).json({ error: errorMessage });
  //     }
  //   }
}

export const orderController = new OrderController();
