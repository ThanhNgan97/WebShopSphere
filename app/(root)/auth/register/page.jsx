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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-[450px] shadow-lg">
        <CardContent>
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src={Logo.src}
              width={Logo.width}
              height={Logo.height}
              alt="logo"
              className="max-w-[150px]"
            />
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-xm text-muted-foreground">
              Register by filling out the form below.
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegisterSubmit)}
              className="space-y-6"
            >
              {/* Full Name */}
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mt-4 block text-base">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="border-1 border-gray-300 p-2 rounded-md h-10 text-lg"
                          type="text"
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-base">Email</FormLabel>
                      <FormControl>
                        <Input
                          className="border-1 border-gray-300 p-2 rounded-md h-10 text-lg"
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password */}
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-base">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="border-1 border-gray-300 p-2 rounded-md h-10 pr-10 text-lg"
                            type={isTypePassword ? "password" : "text"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setIsTypePassword(!isTypePassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            aria-label={isTypePassword ? "Show password" : "Hide password"}
                          >
                            {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-base">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="border-1 border-gray-300 p-2 rounded-md h-10 pr-10 text-lg"
                            type={isTypeConfirmPassword ? "password" : "text"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setIsTypeConfirmPassword(!isTypeConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            aria-label={
                              isTypeConfirmPassword
                                ? "Show confirm password"
                                : "Hide confirm password"
                            }
                          >
                            {isTypeConfirmPassword ? (
                              <FaRegEyeSlash />
                            ) : (
                              <FaRegEye />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit */}
              <div className="mb-3">
                <ButtonLoading
                  loading={loading}
                  className="w-full h-10 text-base cursor-pointer"
                  type="submit"
                  text="Register"
                />
              </div>

              {/* Link to login */}
              <div className="text-center">
                <div className="flex justify-center items-center gap-1">
                  <p>Already have an account?</p>
                  <Link href={WEBSITE_LOGIN} className="text-primary underline">
                    Login here
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
