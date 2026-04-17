import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {Button, Container } from '.././components/index'
import {useNavigate, useParams, Link} from 'react-router-dom'
import parse from 'html-react-parser'
import appwriteService from '../appwrite/config'

function Post() {
    const[post,setPosts]=useState(null);
    const{slug}=useParams();
    const navigate= useNavigate();
    const userData = useParams((state)=>state.auth.userData);

    const isAuthor= post && userData ? post.userData === userData.$id  : false;

    useEffect(()=> {
        if (slug){
            appwriteService.getPost(slug).then((post)=> {
                if(post){
                    setPosts(post);
                }else{
                    navigate("/");
                }
            })
        }
    },[slug, navigate])

    const deletePost = ()=>{
        appwriteService.deleteFile(post.$id).then((status)=>{
            if(status){
                appwriteService.deleteFile(post.featuredImage);
                navigate("/")
            }
        })
    }

    return (
    <div className='py-8'>
        <Container>
           <div className='w-full flex justify-center mb-4 rounded-xl p-2 relative border'>
            <img 
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className='rounded-xl'
            />
            {
                post && (
                    <div className='absolute right-6 top-6'>
                        <Link to={`/edit-post/${post.$id}`}>
                            <button className='mr-3'bgColor="bg-green-500"> 
                            Edit
                             </button>
                        </Link>
                        <button onClick={deletePost} bgColor="bg-red-500">
                            delete
                        </button>
                    </div>
                )
            }
           </div>
           <div className='w-full mb-6'>
            <h1 className='text-2xl font-bold'>
                {post.title}
            </h1>
           </div>
           <div className='Browser-css'>
            {parse(post.content)}
           </div>
        </Container>
    </div>
  )
}

export default Post