import React from 'react'
import { albumImageType } from '@/utils/types'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import Image from 'next/image'

const AlbumImage = ({albumId, id ,title, url, thumbnailUrl}: albumImageType) => {
  return (
    <Card className="w-full md:max-w-[1/3] md:h-[] md:w-[1/3] items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 dark:bg-slate-400 dark:text-white">
      <CardHeader className="relative w-full h-48 overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
        />
      </CardHeader>
      <CardContent className="p-4 flex flex-col justify-between dark:text-white">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
        <p className="text-gray-600">Album ID: {albumId}</p>
      </CardContent>
      <CardFooter className="p-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline transition-colors duration-200"
        >
          View Full Image
        </a>
      </CardFooter>
    </Card>
  )
}

export default AlbumImage