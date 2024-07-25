export default function Signup() {
    return ( 
     <div main>
       <h1 className="font-extrabold">Sign up to <span className="text-purple-500">Comic-Wave</span></h1>
       <form> 
         <label> 
           <p>Registration Number</p>
           <input 
             type="text" 
             placeholder="Enter your Student Registration Number" 
             className="w-full h-100% bg-transparent border border-white rounded-lg"
           />
         </label>
         <label> 
           <p>Email</p>
           <input 
             type="email" 
             placeholder="Enter your Email" 
             className="w-full h-100% bg-transparent border border-white rounded-lg"
           />
         </label>
         <label> 
           <p>Password</p>
           <input 
             type="password" 
             placeholder="Enter your Password" 
             className="w-full h-100% bg-transparent border border-white rounded-lg"
           />
         </label>
         <label> 
           <p>Confirm password</p>
           <input 
             type="password" 
             placeholder="Confirm your password" 
             className="w-full h-100% bg-transparent border border-white rounded-lg"
           />
         </label> 
         <button type="submit" className="block">Verify Account -></button>
       </form>
 
       <div login-transfer>
         <p>Already have an account? <a href ="#"> Log in</a> </p>
       </div>
     </div>
    )
 }
 