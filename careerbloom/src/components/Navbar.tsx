// import React, { useState } from "react";
// import Link from "next/link";
// import { auth, provider } from "../firebase/firebase";
// import { signInWithPopup, signOut } from "firebase/auth";
// import { toast } from "react-toastify";
// import { selectuser } from "@/Feature/Userslice";
// import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
// import i18n from "@/i18n";
// import axios from "axios";
// import { Menu, X } from "lucide-react";

// const Navbar = () => {
//   const user = useSelector(selectuser);
//   const { t } = useTranslation();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handlelogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const email = result.user.email;

//       try {
//         await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/login-history/track-login`,
//           { email, otpVerified: true }
//         );
//         toast.success("Logged in successfully.");
//       } catch (trackError: any) {
//         if (trackError.response?.data?.otpRequired) {
//           toast.warning("Login successful. Chrome OTP verification is required.");
//         } else if (trackError.response?.status === 403) {
//           toast.warning(trackError.response?.data?.message);
//         } else {
//           toast.warning("Login successful, but login history was not saved.");
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Google Login Failed");
//     }
//   };

//   const handleLanguageChange = async (e: any) => {
//     const selectedLanguage = e.target.value;

//     if (selectedLanguage === "fr") {
//       if (!user?.email) {
//         toast.error("Please login first to enable French language");
//         return;
//       }

//       try {
//         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/otp/send-otp`, {
//           email: user.email,
//         });

//         const enteredOTP = prompt("Enter OTP sent to your email");

//         const verify = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/otp/verify-otp`,
//           { otp: enteredOTP }
//         );

//         if (verify.data.success) {
//           i18n.changeLanguage("fr");
//           toast.success("French language enabled");
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error("Invalid OTP");
//       }
//     } else {
//       i18n.changeLanguage(selectedLanguage);
//     }
//   };

//   const handlelogout = () => {
//     signOut(auth);
//   };

//   const menuLinks = (
//     <>
//       <Link href="/internship" className="text-gray-900 hover:text-blue-600">
//         {t("internships")}
//       </Link>

//       <Link href="/job" className="text-gray-900 hover:text-blue-600">
//         {t("jobs")}
//       </Link>

//       <Link href="/resume" className="text-gray-900 hover:text-blue-600">
//         Resume
//       </Link>

//       <Link href="/public-space" className="text-gray-900 hover:text-blue-600">
//         Public Space
//       </Link>

//       <Link href="/subscription" className="text-gray-900 hover:text-blue-600">
//         Plans
//       </Link>
//     </>
//   );

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center min-h-16">
//           <Link href="/">
//             <img src="/logo.png" alt="CareerBloom Logo" className="h-14 w-auto" />
//           </Link>

//           <div className="hidden md:flex items-center gap-6 font-medium">
//             {menuLinks}

//             <input
//               type="text"
//               placeholder="Search Opportunities..."
//               className="border rounded-md px-3 py-1 text-sm text-gray-900 outline-none"
//             />
//           </div>

//           <div className="hidden md:flex items-center gap-3">
//             <select
//               onChange={handleLanguageChange}
//               className="border rounded-md px-2 py-1 text-black bg-white"
//             >
//               <option value="en">English</option>
//               <option value="es">Spanish</option>
//               <option value="hi">Hindi</option>
//               <option value="pt">Portuguese</option>
//               <option value="zh">Chinese</option>
//               <option value="fr">French</option>
//             </select>

//             {user ? (
//               <div className="flex items-center gap-2">
//                 <Link href="/profile">
//                   {user.photo ? (
//                     <img src={user.photo} alt="profile" className="w-8 h-8 rounded-full" />
//                   ) : (
//                     <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
//                       {user.name?.[0]}
//                     </div>
//                   )}
//                 </Link>

