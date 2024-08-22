import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const { user: userData } = req.body;

  const result = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});


const getSingleUserByObjectId = catchAsync(async (req, res) => {
  const { objectId } = req.params;
  const user = await UserServices.getSingleUserByObjectIdFromDB(objectId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User found successfully',
    data: user,
  });
});


const getSingleUserByGeneratedUserId= catchAsync(async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const user = await UserServices.getSingleUserByGeneratedUserIdFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User found successfully',
    data: user,
  });
});


export const UserControllers = {
  createUser,
  getSingleUserByObjectId,
  getSingleUserByGeneratedUserId,
};
