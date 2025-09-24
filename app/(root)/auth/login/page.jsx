"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Logo from "@/public/assets/images/logo-black.png";
// import Facebook from "@public/assets/images/facebook.png";
// import Google from "@public/assets/images/google.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { zSchema } from "@/lib/zodSchema";

import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

import { WEBSITE_REGISTER } from "@/routers/WebsiteRoute";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/Application/ButtonLoading";
import Link from "next/link";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema
    .pick({ email: true })
    .extend({ password: z.string().min(3, "Password field is required") });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLoginSubmit = async (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-purple-400 via-pink-300 to-blue-300">
        <Card className="w-[400px] max-w-[90%] backdrop-blur-md bg-white/30 rounded-xl shadow-lg">
        <CardContent className="px-8 py-6">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src={Logo.src}
              width={Logo.width}
              height={Logo.height}
              alt="logo"
              className="max-w-[120px]"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white">Sign Up</h1>
         
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLoginSubmit)} className="space-y-4">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full h-10 rounded-md px-3 text-black"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="w-full h-10 rounded-md px-3 pr-10 text-black"
                          type={isTypePassword ? "password" : "text"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setIsTypePassword(!isTypePassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        >
                          {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <ButtonLoading
                loading={loading}
                className="w-full h-10 text-base bg-blue-600 text-white rounded-md hover:bg-blue-400"
                type="submit"
                text="Sign Up"
              />
            </form>
          </Form>

          {/* Or sign up with */}
          <div className="flex flex-col items-center justify-center gap-2 mt-4 text-white">
            <p>or sign up with</p>
            <div className="flex gap-2">
              <button className="bg-white/80 rounded-full w-8 h-8 flex items-center justify-center p-1">
                <Image
                  src="/assets/images/facebook.png" 
                  alt="Facebook"
                  width={50}
                  height={50}
                  className="30px "
                />
              </button>
              <button className="bg-white/80 rounded-full w-8 h-8 flex items-center justify-center p-1">
                <Image
                  src="/assets/images/google.png" // 
                  className="30px "
                  alt="Google"
                  width={50}
                  height={50}
                />
              </button>
            </div>

          </div>


          {/* Footer */}
            <div className="text-center mt-4">
              <div className="flex justify-center items-center gap-1">
                  <p >Don't have an account? </p>
                  <Link href={WEBSITE_REGISTER} className="text-primary underline">Create account!</Link>
              </div>

              <div className="mt-2">
                  <Link href="" className="text-primary underline">Forgot Password?</Link>
              </div>
                </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
