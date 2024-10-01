import { TOrder } from "./order.interface";
import { Order } from "./order.model";



// Create Order
const createOrderIntoDB = async (orderData: TOrder) => {
    const order = Order.create(orderData);
    return order;
}


// Get all orders for single user
const getAllOrdersForSingleUserFromDB = async (userId: string) => {
    const orders = Order.find({userId});
    return orders;
}
  
// get single order details by id
const getSingleOrderDetailsFromDB = async (orderId: string) => {
    const order = Order.findById(orderId);
    return order;
}

// update order status
const updateOrderStatusInDB = async (orderId: string, orderData: TOrder) => {
    const order = Order.findByIdAndUpdate(orderId, orderData, {new: true});
    return order;
}

// Delete order
const deleteOrderFromDB = async (orderId: string) => {
    await Order.findByIdAndDelete(orderId);
}



export const orderService = {
    createOrderIntoDB,
    getAllOrdersForSingleUserFromDB,
    getSingleOrderDetailsFromDB,
    updateOrderStatusInDB,
    deleteOrderFromDB,
}