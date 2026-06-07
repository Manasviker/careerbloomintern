import React, { useRef, useState } from 'react'
import logo from "../Assets/logo.png"
import Link from 'next/link';
import { auth, provider } from "../firebase/firebase";
import { ChevronDown, ChevronUp, Divide } from 'lucide-react';
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

//     const handlelogin = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider);

//     const email = result.user.email;

//     const res = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/login-history/track-login`,
//       {
//         email: email,
//         otpVerified: false,
//       }
//     );

//     toast.success("Logged in successfully.");
//   } catch (error: any) {
//     console.error(error);

//     if (error.response?.data?.otpRequired) {
//       toast.error("OTP verification required for Chrome login.");
//     } else {
//       toast.error(error.response?.data?.message || "Login Failed");
//     }
//   }
// };
//  } catch (trackError: any) {
//       console.error(trackError);

//       if (trackError.response?.data?.otpRequired) {
//         toast.warning("Login successful. Chrome OTP verification is required.");
//       } else {
//         toast.warning("Login successful, but login history was not saved.");
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Google Login Failed");
//   }
// };
//     const handlelogin = async () => {
//         try {
//         const result=await signInWithPopup(auth, provider)
//         console.log(result.user);
//         toast.success("Logged in successfully.")

//     } catch (error) {
//         console.error(error)
//         toast.error("Login Failed");
//     }
// }
// const handleLanguageChange = (e:any) => {
//     const selectedLanguage = e.target.value;
 
//     i18n.changeLanguage(selectedLanguage);
//  };
// const handleLanguageChange = async (e:any) => {

//     const selectedLanguage = e.target.value;
 
//     if(selectedLanguage === "fr"){
 
//        alert("OTP verification required for French language");
 
//     }else{
 
//        i18n.changeLanguage(selectedLanguage);
 
//     }
//  };
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
    <nav>
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
                                <p className="px-4 py-2 text-sm text-gray-500">{user.email}</p>
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

  <p className="text-xs text-gray-500 mt-1">
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
    </nav>

);
};

export default Navbar
