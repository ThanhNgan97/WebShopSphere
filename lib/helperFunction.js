import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = {}) =>{
    return NextResponse.json({
        success,
        message,
        data
    })
}

export const catchError = (error, customMessage) => {
    //handing duplicate key error
    if(error.code === 11000){
        const keys = Object.keys(error.keyPattern).join(", ");
        error.message=`Duplicate fields: ${keys}. These fields value must be unique.`;
    }

    let errorObj = {}

    if(process.env.NODE_ENV === "development"){
        errorObj = {
            message: error.message,
            error
        }        
    }else{
        errorObj = { message: customMessage || "Internal server error." }
    }

    return response(false, 500, error.code, ...errorObj);
}