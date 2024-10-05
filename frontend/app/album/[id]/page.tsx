"use client"

import React, { useEffect, useState } from 'react'
import { albumImageType } from '@/utils/types'
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import AlbumImage from '@/components/albumImage';
import { isLoggedIn } from '@/utils/fetch.api';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import CustomeSpinner from '@/components/spinner';

const page = ({params}: {params: {id : string}}) => {
  // const router = useRouter()
  const {id} = params;
  const [albumImages, setAlbumImages] = useState<albumImageType[]>([]);
  const [loading ,setLoading] = useState(true)
  const router = useRouter();
  useEffect(() => {
    const getAlbumsImage = async () => {
      try {
        const isLogged = await isLoggedIn()
        console.log("he is logged",isLogged)
        
        if(!isLogged) {
          router.push('/login')

        } else {
          const resp = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
          console.log(resp)
          console.log(resp.data)
          if(resp && resp.data) {
              setAlbumImages([...albumImages, ...resp.data])
          }
        }
        setLoading(false)
      } catch (error) {
          setLoading(false)
      }
    }
    getAlbumsImage()
  },[])

  if(loading) return (<CustomeSpinner size="lg" />)

  return (
    <div>
      <Header/>
      <div className='bg-slate-100'>
      <Link href="/dashboard"><div className='items-center p-2'><Button variant="outline" className='ml-5'><ChevronLeft/>Back</Button></div></Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-6 items-center justify-center '>
      {albumImages.map(({albumId, id, title, url, thumbnailUrl}: any) => (
        <AlbumImage key={id} albumId={albumId} id={id} title={title} url={url} thumbnailUrl={thumbnailUrl}/>
      ))}
      </div>
      </div>
    </div>
  )
}



export default page


