"use client";
import { isLoggedIn } from "@/utils/fetch.api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AudioLines } from "lucide-react";
import PageTransition from "@/components/pageTransition";


// import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const userLogged = async () => {
    const loggedIn = await isLoggedIn();
    if (loggedIn) {
      router.push("/dashboard");
    }
  };
  useEffect(() => {
    userLogged();
  }, []);

  return (
    <PageTransition>
    <main className="flex flex-col h-screen max-w-screen items-center justify-center bg-slate-100">
      <div className="p-6 flex items-center justify-between">
        <Link href="/">
          <AudioLines height={60} width={60} className="text-rose-700 " />
        </Link>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold items-center justify-center">Welcome to Bliss</h1>
      <p className="text-lg text-gray-600 m-8">
        Immerse yourself in a world of relaxing sounds. Let the music take you
        away!
      </p>
      <div className="flex flex-row gap-4">
        <Link href="/signup">
          <Button variant="outline" className="p-4">
            Sign Up
          </Button>
        </Link>
        <Link href="/login">
          <Button className="p-4">Login</Button>
        </Link>
      </div>
    </main>
    </PageTransition>
  );
}