import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";



// create order
const createOrder = catchAsync(async(req, res)=>{
    const orderData = req.body;
    const userId = req.user.id;
    const result = await orderService.createOrderIntoDB({userId, ...orderData});
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order created successfully',
        data: result,
    });
})


// get all orders for single user
const getAllOrdersForSingleUser =  catchAsync(async(req, res)=> {
    const userId = req.user.id;
    const result = await orderService.getAllOrdersForSingleUserFromDB(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Orders fetched successfully',
        data: result,
    });
})


// get single order details by id
const getSingleOrderDetails =  catchAsync(async(req, res)=> {
    const orderId = req.params.orderId;
    const result = await orderService.getSingleOrderDetailsFromDB(orderId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order fetched successfully',
        data: result,
    });
})

// update order status
const updateOrderStatus =  catchAsync(async(req, res)=> {
    const orderId = req.params.orderId;
    const orderData = req.body;
    const result = await orderService.updateOrderStatusInDB(orderId, orderData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order status updated successfully',
        data: result,
    });
})

// Delete order
const deleteOrder = catchAsync(async(req, res)=> {
    const orderId = req.params.orderId;
   const result = await orderService.deleteOrderFromDB(orderId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order deleted successfully',
        data: result,
    });
})



export const orderController = {
    createOrder,
    getAllOrdersForSingleUser,
    getSingleOrderDetails,
    updateOrderStatus,
    deleteOrder,

}