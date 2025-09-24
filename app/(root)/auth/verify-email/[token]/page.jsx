"use client";

import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import React, { useState, useEffect } from "react";
import verifiedImg from "@/public/assets/images/verified.gif";
import verificationFailedImg from "@/public/assets/images/verification-failed.gif";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";  
import { WEBSITE_HOME } from "@/routers/WebsiteRoute";

const EmailVerification = ({ params }) => {
  const { token } = params;
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const { data: verificationResponse } = await axios.post(
          "/api/auth/verify-email",
          { token }
        );
        setIsVerified(verificationResponse.success);
      } catch (err) {
        setIsVerified(false);
      }
    };
    verify();
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardContent>
          {isVerified === null ? (
            <p className="text-center">Verifying...</p>
          ) : isVerified ? (
            <div>
              <div className="flex justify-center items-center">
                <Image src={verifiedImg} 
                alt="verified"
                width={verifiedImg.width} 
                height={verifiedImg.height}
                className="h-[100px] w-auto" 
                />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-green-500 my-5">
                  Email verification success!
                </h1>
                <Button asChild>
                  <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center items-center">
                <Image
                  src={verificationFailedImg}
                  alt="verification failed"
                  width={verificationFailedImg.width}
                  height={verificationFailedImg.height}
                  className="h-[100px] w-auto"
                />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-500 my-5">
                  Email verification failed!
                </h1>
                <Button asChild>
                  <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default EmailVerification;
