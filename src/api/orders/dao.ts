import { IOrders } from "./types";
import { Orders } from "./model";

class OrderDao {
  async createOrders(orders: IOrders) {
    try {
      const newOrders = await Orders.create(orders);
      return newOrders;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}
export const orderDao = new OrderDao();
