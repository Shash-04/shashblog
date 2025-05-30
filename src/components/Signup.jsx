import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authslice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { set, useForm } from 'react-hook-form'


function Signup() {
    const navigate = useNavigate()
    const [error, setErrors] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setErrors("")
        try {
            const userData = await authService.createAccount
                (data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login({ userData }))
                    navigate('/all-posts')
                }
            }
        } catch (error) {
            setErrors(error.message)
        }
    }



    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[160px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-xl text-black text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5 my-6'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                       
                        <Button 
                        type="submit" 
                        className="x-6 py-3 bg-blue-500 text-white font-semibold rounded-lg text-2xl w-5/6 shadow-md hover:bg-blue-600 focus:outline-none hover:scale-105 transition-all">
                            Create Account
                        </Button>
                        
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup
