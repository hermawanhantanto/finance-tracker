import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LandmarkIcon, Loader2Icon } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { signUpSchema, type SignUpFormValues } from "@/features/auth/sign-up-schema";
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

/**
 * Sign-up page with split layout — image left, form right.
 * Validates name, email, password strength, and confirm password match.
 * On success, navigates to /sign-in.
 *
 * @returns The sign-up page component.
 */
export function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    setIsSubmitting(true);
    try {
      const { error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message || "Sign up failed");
      } else {
        toast.success("Account created successfully! Please sign in.");
        navigate("/sign-in");
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
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create your account to get started
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
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
                          placeholder="Create a password"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
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
                          type="password"
                          placeholder="Confirm your password"
                          autoComplete="new-password"
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
                  {isSubmitting ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col gap-3 pt-2">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-medium text-primary hover:underline hover:text-primary/80"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
        </div>
      </div>
    </div>
  );
}
