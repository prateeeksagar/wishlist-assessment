"use client"
import { isLoggedIn } from "@/utils/fetch.api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
      const userLogged = async () => {
        let loggedIn = await isLoggedIn()
        if(loggedIn) {
          router.push('/dashboard')
        }
      } 
      userLogged()
    },[])

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      Hello
    </main>
      
  );
}
