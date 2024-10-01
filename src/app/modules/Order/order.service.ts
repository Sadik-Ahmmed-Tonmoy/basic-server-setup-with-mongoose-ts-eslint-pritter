import { TOrder } from "./order.interface";
import { Order } from "./order.model";



// Create Order
const createOrderIntoDB = async (orderData: TOrder) => {
    const order = Order.create(orderData);
    return order;
}
  


export const orderService = {
    createOrderIntoDB
}