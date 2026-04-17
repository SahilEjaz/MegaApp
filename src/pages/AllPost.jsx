import React from 'react'
import {PostCard , Container} from "../components"
import appwriteService from "../appwrite/config"
import { useEffect, useState } from "react"

function AllPost() {
    const[post, setPosts]=useState([])
   useEffect(()=> {},[])
   appwriteService.getPost([]).then((posts)=>{
    if(post){
        setPosts(post.documents)
    }
   })
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {post.map((post) => (
                    <div className='p-2 w-1/2' key={post.$id}>
                        <PostCard post={post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost