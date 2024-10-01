import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";


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

export const orderController = {
    createOrder
}