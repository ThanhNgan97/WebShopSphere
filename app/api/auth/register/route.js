import { z } from "zod";
import bcrypt from "bcrypt";
import { emailVerificationLink } from "@/email/emailVerificationLink";
import { SignJWT } from "jose";
import { sendMail } from "@/lib/sendMail";
import connectDB from "@/lib/databaseConnection";
import UserModel from "@/models/User.model";
import dotenv from "dotenv";
dotenv.config();

// Hàm response chuẩn
function response(success, status, message, data = null) {
  return new Response(
    JSON.stringify({ success, message, data }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

// Hàm catch lỗi
function catchError(error, message = "Internal Server Error") {
  console.error(message, error);
  return new Response(
    JSON.stringify({ success: false, message, error: error?.message || error }),
    { status: 500, headers: { "Content-Type": "application/json" } }
  );
}

export async function POST(request) {
  try {
    await connectDB();

    // Validate input
    const validationSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const payload = await request.json();
    const validationData = validationSchema.safeParse(payload);

    if (!validationData.success) {
      return response(false, 400, "Invalid or missing input field", validationData.error);
    }

    const { name, email, password } = validationData.data;

    // Check if user exists
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return response(false, 409, "User already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newRegisterUser = new UserModel({ name, email, password: hashedPassword });
    await newRegisterUser.save();

    // JWT token
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ id: newRegisterUser._id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    // Send verification email
    await sendMail(
      "Email Verification request from Developer Nancy",
      email,
      emailVerificationLink(
        `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`
      )
    );

    return response(
      true,
      200,
      "User registered successfully. Please verify your email to activate your account"
    );
  } catch (error) {
    return catchError(error, "Error in user registration");
  }
}
