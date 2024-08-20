'use client'

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadFileSchema } from '@/app/lib/zod-schemas';
import { IncomingState } from "../../lib/actions";
import { string, z } from 'zod';
import Image from 'next/image';
import { useState, useEffect } from "react";
import { FieldError } from 'react-hook-form';
import { stat } from 'fs';

type FormValues = z.infer<typeof uploadFileSchema>;

export default function Premium() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(uploadFileSchema),
        mode: 'onTouched',
    });

    const [state, setState] = useState<IncomingState>({
        error: null,
        message: null
    })

    const [message, setMessage] = useState({
        file_error: '',
    })

    useEffect(() => {
        if (state.error == 'Upload error') {
            setMessage(prev => ({
                ...prev,
                file_error: 'You have already upload. Please visit the admin'
            }))
        }
    }, [state])

    const onSubmit = async (data: FormValues) => {
        if (!data.file) {
            return
        } 

        try {
            const formData = new FormData();
            formData.append('file', data.file[0]); // Append the file to FormData

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json()

            if (!result.auth) {
                alert('Please login')
                window.location.href = '/login'
            } else if (result.success) {
                alert('File uploaded successfully')
                window.location.href = '/'
            } else if(!result.status) {
                alert('You have already uploaded a file. Please visit the admin.')
            } else if (!response.ok) {
                setState({
                    error: 'Upload error',
                    message: 'Could not upload the file'
                })
            }
        } catch (error) {
            setState({
                error: 'Upload error',
                message: 'Could not upload the file'
            })
        }
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-[#08090F]">
                <div className="w-full max-w-md p-4 rounded-md shadow-md bg-[#08090F] flex flex-col items-center gap-5">
                    <h1 className="text-2xl w-full text-center sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                        Purchase your <span className="text-purple-500">Regular ticket</span>
                    </h1>
                    <Image 
                            src={'/ticket-types/premium.jpg'}
                            alt={'Ticket Types | Regular'}
                            width={390}
                            height={390}
                    />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="registration" className="block text-gray-400 mb-2 text-sm sm:text-base">
                                Upload your payment 
                            </label>
                            <Controller
                                name="file"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <div className="flex items-center p-2 border border-slate-600 rounded-md bg-[#08090F]">
                                            <input
                                                type="file"
                                                id="file"
                                                className="bg-[#08090F] ml-2 text-white flex-1 outline-none text-sm sm:text-base"
                                                onChange={(e) => field.onChange(e.target.files)}
                                                onBlur={field.onBlur}
                                                ref={field.ref}
                                            />
                                        </div>
                                        {errors.file &&
                                        <div className="flex gap-2 items-center mt-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                            </svg>
                                            <p className="text-red-600 text-sm">{(errors.file as FieldError)?.message || 'An error occurred'}</p>
                                        </div>
                                        }
                                    </>
                                )}
                            />
                            {message.file_error &&
                                <div className="flex gap-2 items-center mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                    </svg>
                                    <p className="text-red-600 text-sm">{message.file_error}</p>
                                </div>
                            }
                        </div>
                        <button
                            type="submit"
                            className="mt-5 w-full bg-purple-500 text-white font-bold py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center text-sm sm:text-base"
                        >
                            Upload your file
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}