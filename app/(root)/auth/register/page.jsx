"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Logo from "@/public/assets/images/logo-black.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { zSchema } from "@/lib/zodSchema";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { WEBSITE_LOGIN } from "@/routers/WebsiteRoute";
import axios from "axios";
import bcrypt from "bcryptjs";



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
import { th } from "zod/v4/locales";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(true);

  const formSchema = zSchema.pick({ 
    email: true,
    name: true,
    password: true 
  })
    .extend({
      name: z.string().min(2, "Full name must be at least 2 characters"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(6, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterSubmit = async (values) => {
   try{
    setLoading(true);
    const {data:registerResponse} = await axios.post('/api/auth/register', values);
    if(!registerResponse.success){
        throw new Error(registerResponse.message);
    }
    form.reset();
    alert(registerResponse.message);

   }catch(error){
    alert(error.message)
   }finally{
    setLoading(false);
   }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-b from-purple-400 via-pink-300 to-blue-300">
      <Card className="w-[450px] max-w-[90%] backdrop-blur-md bg-white/30 rounded-xl shadow-lg">
        <CardContent className="px-8 py-6">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src={Logo.src}
              width={Logo.width}
              height={Logo.height}
              alt="logo"
              className="max-w-[150px]"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-sm text-white/80 mt-1">
              Register by filling out the form below.
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegisterSubmit)}
              className="space-y-4"
            >
              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full h-10 rounded-md px-3 text-black"
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

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

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="w-full h-10 rounded-md px-3 pr-10 text-black"
                          type={isTypeConfirmPassword ? "password" : "text"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setIsTypeConfirmPassword(!isTypeConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        >
                          {isTypeConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
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
                className="w-full h-10 text-base bg-blue-600 text-white rounded-md hover:bg-blue-700"
                type="submit"
                text="Register"
              />

              {/* Link to login */}
              <div className="text-center text-white/80 text-primary">
                Already have an account?{" "}
                <Link href={WEBSITE_LOGIN} className="underline text-purple-400 text-primary">
                  Login here
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>

  );
};

export default RegisterPage;
