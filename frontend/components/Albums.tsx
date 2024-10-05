"use client"
import { isLoggedIn, postData } from '@/utils/fetch.api'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { albumType } from '../utils/types'
import Album from './album'
import { CustomPagination } from './pagination'
import { AlbumTitle } from './skeletons/skeletons'
import { useRouter } from 'next/navigation'

const Albums = () => {
    const [albums, setAlbums] = useState<albumType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const [isLoading, setIsLoading] = useState()
    const router = useRouter()
    // Fetch albums once when the component mounts
    const getAlbums = async () => {
      try {
        
        const loggedIn = await isLoggedIn()
        if(!loggedIn) {
            router.push('/login')
        } else {
            const response = await axios.get(
              `https://jsonplaceholder.typicode.com/albums`
            );
            setAlbums(response.data); // Store all albums in state
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
  
    useEffect(() => {
      getAlbums(); // Fetch albums when the component mounts
    }, []);
  
    // Calculate the albums to display for the current page
    const indexOfLastAlbum = currentPage * itemsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - itemsPerPage;
    const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
    const totalItems = albums.length; // Total items is the length of all albums
  
    return (
      <div className='my-3'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 m-2'>
          {currentAlbums.map(({ title, id, userId }) => (
            <Album key={id} title={title} id={id} userId={userId} />
          ))}
        </div>
        {currentAlbums.length ? <CustomPagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage} // Update the current page
        /> : null}
      </div>
    );
  };
  

export default Albums