import React from 'react'
import {useForm} from 'react-hook-form'
import { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { forwardRef } from 'react'
import authservice from '../appwrite/auth'
import {Button, Input, logo} from './index'
import { login  } from '../store/authSlice'


function Signup() {
    const navigate= useNavigate()
    const dispatch = useDispatch()
    const{register, handleSubmit}=useForm()
    const [error, setError]=useState()

    const signup= async(data)=>{
        setError("")
        try {
           const userData= await authservice.createAccount(data)
           if(userData){
             const userData= await authservice.getCurrentUser()
             if(userData){
                dispatch(login(userData))
                navigate("/")
             }
           }
            
        } catch (error) {
           setError(error.message)
            
        }
    }

  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg rounded-lg bg-gray-100 border-black/10 p-10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full mx-w-[100px]'>
                    <logo width="100%"/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'> 
            sign up to create account
             </h2>
            <p className='mt-2 text-center text-base text-black/60'>
                <Link to="/login" className=' font-medium text-primary transition-all duration-200 hover:underline'> 
                sign in
                </Link>
                 </p>
                 {error && <p className=' text-red-600 mt-8 text-center'>
                    {error}
                    </p>}
                    <form onClick={handleSubmit(create)}>
                       <div className='space-y-5'>
                        <Input
                        label="full name"
                        type="name"
                        placeholder="Enter your name"
                        {...register("name",{
                            required:true,
                        
                        })}
                        />
                          <Input 
                        label="Email:"
                        placeholder="Enter your Email"
                        type="email"
                        {...register("email",{
                            required: true,
                            validate:{
                                matchPatern: (value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email addres must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password",{
                            required: true
                        })}
                        />

                        <Button type='submit'className='w-full'>
                            create account
                        </Button>
                        </div>
                    </form>
        </div>
    </div>
  )
}

export default Signup