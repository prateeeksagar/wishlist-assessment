"use client"
import React from 'react'
import { Button } from './ui/button'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { AudioLines } from 'lucide-react';
import Link from 'next/link'
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {

    const router = useRouter()

    const handleLogout = async () => {
        Cookies.remove("token")
        Cookies.remove("id")
        router.push('/login')
    }

  return (
    <div className='p-6 flex items-center justify-between border'>
        <Link href="/dashboard"><AudioLines height={30} width={30} className='text-rose-700'/></Link>
        <div>

          <ModeToggle/>
          <Button onClick={handleLogout}>Logout</Button>

        </div>
    </div>
  )
}


export function ModeToggle() {
  const { setTheme } = useTheme()
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default Header