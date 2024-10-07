"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isLoggedIn, postData } from "@/utils/fetch.api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { toast } from "sonner"
import { AudioLines } from "lucide-react";
import PageTransition from "@/components/pageTransition";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/features/authSlice";
import { RootState, AppDispatch } from "@/redux/store";

type logInResponse = {
  message: string;
  status: boolean;
  token?: string;
  id?: string;
};

export default function Page() {
  const [credential, setCredential] = useState({ username: "", password: "" });
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // const { isLoggedIn } = useSelector((state: RootState) => state.auth);


  // const handleSubmit = async () => {
  //   try {
  //     const resp: logInResponse = await postData("/auth/login", credential);
  //     if (resp && resp.status && resp.token && resp.id) {
  //       Cookies.set("token", resp.token);
  //       Cookies.set("id", resp.id);
  //       router.push("/dashboard");
  //       toast('Successfully LoggedIn!')

  //     } else {
  //       toast(resp.message || "please try again.")
  //     }
  //   } catch (error: any) {
  //     toast(error.message || "please try again.")
  //   }
  // };

  const handleSubmit = () => {
    dispatch(loginUser(credential))
      .unwrap()
      .then(() => {
        router.push("/dashboard");
        toast('Successfully Logged In!');
      })
      .catch((err: any) => {
        toast(err || "Login failed, please try again.");
      });
  };

  useEffect(() => {
    const userLogged = async () => {
      let loggedIn: any = await isLoggedIn();
      if (loggedIn) {
        router.push("/dashboard");
      }
    };
    userLogged();
  }, []);

  return (
    <PageTransition>
    <div>
    <div className='p-6 flex items-center justify-between border'>
      <Link href="/"><AudioLines height={30} width={30}className="text-rose-700"/></Link>
    </div>
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex mx-4 mt-12 md:mt-0  items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to login to your account
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
                  setCredential({ ...credential, username: e.target.value })
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
                  setCredential({ ...credential, password: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <h1 className="flex h-full items-center justify-center text-[50px] font-bold">Where words fail, <br/> Music Speaks</h1>
      </div>
    </div>
    </div>
    </PageTransition>
  );
}
