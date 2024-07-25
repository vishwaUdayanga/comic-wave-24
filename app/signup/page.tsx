import Link from "next/link";
import Image from "next/image";

export default function Signup() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-[#08090F]">
                <div className="w-full max-w-md p-4 rounded-md shadow-md bg-[#08090F]">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                        Sign up to <span className="text-purple-500">Comic-Wave</span>
                    </h1>
                    <form action="#" method="POST">
                        <div className="mb-4">
                            <label htmlFor="registration" className="block text-gray-400 mb-2 text-sm sm:text-base">
                                Registration number
                            </label>
                            <div className="flex items-center p-2 border rounded-md bg-[#08090F]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 2a6 6 0 100 12A6 6 0 0010 2zM4 16.667V18h12v-1.333a8 8 0 10-12 0z" />
                                </svg>
                                <input
                                    type="text"
                                    id="registration"
                                    name="registration"
                                    placeholder="Enter your student registration number"
                                    className="bg-[#08090F] ml-2 text-white flex-1 outline-none text-sm sm:text-base"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-400 mb-2 text-sm sm:text-base">
                                Email
                            </label>
                            <div className="flex items-center p-2 border rounded-md bg-[#08090F]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.94 6.84a.75.75 0 01.11-1.05l7.5-6a.75.75 0 01.92 0l7.5 6a.75.75 0 11-.92 1.16L10 1.68 3.84 6.84a.75.75 0 01-1.05-.1zM4 8a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V9a1 1 0 00-1-1H4zm2.75 6.25a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5h1.5zm3 0a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5h1.5zm3 0a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5h1.5zm1.25-7.75a.75.75 0 00-.75-.75h-8.5a.75.75 0 000 1.5h8.5a.75.75 0 00.75-.75z" />
                                </svg>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="bg-[#08090F] ml-2 text-white flex-1 outline-none text-sm sm:text-base"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-400 mb-2 text-sm sm:text-base">
                                Name
                            </label>
                            <div className="flex items-center p-2 border rounded-md bg-[#08090F]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 2a6 6 0 100 12A6 6 0 0010 2zM4 16.667V18h12v-1.333a8 8 0 10-12 0z" />
                                </svg>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="bg-[#08090F] ml-2 text-white flex-1 outline-none text-sm sm:text-base"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-400 mb-2 text-sm sm:text-base">
                                Password
                            </label>
                            <div className="flex items-center p-2 border rounded-md bg-[#08090F]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 2a6 6 0 00-6 6v4H3a1 1 0 00-1 1v5a1 1 0 001 1h14a1 1 0 001-1v-5a1 1 0 00-1-1h-1V8a6 6 0 00-6-6zM8 8V6a2 2 0 114 0v2H8zm4 0h-4v2h4V8zm-7 6v3h10v-3H5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    className="bg-[#08090F] ml-2 text-white flex-1 outline-none text-sm sm:text-base"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirm-password" className="block text-gray-400 mb-2 text-sm sm:text-base">
                                Confirm password
                            </label>
                            <div className="flex items-center p-2 border rounded-md bg-[#08090F]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 2a6 6 0 00-6 6v4H3a1 1 0 00-1 1v5a1 1 0 001 1h14a1 1 0 001-1v-5a1 1 0 00-1-1h-1V8a6 6 0 00-6-6zM8 8V6a2 2 0 114 0v2H8zm4 0h-4v2h4V8zm-7 6v3h10v-3H5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    name="confirm-password"
                                    placeholder="Confirm your password"
                                    className="bg-[#08090F] ml-2 text-white flex-1 outline-none text-sm sm:text-base"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-500 text-white font-bold py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center text-sm sm:text-base"
                        >
                            Verify account
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
