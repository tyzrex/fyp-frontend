"use client";

import { LoginSchemaType, loginSchema } from "@/schema/login-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import RHFInput from "../rhf-components/rhf-input";
import { Button } from "../ui/button";
import ButtonLoader from "../ui/button-loader";
import { toast } from "sonner";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const router = useRouter();

  async function loginUser(data: LoginSchemaType) {
    const response = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (response?.error === null) {
      console.log("here");
      toast.success("Login Success");
      router.replace("/dashboard/stocks-list");
    } else {
      toast.error("Invalid Credentials");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(loginUser)} className="space-y-4">
          <RHFInput<LoginSchemaType>
            name="username"
            type="text"
            placeHolder="Enter your username"
            formLabel="Username"
          />

          <RHFInput<LoginSchemaType>
            name="password"
            type="password"
            placeHolder="Enter your password"
            formLabel="Password"
          />

          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full text-black hover:text-white hover:border hover:border-primary"
          >
            {isSubmitting && <ButtonLoader />}
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
