// app/api/auth/verify-email/route.js
import connectDB from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { jwtVerify } from "jose";
import UserModel from "@/models/User.model";
import { isValidObjectId } from "mongoose";

export async function POST(request) {
  try {
    await connectDB();

    const { token } = await request.json();
    if (!token) {
      return response(false, 400, "Token is required");
    }

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const decoded = await jwtVerify(token, secret);

    // Lúc sign bạn dùng: new SignJWT({ id: newRegisterUser._id.toHexString() })
    const userId = decoded.payload.id; // ✅ lấy đúng field id

    if (!isValidObjectId(userId)) {
      return response(false, 400, "Invalid user id");
    }

    // Lấy user từ DB
    const user = await UserModel.findById(userId);
    if (!user) {
      return response(false, 404, "User not found");
    }

    // Cập nhật trạng thái xác minh
    user.isEmailVerified = true;
    await user.save();

    return response(true, 200, "Email verified successfully");
  } catch (error) {
    return catchError(error, "Email verification failed");
  }
}
