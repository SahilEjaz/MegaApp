import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard( $id, title, featuredImage) {
  return (
    <link to={`/post/${$id}`}>
        <div className='w-full bg-gray-200 rounded-lg px-4'>
            <div className='w-full mb-4 justify-center'>
               <image src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl'/>
            </div>
            <h2 className='text-xl font-bold'> 
                {title}
                </h2>
        </div>
    </link>
  )
}

export default PostCard