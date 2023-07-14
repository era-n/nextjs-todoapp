"use client";

import { updateProfile } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RegSchema } from "@/utils/validation/user.shema";
import { signUp } from "../api/auth";

interface Values {
  username: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const [inputType, setInputType] = useState<String>("password");
  const router = useRouter();

  const handleSignUp = async (
    values: Values,
    { setErrors }: FormikHelpers<Values>
  ): Promise<void> => {
    await signUp(values.email, values.password)
      .then(async (res) => {
        await updateProfile(res.user, {
          displayName: values.username,
        });
        router.push("/dashboard");
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setErrors({
            email: "User with provided email already exists",
          });
        }
      });
  };

  return (
    <div className="flex w-4/5 grow flex-col items-stretch justify-center gap-4 pb-24 sm:w-2/4 md:w-[35%] lg:w-1/4">
      <h2 className="text-center text-2xl font-bold">Sign Up</h2>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={RegSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSignUp}
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
              <Field
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                className="rounded border p-2 shadow focus-visible:border-primary focus-visible:outline-none"
              />
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  type={inputType}
                  className="w-full rounded border  p-2 shadow focus-visible:border-primary focus-visible:outline-none"
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
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-error"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-error"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-error"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="flex justify-center rounded bg-primary p-2 text-center text-primary-foreground"
              >
                {isSubmitting ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-primary-foreground border-l-transparent"></div>
                ) : (
                  "Sign Up with Email"
                )}
              </button>
              <Link href="/sign-in" className="hover:text-primary-darker">
                Already have an account?
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
