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

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [inputErrorUsername, setInputErrorUsername] = useState("");
  const [inputErrorPassword, setInputErrorPassword] = useState("");

  const handleLogin = () => {
    if (username.length < 3) {
      alert("Username be at least 3 characters");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (!username || !password) {
      alert("Please enter your username and password");
      return;
    }
    alert(`Username: ${username} | Password: ${password}`);
  };

  return (
    <main className="px-4 container py-8 flex flex-col justify-center items-center max-w-screen-md h-[80vh]">
      <form className="w-full max-w-[512px]" onSubmit={handleLogin}>
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="Username"
                onChange={(e) => {
                  if (e.target.value.length < 3) {
                    setInputErrorUsername("Username be at least 3 characters");
                  } else {
                    setInputErrorUsername("");
                  }
                  setUsername(e.target.value);
                }}
              />
              <p className="text-red-500 text-sm text-muted-foreground pt-1">
                {inputErrorUsername}
              </p>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => {
                  if (e.target.value.length < 8) {
                    setInputErrorPassword(
                      "Password must be at least 8 characters"
                    );
                  } else {
                    setInputErrorPassword("");
                  }
                  setPassword(e.target.value);
                }}
              />
              <p className="text-red-500 text-sm text-muted-foreground pt-1">
                {inputErrorPassword}
              </p>
            </div>

            <div className="flex justify-end items-center space-x-2 my-2">
              <Checkbox
                id="show-password"
                onCheckedChange={(show) => setShowPassword(show)}
              />
              <Label htmlFor="show-password" className="hover:cursor-pointer">
                Show Password
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 w-full">
            <Button
              disabled={username.length < 3 || password.length < 8}
              className="w-full"
              type="submit"
            >
              LoginPage
            </Button>
            <Button variant="link" className="w-full">
              Don&apos;t have an account?
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