//                 <button
//                   onClick={handlelogout}
//                   className="text-sm text-gray-900 hover:text-blue-600"
//                 >
//                   {t("logout")}
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={handlelogin}
//                 className="border border-blue-500 text-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-50"
//               >
//                 Continue with Google
//               </button>
//             )}
//           </div>

//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="md:hidden text-gray-900"
//           >
//             {mobileOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         {mobileOpen && (
//           <div className="md:hidden bg-white border-t py-4 flex flex-col gap-4 text-base font-medium">
//             {menuLinks}

//             <select
//               onChange={handleLanguageChange}
//               className="border rounded-md px-2 py-2 text-black bg-white"
//             >
//               <option value="en">English</option>
//               <option value="es">Spanish</option>
//               <option value="hi">Hindi</option>
//               <option value="pt">Portuguese</option>
//               <option value="zh">Chinese</option>
//               <option value="fr">French</option>
//             </select>

//             {user ? (
//               <>
//                 <Link href="/profile" className="text-gray-900">
//                   Profile
//                 </Link>
//                 <button
//                   onClick={handlelogout}
//                   className="text-left text-gray-900"
//                 >
//                   {t("logout")}
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={handlelogin}
//                 className="border border-blue-500 text-blue-500 px-3 py-2 rounded-md text-sm"
//               >
//                 Continue with Google
//               </button>
//             )}

//             <Link href="/adminlogin" className="text-gray-900">
//               Admin
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useRef, useState } from 'react'
import logo from "../Assets/logo.png"
import Link from 'next/link';
import { auth, provider } from "../firebase/firebase";
import { ChevronDown, ChevronUp, Divide, Menu, X } from 'lucide-react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { selectuser } from '@/Feature/Userslice';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import axios from 'axios';

interface User {
    name: string;
    email: string;
    photo?: string | null;
}

