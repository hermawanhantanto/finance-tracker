import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LandmarkIcon, Loader2Icon } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { signInSchema, type SignInFormValues } from "@/features/auth/sign-in-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    setIsSubmitting(true);
    try {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message || "Sign in failed");
      } else {
        toast.success("Signed in successfully!");
        navigate("/");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: Image — hidden on small screens */}
      <div className="relative hidden md:block md:w-1/2">
        <img
          src="/assets/images/side-image-auth.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Right: Form — full width on mobile, half on desktop */}
      <div className="flex w-full items-center justify-center px-6 md:w-1/2">
        <div className="w-full max-w-md space-y-6">
          {/* Brand */}
          <div className="flex items-center justify-center gap-2">
            <LandmarkIcon className="size-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight">SmartFin</span>
          </div>

          <Card>
          <CardHeader className="text-left">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
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
                          type="password"
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2Icon className="animate-spin" />
                  )}
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col gap-3 pt-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="font-medium text-primary hover:underline hover:text-primary/80"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
        </div>
      </div>
    </div>
  );
}
