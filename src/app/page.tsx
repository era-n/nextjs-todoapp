import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h2 className="text-center text-xl sm:text-3xl">Welcome to ToDo App</h2>
      <h3 className="pb-4 pt-1 text-center text-base sm:text-xl">
        Click on button below to start managing your daily life!
      </h3>
      <Link
        href="/sign-up"
        className="hover:bg-primary-dark rounded bg-primary p-2 px-4 text-center text-primary-foreground sm:p-3"
      >
        Get started
      </Link>
    </>
  );
}
