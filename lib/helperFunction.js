import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = {}) => {
  return NextResponse.json(
    {
      success,
      message,
      data,
    },
    { status: statusCode } // truyền đúng status code
  );
};

export const catchError = (error, customMessage) => {
  // Duplicate key error (Mongo)
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern).join(", ");
    error.message = `Duplicate fields: ${keys}. These fields value must be unique.`;
  }

  let errorObj = {};

  if (process.env.NODE_ENV === "development") {
    errorObj = {
      message: error.message,
      error,
    };
  } else {
    errorObj = { message: customMessage || "Internal server error." };
  }

  return NextResponse.json(
    {
      success: false,
      ...errorObj,
    },
    { status: 500 }
  );
};
