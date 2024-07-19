import Link from "next/link";
import Image from "next/image";

export default function Login_Sign_In() {
    return (

<p className="text-gray-400 mt-4 text-center border p-8 border-l-transparent border-r-transparent">
Don’t have an account?{" "}
<Link href="/signup" className="text-purple-500 hover:underline">
  Sign Up
</Link>
</p>
    
  
  )}