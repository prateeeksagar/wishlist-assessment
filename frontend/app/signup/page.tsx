"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postData } from "@/utils/fetch.api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type signupType = {
    message: string,
    status: boolean
}

export default function Page () {

    const [userDetails, setUserDetails] = useState({username: "", password: ""})
    const router = useRouter()

    const handleSubmit = async () => {
        try {
            const resp:signupType = await postData('/auth/signup',userDetails)
            if(resp && resp.status) {
                router.push("/login")
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }

    return     <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
    <div className="flex mx-4 mt-12 md:mt-0  items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">
            Enter your details below to sign up to your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">User Name</Label>
            <Input
              id="username"
              type="text"
              placeholder="prateekcool3"
              required
              onChange={(e) =>
                setUserDetails({ ...userDetails, username: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </div>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
    <div className="hidden bg-muted lg:block">
      <h1 className="flex h-full items-center justify-center text-[50px] font-bold">Music is the universal <br/> Language of mankind</h1>
    </div>
  </div>
}