import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
  FormControl,
  FormDescription,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosInstance } from "@/lib/axios";
import { useDispatch } from "react-redux";
import GuestPage from "@/components/guard/GuestPage";

const loginSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z
      .string()
      .min(3, { message: "Username has to be at least 3 characters" }),
    password: z
      .string()
      .min(8, { message: "Password has to be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must be match with password" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match!",
        path: ["confirmPassword"],
      });
    }
  });

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(loginSchema),
    reValidateMode: "onSubmit",
  });

  const handleRegister = async (inputValues) => {
    try {
      const userResponse = await axiosInstance.get("/users");
      const userEmail = userResponse.data.find(
        (user) => user.email === inputValues.email
      );
      const userUsername = userResponse.data.find(
        (user) => user.username === inputValues.username
      );

      if (userEmail) {
        throw new Error("Email already exists!");
      } else if (userUsername) {
        throw new Error("Username already exists!");
      }

      await axiosInstance.post("/users", {
        email: inputValues.email,
        username: inputValues.username,
        password: inputValues.password,
        fullName: inputValues.username,
        role: "user",
        image:
          "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
      });
      alert("Register Successfully!");
      dispatch({
        type: "LOGIN",
        payload: inputValues,
      });
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GuestPage>
      <main className="px-4 container py-8 flex flex-col justify-center items-center max-w-screen-md h-[80vh]">
        <Form {...form}>
          <form
            className="w-full max-w-[512px]"
            onSubmit={form.handleSubmit(handleRegister)}
          >
            <Card>
              <CardHeader>
                <CardTitle>Create an Account!</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Username has to be at least 3 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                        />
                      </FormControl>
                      <FormDescription>
                        Password has to be at least 8 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                        />
                      </FormControl>
                      <FormDescription>
                        Confirm Password must be match with password
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end items-center space-x-2 my-2">
                  <Checkbox
                    id="show-password"
                    onCheckedChange={(show) => setShowPassword(show)}
                  />
                  <Label
                    htmlFor="show-password"
                    className="hover:cursor-pointer"
                  >
                    Show Passwords
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 w-full">
                <Button className="w-full" type="submit">
                  Register
                </Button>
                <Button variant="link" className="w-full">
                  Already have an account?
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </GuestPage>
  );
}
