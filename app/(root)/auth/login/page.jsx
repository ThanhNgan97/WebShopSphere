"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Logo from "@/public/assets/images/logo-black.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { zSchema } from "@/lib/zodSchema";

import {FaRegEyeSlash} from 'react-icons/fa';
import {FaRegEye} from 'react-icons/fa6';

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

const LoginPage = () => {
    const [loading, setLoading] = useState(false);

    const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema.pick({
    email: true
  }).extend({
    password:z.string().min('3', 'Password field is required')
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      
    },
  });

  const handleLoginSubmit = async (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <Card className="w-[450px]">
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
          <h1 className="text-3xl font-bold">Login Into Account</h1>
          <p className="text-xm text-muted-foreground ">Login into your account by filling out the form below.</p>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLoginSubmit)} className="space-y-6">
                <div className="mb-5">
                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mt-4 block text-base ">Email</FormLabel>
                            <FormControl>
                            <Input 
                                className="border-1 border-gray-300 p-2 rounded-md h-10 " 
                                type={isTypePassword ? "password" : "text"} 
                                placeholder="you@example.com" 
                                {...field} 
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>

                <div className="mb-5">
                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-base ">Password</FormLabel>
                            <FormControl>
                            <div className="relative">
                                <Input
                                className="border-1 border-gray-300 p-2 rounded-md h-10 pr-10"
                                type={isTypePassword ? "password" : "text"}
                                placeholder="••••••••"
                                {...field}
                                />
                                <button
                                type="button"
                                onClick={() => setIsTypePassword(!isTypePassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
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

                <div>
                    <ButtonLoading 
                    loading={loading}
                    className="w-full h-10 text-base cursor-pointer"
                    type="submit" 
                    text="Login" 
                    />
                </div>

            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
