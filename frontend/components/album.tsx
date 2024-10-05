import React from 'react'
import { albumType } from '../utils/types'
import Link from 'next/link'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle } from './ui/card'

const Album = ({userId, id, title}: albumType) => {
  return (
    <Link href={`/album/${id}`} passHref>
      <Button variant="ghost" className="w-full h-full m-1 text-left">
        <Card className="w-full h-full hover:shadow-md">
          <CardHeader className='h-full items-start justify-center'>
            <CardTitle className="text-lg items-center justify-center ">
              {title}
            </CardTitle>
          </CardHeader>
        </Card>
      </Button>
    </Link>
  )
}

export default Album