import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
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
    message: user?._id ? 'User found successfully' : 'User not found',
    data: user,
  });
});

const getSingleUserByGeneratedUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await UserServices.getSingleUserByGeneratedUserIdFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: user?._id ? 'User found successfully' : 'User not found',
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { objectId } = req.params;
  const  userData  = req.body;
  const updatedUser = await UserServices.updateUserInDB(objectId, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { objectId } = req.params;
  const deleteUser = await UserServices.deleteUserFromDB(objectId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: deleteUser,
  });
});

export const UserControllers = {
  createUser,
  getSingleUserByObjectId,
  getSingleUserByGeneratedUserId,
  getAllUsers,
  updateUser,
  deleteUser,
};
