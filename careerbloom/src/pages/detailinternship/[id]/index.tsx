import { selectuser } from '@/Feature/Userslice';
import axios from 'axios';
import { ArrowUpRight, Calendar, Clock, ExternalLink, IndianRupee, MapPin, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// const internships = [
//   {
//     _id: "1",
//     title: "Frontend Developer Intern",
//     company: "TechCorp",
//     startDate: "April 2026",
//     duration: "3 Months",
//     location: "Mumbai",
//     stipend: "Rs.5000/month",
//     category: "Internship",
//     hiring: "Actively Hiring",
//     posted: "Posted recently",
//     workFromHome: false,
//     partTime: false,

//     aboutCompany:
//       "TechCorp is a growing software company focused on building modern web and mobile applications for startups and enterprises.",

//     aboutJob:
//       "We are looking for a Frontend Developer Intern who can build responsive user interfaces using React.js and Tailwind CSS.",

//     whoCanApply: [
//       "Students available for full-time internship",
//       "Candidates with basic knowledge of React.js",
//       "Candidates familiar with HTML, CSS, and JavaScript",
//       "Candidates available for 3 months",
//     ],

//     perks: [
//       "Certificate",
//       "Flexible working hours",
//       "Letter of recommendation",
//       "Job offer",
//     ],

//     additionalInfo:
//       "Interns will work directly with senior developers on real-world projects.",

//       numberOfopening: 4,
//   },

//   {
//     _id: "2",
//     title: "Data Science Intern",
//     company: "DataTech",
//     startDate: "May 2026",
//     duration: "6 Months",
//     location: "Bangalore",
//     stipend: "Rs.8000/month",
//     category: "Internship",
//     hiring: "Actively Hiring",
//     posted: "Posted recently",
//     workFromHome: true,
//     partTime: false,

//     aboutCompany:
//       "DataTech provides AI and analytics solutions for businesses worldwide.",

//     aboutJob:
//       "Selected interns will work on data cleaning, visualization, and machine learning models.",

//     whoCanApply: [
//       "Students pursuing Computer Science or Data Analytics",
//       "Candidates with Python knowledge",
//       "Candidates familiar with Pandas and NumPy",
//       "Available for 6 months",
//     ],

//     perks: [
//       "Certificate",
//       "Work from home",
//       "5 days working",
//       "Pre-placement offer",
//     ],

//     additionalInfo:
//       "Experience with machine learning libraries will be an added advantage.",

//       numberOfopening: 3,
//   },

//   {
//     _id: "3",
//     title: "Marketing Intern",
//     company: "MarketPro",
//     startDate: "June 2026",
//     duration: "2 Months",
//     location: "Pune",
//     stipend: "Rs.8000/month",
//     category: "Internship",
//     hiring: "Actively Hiring",
//     posted: "Posted recently",
//     workFromHome: false,
//     partTime: true,

//     aboutCompany:
//       "MarketPro is a digital marketing agency helping brands grow online.",

//     aboutJob:
//       "Interns will assist in social media campaigns, SEO activities, and content marketing.",

//     whoCanApply: [
//       "Candidates interested in digital marketing",
//       "Good communication skills required",
//       "Knowledge of Instagram and LinkedIn marketing",
//     ],

//     perks: [
//       "Certificate",
//       "Informal dress code",
//       "Flexible work hours",
//     ],

//     additionalInfo:
//       "Candidates with Canva or basic design skills will be preferred.",

//     numberOfopening: 5,
//   },

//   {
//     _id: "4",
//     title: "UI/UX Designer Intern",
//     company: "Creative Minds",
//     startDate: "July 2026",
//     duration: "4 Months",
//     location: "Remote",
//     stipend: "Rs.10000/month",
//     category: "Internship",
//     hiring: "Actively Hiring",
//     posted: "1 week ago",
//     workFromHome: true,
//     partTime: false,

//     aboutCompany:
//       "Creative Minds designs modern digital experiences for web and mobile products.",

//     aboutJob:
//       "The intern will create wireframes, prototypes, and user-friendly UI designs.",

//     whoCanApply: [
//       "Candidates familiar with Figma or Adobe XD",
//       "Creative thinking skills",
//       "Available for remote internship",
//     ],

//     perks: [
//       "Certificate",
//       "Work from home",
//       "Flexible hours",
//     ],

//     additionalInfo:
//       "Portfolio submission is preferred during application.",

//       numberOfopening: 2,
//   },

//   {
//     _id: "5",
//     title: "Backend Developer Intern",
//     company: "CodeBase",
//     startDate: "June 2026",
//     duration: "5 Months",
//     location: "Hyderabad",
//     stipend: "Rs.7000/month",
//     category: "Internship",
//     hiring: "Actively Hiring",
//     posted: "2 days ago",
//     workFromHome: false,
//     partTime: false,

//     aboutCompany:
//       "CodeBase develops scalable backend systems and APIs for SaaS products.",

//     aboutJob:
//       "Interns will build REST APIs using Node.js, Express, and MongoDB.",

//     whoCanApply: [
//       "Candidates with Node.js knowledge",
//       "Understanding of MongoDB",
//       "Basic API development knowledge",
//     ],

//     perks: [
//       "Certificate",
//       "Job offer",
//       "Free snacks",
//     ],

//     additionalInfo:
//       "Candidates should know Git and GitHub basics.",

//       numberOfopening: 3,
//   },

// ];
const index = () => {
  const router = useRouter()
  const { id } = router.query;

  const [internshipData,setinternship]=useState<any>([])
  console.log(id)
  useEffect(() => {
      const fetchdata = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/internship/${id}`);
              
          setinternship(res.data)
        } catch (error) {
          console.log(error);
        }
      };
      fetchdata();
    }, [id]);

  
  const [availability, setAvailability]= useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const user=useSelector(selectuser)
  if (!internshipData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handlesubmitapplication=async()=>{
    if(!coverLetter.trim()){
      toast.error("please write a cover letter")
      return
    }
    if(!availability){
      toast.error("please select your availability")
      return
    }
    try {
      const applicationdata={
        category:internshipData.category,
        company:internshipData.company,
        coverLetter:coverLetter,
        user:user,
        Application:id,
        availability
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/application`,applicationdata)
      toast.success("Application submit successfully")
      router.push('/internship')
    } catch (error) {
      console.error(error)
      toast.error("Failed to submit application")
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">

        {/* Header Section */}
        <div className="p-6 border-b">

          <div className="flex items-center space-x-2 text-blue-600 mb-4">
            <ArrowUpRight className="h-5 w-5" />
            <span className="font-medium">Actively Hiring</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {internshipData.title}
          </h1>

          <p className="text-lg text-gray-600 mb-4">
            {internshipData.company}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>{internshipData.location}</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <IndianRupee className="h-5 w-5" />
              <span>{internshipData.stipend}</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>{internshipData.startDate}</span>
            </div>
          </div>
          <div className='mt-4 flex items-center space-x-2'>
            <Clock className='h-4 w-4 text-green-500' />
            <span>Posted On: {internshipData.createdAt}</span>
          </div>
        </div>
        {/* Company Section */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            About {internshipData.company}
          </h2>

          <div className="flex items-center space-x-2 mb-4">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <span>Visit company website</span>
              <ExternalLink className='h-4 w-4' />
            </a>
          </div>
          <p className="text-gray-600">
            {internshipData.aboutCompany}
          </p>
        </div>

        {/* Internship Details Section */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            About the Internship
          </h2>

          <p className="text-gray-600 mb-6">
            {internshipData.aboutJob}
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Who can apply?
          </h3>

          <p className="text-gray-600 mb-6">
            {internshipData.whoCanApply}
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Perks
          </h3>

          <p className="text-gray-600 mb-6">
            {internshipData.perks}
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Additional Information
          </h3>

          <p className="text-gray-600 mb-6">
            {internshipData.additionalInfo}
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Number of Openings
          </h3>

          <p className="text-gray-600">
            {internshipData.numberOfOpening}
          </p>
        </div>
        {/*Apply button*/}
        <div className='p-6 flex justify-center'>
          <button 
          onClick={() => setIsModalOpen(true)}
          className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-150'>
            Apply Now
          </button>
        </div>
      </div>
      {isModalOpen&&(
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b'>
              <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold text-gray-900'>Apply to{internshipData.company}</h2>
                <button
                onClick={()=> setIsModalOpen(false)}
                className='text-gray-400 hover:text-gray-600'>
                  <X className='h-6 w-6'/>
                </button>
              </div>
            </div>
            <div className='p-6 space-y-6'>
              {/*Resume Section*/}

              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>Your Resume</h3>
                <p className='text-gray-600'>Your current resume will be submitted with the application</p>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Cover Letter</h3>
                <p className='text-gray-600'>
                  Why should you be selected for this internship
                </p>
                <textarea value={coverLetter} 
                onChange={(e)=>setCoverLetter(e.target.value)}
                placeholder='Write your cover letter here....'>
                </textarea>
              </div>
              <div>
                <h3>
                  Your Availability
                </h3>
                <div>
                  {["Yes I am available to join immediatly",
                    "No, I am currently on notice period",
                    "No, I will hav to serve notice period",
                    "other",
                  ].map((option)=>(
                    <label key={option} className='flex items-center space-x-2'>
                      <input type="radio" name='' id='' value={option} 
                      checked={availability === option} 
                      onChange={(e)=> setAvailability(e.target.value)}
                      className='h-4 w-4 text-blue-600'
                      />
                       <span className='text-gray-700'>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className='flex justify-end pt-4'>
                {user ?(<button className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700'
                onClick={handlesubmitapplication}>
                  Submit Application</button>
                  ):(<Link href={`/`} className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 '>
                    Sign up to apply</Link>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default index
