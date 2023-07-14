"use client";

import useAuth from "@/hooks/useAuth";
import TodoList from "./todo/todoList";
import Link from "next/link";

export default function DashboardPage() {
  const { user, isLoggedIn } = useAuth();

  return (
    <>
      {user ? (
        <div className="flex h-[70vh] w-full flex-col items-center sm:m-auto sm:w-4/5 md:w-[45%]">
          <h2 className="text-center text-xl sm:text-2xl">Welcome back</h2>
          <p className="text-center">
            Here's a list of your tasks for this month!
          </p>
          <TodoList />
        </div>
      ) : (
        <Link
          href="/sign-in"
          className="text-xl hover:text-primary sm:text-2xl"
        >
          Log in to continue
        </Link>
      )}
    </>
  );
}
