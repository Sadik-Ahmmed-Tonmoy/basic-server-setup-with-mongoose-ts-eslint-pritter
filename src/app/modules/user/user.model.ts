import { Schema, model } from 'mongoose';
import { TAddress, TUser, TUserName, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { UserStatus } from './user.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const addressSchema = new Schema<TAddress>({
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  zone: {
    type: String,
    required: [true, 'Zone is required'],
  },
  area: {
    type: String,
    required: [true, 'Area is required'],
  },
  detailsAddress: {
    type: String,
    required: [true, 'Details Address is required'],
  },
});

const userSchema = new Schema<TUser, UserModel>(
  {
    userId: {
      type: String,
      required: [true, 'UserId is required'],
      unique: true,
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      // lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: 0,
    },
    needChangePassword: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt:{
      type: Date,
      default: new Date(),
    },
    avatar: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['superAdmin', 'admin', 'user'],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    address: {
      type: addressSchema,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,   
    },
  },
);

//virtual
userSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + ' ' + this?.name?.lastName;
});

// Query Middleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});




// userSchema.statics.isUserExistsByCustomId = async function (userId: string) {
//   return await User.findOne({ userId }).select('+password');
// };
userSchema.statics.isUserExistsByCustomIdOrEmail = async function (
  userIdOrEmail: string
) {
  return await User.findOne({
    $or: [{ userId: userIdOrEmail }, { email: userIdOrEmail }],
  }).select('+password');
};


userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};


export const User = model<TUser, UserModel>('User', userSchema);
