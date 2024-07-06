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
import { Link } from "react-router-dom";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username has to be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password has to be at least 8 characters" }),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    reValidateMode: "onSubmit",
  });

  const handleLogin = async (inputValues) => {
    try {
      const userResponse = await axiosInstance.get("/users", {
        params: {
          username: inputValues.username,
        },
      });

      if (
        userResponse.data.length &&
        userResponse.data[0].password === inputValues.password
      ) {
        alert("Login successful");
        dispatch({
          type: "LOGIN",
          payload: userResponse.data[0],
        });

        localStorage.setItem("current-user", userResponse.data[0].id);

        form.reset();
      } else {
        alert("Invalid username or password");
      }
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
            onSubmit={form.handleSubmit(handleLogin)}
          >
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
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
                <div className="flex justify-end items-center space-x-2 my-2">
                  <Checkbox
                    id="show-password"
                    onCheckedChange={(show) => setShowPassword(show)}
                  />
                  <Label
                    htmlFor="show-password"
                    className="hover:cursor-pointer"
                  >
                    Show Password
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 w-full">
                <Button className="w-full" type="submit">
                  Login
                </Button>
                <Link to="/auth/register">
                  <Button variant="link" className="w-full">
                    Don&apos;t have an account?
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </GuestPage>
  );
}
