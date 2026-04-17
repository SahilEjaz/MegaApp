import React from 'react'
import { useState } from 'react'
import{Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from "../store/authSlice"
import {Button, logo, Input} from './index'
import authService from "../appwrite/auth"
import { useDispatch, } from 'react-redux'
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit}= useForm()
    const [error, setError]=useState("")

    const login = async (data)=> {
        setError("")
        try {
           const session= await authService.logIn(data)
           if (session) {
            const userData= await authService.getCurrentUser() 
            if(userData) dispatch(authLogin(userData) );
            navigate("/")
           }
            
        } catch (error) {
            setError(error.message)
            
        }

    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-lg pl-10 border-black`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <logo width="100% "/>
                </span>

            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>
                Singn in to your account
            </h2>
            <p className='mt-2 text-center text-base text-black/60'>
                <link to="/signup" className='font-medium text-primary duration-200 transition-all hover:underline'>
                Sign up
                </link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>
                {error}</p>}
                <form onClick={handleSubmit(login)}className='mt-8'>
                    <div className='space-y-5'>
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
                        label="Password"
                        placeholder= "enter your password"
                        type="password"
                        {...register("Password",{
                            required: true,
                        })}
                        />
                       <Button
                       type="submit"
                       className='w-full'
                       > Sign in</Button>
                    </div>
                </form>

        </div>
    </div>
  )
}

export default Login