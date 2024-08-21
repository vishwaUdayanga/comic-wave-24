'use client'

import Link from "next/link";
import Image from "next/image";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from "./../lib/zod-schemas";
import { createStudent, IncomingState } from "../lib/actions";
import { useState, useEffect } from "react";
import { string, z } from 'zod';
import { stat } from "fs";

type FormValues = z.infer<typeof signUpSchema>;

export default function Signup() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(signUpSchema),
        mode: 'onTouched',
        defaultValues: {
            registration_number: '',
            email: '',
            name: '',
            password: '',
            confirm_password: ''
        }
    });

    const [state, setState] = useState<IncomingState>({
        error: null,
        message: null
    })

    const [message, setMessage] = useState({
        student_error: '',
        email_error: ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const [buttonText, setButtonText] = useState("Verify account")

    useEffect(() => {
        if (state.error == 'Student error') {
            setMessage(prev => ({
                ...prev,
                student_error: 'Either registration number or email is already taken.'
            }))
        } else if (state.error == 'Email error') {
            setMessage(prev => ({
                ...prev,
                email_error: 'Please provide a correct email.'
            }))
        }
    }, [state])

    

    const onSubmit = async (data: FormValues) => {
        try {
            setIsLoading(true)
            setButtonText('Loading...')

            const newState = await createStudent(state, data);
            setState(newState)

            if (newState.error == 'Email error') {
                setState({
                    error: 'Email error',
                    message: 'Please provide a correct email.'
                })
            }
            if (newState.message == 'Success') {
                alert('We have sent an verification email. Please active your account using that link.')
            }
        } catch (error) {
            setState({
                error: 'Student error',
                message: 'Either registration number or email is already taken.'
            })
        } finally {
            setIsLoading(false)
            setButtonText('Verify account')
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-[#08090F]">
                <div className="w-full max-w-md p-4 rounded-md shadow-md bg-[#08090F]">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                        Sign up to <span className="text-purple-500">Comic-Wave</span>
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="registration" className="block text-gray-400 mb-2 text-sm sm:text-base">
                                Registration number
                            </label>
                            <Controller
                                name="registration_number"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <div className="flex items-center p-2 border border-slate-600 rounded-md bg-[#08090F]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                            <input
                                                type="text"
                                                id="registration_number"
                                                placeholder="Enter your registration number"
                                                className="bg-[#08090F] ml-2 text-white flex-1 outline-none text-sm sm:text-base"
                                                {...field}
                                            />
                                            
                                        </div>
                                        {errors.registration_number &&
                                        <div className="flex gap-2 items-center mt-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                            </svg>
                                            <p className="text-red-600 text-sm">{errors.registration_number.message}</p>
                                        </div>
                                        }
                                    </>
                                )}
                            />
                            {message.student_error &&
                                <div className="flex gap-2 items-center mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                    </svg>
                                    <p className="text-red-600 text-sm">{message.student_error}</p>
                                </div>
                            }
                            
                            
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-400 mb-2 text-sm sm:text-base">
                                Email
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <div className="flex items-center p-2 border border-slate-600 rounded-md bg-[#08090F]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                                        </svg>
                                            <input
                                                type="text"
                                                id="email"
                                                placeholder="Enter your email"
                                                className="bg-[#08090F] ml-2 text-white flex-1 outline-none text-sm sm:text-base"
                                                {...field}
                                            />
                                            
                                        </div>
                                        {errors.email &&
                                        <div className="flex gap-2 items-center mt-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                            </svg>
                                            <p className="text-red-600 text-sm">{errors.email.message}</p>
                                        </div>
                                        }
                                    </>
                                )}
                            />
                            {message.email_error &&
                                <div className="flex gap-2 items-center mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                    </svg>
                                    <p className="text-red-600 text-sm">{message.email_error}</p>
                                </div>
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-400 mb-2 text-sm sm:text-base">
                                Name
                            </label>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <div className="flex items-center p-2 border border-slate-600 rounded-md bg-[#08090F]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                        </svg>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Enter your name"
                                                className="bg-[#08090F] ml-2 text-white flex-1 outline-none text-sm sm:text-base"
                                                {...field}
                                            />
                                            
                                        </div>
                                        {errors.name &&
                                        <div className="flex gap-2 items-center mt-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                            </svg>
                                            <p className="text-red-600 text-sm">{errors.name.message}</p>
                                        </div>
                                        }
                                    </>
                                )}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-400 mb-2 text-sm sm:text-base">
                                Password
                            </label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <div className="flex items-center p-2 border border-slate-600 rounded-md bg-[#08090F]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                                            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                                        </svg>
                                            <input
                                                type="password"
                                                id="password"
                                                placeholder="Enter your password"
                                                className="bg-[#08090F] ml-2 text-white flex-1 outline-none text-sm sm:text-base"
                                                {...field}
                                            />
                                            
                                        </div>
                                        {errors.password &&
                                        <div className="flex gap-2 items-center mt-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                            </svg>
                                            <p className="text-red-600 text-sm">{errors.password.message}</p>
                                        </div>
                                        }
                                    </>
                                )}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirm-password" className="block text-gray-400 mb-2 text-sm sm:text-base">
                                Confirm password
                            </label>
                            <Controller
                                name="confirm_password"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <div className="flex items-center p-2 border border-slate-600 rounded-md bg-[#08090F]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                                        </svg>
                                            <input
                                                type="password"
                                                id="confirm_password"
                                                placeholder="Confirm your password"
                                                className="bg-[#08090F] ml-2 text-white flex-1 outline-none text-sm sm:text-base"
                                                {...field}
                                                
                                            />
                                            
                                        </div>
                                        {errors.confirm_password &&
                                        <div className="flex gap-2 items-center mt-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                            </svg>
                                            <p className="text-red-600 text-sm">{errors.confirm_password.message}</p>
                                        </div>
                                        }
                                    </>
                                )}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-500 text-white font-bold py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center text-sm sm:text-base"
                            disabled={isLoading}
                        >
                            {buttonText}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-400 text-sm sm:text-base">
                        Already have an account?{" "}
                        <Link href="/login" className="text-purple-500 hover:text-purple-600 font-medium">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
