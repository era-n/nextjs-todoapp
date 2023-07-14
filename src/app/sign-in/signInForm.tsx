"use client";

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogInSchema } from "@/utils/validation/user.shema";
import { signIn } from "../api/auth";
// import { signIn } from "@/app/api/auth/route";

interface Values {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [inputType, setInputType] = useState<String>("password");
  const router = useRouter();

  const handleSignIn = async (
    values: Values,
    { setErrors }: FormikHelpers<Values>
  ): Promise<void> => {
    await signIn(values.email, values.password)
      .then(() => {
        router.replace("/dashboard");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found")
          setErrors({
            email: "Invalid credentials",
          });
        else if (err.code === "auth/wrong-password")
          setErrors({
            email: "Invalid credentials",
          });
      });
  };

  return (
    <div className="flex w-4/5 grow flex-col items-stretch justify-center gap-4 pb-24 sm:w-2/4 md:w-[35%] lg:w-1/4">
      <h2 className="text-center text-2xl font-bold">Sign In</h2>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LogInSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSignIn}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col gap-4">
              <Field
                id="email"
                name="email"
                placeholder="Email"
                type="text"
                className="rounded border p-2 shadow focus-visible:border-primary focus-visible:outline-none"
              />
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  type={inputType}
                  className="w-full rounded border p-2 shadow focus-visible:border-primary focus-visible:outline-none"
                />
                <div
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  tabIndex={0}
                  onClick={() => {
                    setInputType((prev) =>
                      prev === "password" ? "text" : "password"
                    );
                  }}
                >
                  {inputType === "password" ? (
                    <HiOutlineEye size={24} color={"#ccd3e0"} />
                  ) : (
                    <HiOutlineEyeOff size={24} color={"#ccd3e0"} />
                  )}
                </div>
              </div>
              <div className="w-full">
                <ErrorMessage name="email" component="div" />
                <ErrorMessage name="password" component="div" />
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className=" flex justify-center rounded bg-primary p-2 text-center text-primary-foreground"
              >
                {isSubmitting ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-primary-foreground border-l-transparent"></div>
                ) : (
                  "Sign In"
                )}
              </button>
              <Link href="/sign-up" className="hover:text-primary-darker">
                Don't have an account?
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
