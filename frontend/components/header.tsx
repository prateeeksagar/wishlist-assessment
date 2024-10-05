"use client"
import React from 'react'
import { Button } from './ui/button'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { AudioLines } from 'lucide-react';
import Link from 'next/link'

const Header = () => {

    const router = useRouter()

    const handleLogout = async () => {
        Cookies.remove("token")
        Cookies.remove("id")
        router.push('/login')
    }

  return (
    <div className='p-6 flex items-center justify-between border'>
        <Link href="/dashboard"><AudioLines height={30} width={30}/></Link>
        <div><Button onClick={handleLogout}>Logout</Button></div>
    </div>
  )
}

export default Header