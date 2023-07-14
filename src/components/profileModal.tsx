"use client";

import { logOut } from "@/app/api/auth";
import useAuth from "@/hooks/useAuth";
import * as Dialog from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiUser } from "react-icons/fi";

const ProfileModal = () => {
  const [open, setOpen] = useState(false);

  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const path = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={"cursor-pointer"} asChild>
        <div>
          <FiUser size={24} />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#0000005b]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-full flex-col items-center rounded-md bg-white px-8 pb-0 pt-4 shadow">
            <h2 className="pb-4 text-xl sm:text-2xl">
              Currently logged in as{" "}
              <span className="font-semibold">{user?.displayName}</span>
            </h2>
            <p className="text-sm sm:text-base">Your email: {user?.email}</p>
            <div className="flex w-full grow items-center justify-end p-4">
              {user && path !== "/dashboard" && (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    router.push("/dashboard");
                  }}
                  className="outline-secondary mr-auto flex justify-center rounded p-1 px-3 text-center text-sm outline outline-1"
                >
                  Go to Dashboard
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  logOut();
                  setOpen(false);
                  router.replace("/");
                }}
                className="outline-secondary flex justify-center rounded p-1 px-3 text-center text-sm text-[#d46b6b] outline outline-1 outline-[#d46b6b]"
              >
                Log out
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProfileModal;
