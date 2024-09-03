import { IOrders } from "./types";
import { orderDao } from "./dao";

const { createOrders } = orderDao;

class OrderService {
  async createOrders(orders: IOrders) {
    try {
      const newOrder = await createOrders(orders);
      return newOrder;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const orderService = new OrderService();
