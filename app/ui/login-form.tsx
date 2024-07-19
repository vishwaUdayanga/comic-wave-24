import Link from "next/link";
import Image from "next/image";

export default function Login_Form() {
    return (
        <div className="min-h-screen  flex items-center justify-center bg-#08090F">
      <div className="form-container w-600 p-8 rounded-md shadow-md bg-#08090F">
        <h1 className="text-3xl font-bold text-white mb-6">
          Log in to <span className="text-purple-500">Comic-Wave</span>
        </h1>
        <form action="#" method="POST">
          <div className="mb-4">
            <label htmlFor="registration" className="block text-gray-400 mb-2">
              Registration number
            </label>
            <div className="flex items-center p-2 border  rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 100 12A6 6 0 0010 2zM4 16.667V18h12v-1.333a8 8 0 10-12 0z" />
              </svg>
              <input
                type="text"
                id="registration"
                name="registration"
                placeholder="Enter your student registration number"
                className="bg-[#08090F] ml-2 text-white flex-1 outline-none"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-400 mb-2">
              Password
            </label>
            <div className="flex items-center p-2 border bg-#08090F rounded-md ">
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
                className="bg-[#08090F] ml-2 text-white flex-1 outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white font-bold py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            Log In
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 010-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>

      </div>
    </div>
    );
}
