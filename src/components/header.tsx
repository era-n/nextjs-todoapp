"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import ProfileModal from "./profileModal";

export default function Header() {
  const { isLoggedIn, user } = useAuth();

  return (
    <header className="flex w-full items-center justify-between px-6 py-4 shadow-[0_1px_#DBE2EF] sm:px-12">
      <Link href="/">
        <h1 className="cursor-pointer text-4xl">ToDo App</h1>
      </Link>
      {user && <ProfileModal />}
    </header>
  );
}