const Navbar = () => {
    // const [isprofiledropdown, setisprofiledropdown] = useState(false);
    // const [isstudent, setisstudent] = useState(true);
    // const [user, setuser] = useState<User | null>(null);
    // const dropdownref = useRef(null)
    const user=useSelector(selectuser)
    const { t } = useTranslation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handlelogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const email = result.user.email;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login-history/track-login`,
        {
          email: email,
          otpVerified: true,
        }
      );

      toast.success("Logged in successfully.");
    } catch (trackError: any) {
      console.error(trackError);

      if (trackError.response?.data?.otpRequired) {
        toast.warning("Login successful. Chrome OTP verification is required.");
      } else if (trackError.response?.status === 403) {
        toast.warning(trackError.response?.data?.message);
      } else {
        toast.warning("Login successful, but login history was not saved.");
      }
    }
  } catch (error) {
    console.error(error);
    toast.error("Google Login Failed");
  }
};


const handleLanguageChange = async (e:any) => {

    const selectedLanguage = e.target.value;
 
    if(selectedLanguage === "fr"){
 
       try{
 
          await axios.post(
             `${process.env.NEXT_PUBLIC_API_URL}/api/otp/send-otp`,
             {
                email: user.email
             }
          );
 
          const enteredOTP = prompt("Enter OTP sent to your email");
 
          const verify = await axios.post(
             `${process.env.NEXT_PUBLIC_API_URL}/api/otp/verify-otp`,
             {
                otp: enteredOTP
             }
          );
 
          if(verify.data.success){
 
             i18n.changeLanguage("fr");
 
             toast.success("French language enabled");
 
          }
 
       }catch(error){
 
          console.log(error);
 
          toast.error("Invalid OTP");
 
       }
 
    }else{
 
       i18n.changeLanguage(selectedLanguage);
 
    }
 };
    // setuser({
    //     name: "Manasvi",
    //     email: "manasvi@gmail.com",
    //     photo: null
    // })
    
const handlelogout = () => {
    signOut(auth)
    // setuser(null)
};
return (
    <nav className="relative">
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16 items-center'>
                <div className='flex-shrink-0'>
                    <a href="/" className='text-x1 font-bold text-blue-600'>
                        <img src={"/logo.png"} alt="" className='h-16' /> </a>
                </div>
                <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
                    <button >
                        <Link href="/internship" className="hover:text-blue-600">
                            {/* <span>Internships</span> */}
                            <span> {t("internships")}</span>
                        </Link>
                    </button>
                    <button className="hover:text-blue-600">
                        <Link href="/job" >
                            {/* <span>Jobs</span> */}
                            <span> {t("jobs")}</span>
                        </Link>
                    </button>
                    <button className="hover:text-blue-600">
  <Link href="/resume">
    <span>Resume</span>
  </Link>
</button>

                    {/* <button onClick={() => i18n.changeLanguage("hi")}>
  Hindi
</button> */}
<button className="hover:text-blue-600">
  <Link href="/public-space">
    <span>Public Space</span>
  </Link>
</button>
<Link href="/subscription">
  <span>Plans</span>
</Link>
                    <div className="hidden md:flex items-center border rounded-md px-2 py-1">
                        <search />
                        <input type="text" placeholder='Search Opportunities....'
                            className="outline-none text-sm px-2" />
                    </div>
                </div>
<button
  onClick={() => setMobileOpen(!mobileOpen)}
  className="md:hidden text-gray-900"
>
  {mobileOpen ? <X size={28} /> : <Menu size={28} />}
</button>
                <div className="flex items-center gap-3">
                <select
  onChange={handleLanguageChange}
  className="border rounded-md px-2 py-1 text-black"
>
  <option value="en">English</option>
  <option value="es">Spanish</option>
  <option value="hi">Hindi</option>
  <option value="pt">Portuguese</option>
  <option value="zh">Chinese</option>
  <option value="fr">French</option>
</select>
                    {user ? (<div className="relative"> 
                    {/* ref={dropdownref} */}
                        <button
                            // onClick={() => setisprofiledropdown(!isprofiledropdown)}
                            className="flex items-center gap-2">

                            {/* {user.name[0]} */}

                            <Link href="/profile" >
                                {user.photo ? (
                                    <img src={user.photo}
                                        alt="profile"
                                        className='w-8 h-8 rounded-full'
                                    />) : (
                                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                        {user.name[0]}
                                    </div>
                                )}
                            </Link>
                        </button>
                        <button onClick={handlelogout}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                            {/* logout */}
                            {t("logout")}
                        </button>
                        {/* {isprofiledropdown &&(
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md">
                                <p className="px-4 py-2 text-sm font-medium">{user.name}</p>
                                <p className="px-4 py-2 text-sm text-gray-900">{user.email}</p>
                            </div>
                        ) } */}
                    </div>) : (<>
                        {/* <button onClick={handlelogin}
                            className="border border-blue-500 text-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-50">
                            <span> Continue with Google</span>
                            
                        </button>
                        
                        {/* <button>
                            {" "}
                            <Link href="/" className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
                            Register</Link>  </button> */}
                        {/* <a href="/adminlogin" className="text-gray-700 text-sm hover:text-blue-600">Admin</a> */} 
                         <div className="flex flex-col items-center">
  <button
    onClick={handlelogin}
    className="border border-blue-500 text-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-50"
  >
    <span>Continue with Google</span>
  </button>

  <p className="text-xs text-gray-900 mt-1">
    Forgot password? Please reset it from your Google Account.
  </p>
</div>

<a href="/adminlogin" className="text-gray-700 text-sm hover:text-blue-600">
  Admin
</a>
                        </>
                    )}
                </div>
            </div>
        </div>
        {mobileOpen && (
  <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 text-gray-900">
    <Link href="/internship">Internships</Link>
    <Link href="/job">Jobs</Link>
    <Link href="/resume">Resume</Link>
    <Link href="/public-space">Public Space</Link>
    <Link href="/subscription">Plans</Link>
    <Link href="/adminlogin">Admin</Link>
  </div>
)}
    </nav>

);
};

export default Navbar
