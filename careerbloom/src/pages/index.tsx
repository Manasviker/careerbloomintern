import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowUpRight, Banknote, Calendar, Divide, MapPin } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function SvgSlider() {

  const categories = [
    "Work From Home",
    "Part-Time",
    "MCA",
    "Engineering",
    "Design",
    "Data Science"
  ];

  // const internships = [
  //   {
  //     _id: "1",
  //     title: "Software Engineering Intern",
  //     company: "TCS",
  //     location: "Remote",
  //     stipend: "15,000Rs/Month",
  //     duration: "3 Months",
  //     category: "Engineering"
  //   },
  //   {
  //     _id: "2",
  //     title: "UI Designer Intern",
  //     company: "Wipro",
  //     location: "Pune",
  //     stipend: "18,000Rs/Month",
  //     duration: "3 Months",
  //     category: "Design"
  //   },
  //   {
  //     _id: "3",
  //     title: "Data Science Intern",
  //     company: "Deloitte",
  //     location: "Pune",
  //     stipend: "20,000Rs/Month",
  //     duration: "6 Months",
  //     category: "Data Science"
  //   },
  // ];

  // const jobs = [
  //   {
  //     _id: "101",
  //     title: "Full Stack Developer",
  //     company: "Google",
  //     location: "Mumbai",
  //     CTC: "6 Lakh/year",
  //     Experience: "2+ Years",
  //     category: "Engineering"
  //   },
  //   {
  //     _id: "102",
  //     title: "Data Analyst",
  //     company: "IBM",
  //     location: "Pune",
  //     CTC: "3.5 Lakh/year",
  //     Experience: "1+ Years",
  //     category: "Data Science"
  //   },
  // ];

  const slides = [
    {
      title: "Start Your Career Journey",
      bgcolor: "bg-indigo-600"
    },
    {
      title: "Learn From the Best",
      bgcolor: "bg-blue-600"
    },
    {
      title: "Grow Your Skills",
      bgcolor: "bg-pink-600"
    },
    {
      title: "Connect with Top Companies",
      bgcolor: "bg-teal-600"
    },
  ];
  const stats=[
    {number: "200k+",label:"companies hirinng"},
    {number: "10k+",label:"new opportunities everyday"},
    {number: "10M+",label:"Active Students"},
    {number: "800k+",label:"Learners"},
  ]

  const [internships, setinternship] = useState<any>([]);
  const [jobs, setjob] = useState<any>([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const [internshipres, jobres] = await Promise.all([
          axios.get("https://careerbloomintern.onrender.com/api/internship"),
          axios.get("https://careerbloomintern.onrender.com/api/job"),
        ]);
        setinternship(internshipres.data);
        setjob(jobres.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredInternships = internships.filter(
    (item:any) =>
      !selectedCategory || item.category === selectedCategory
  );

  const filteredJobs = jobs.filter(
    (item:any) =>
      !selectedCategory || item.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Make your dream career in reality
        </h1>

        <p className="text-xl text-gray-600">
          Trending on CareerBloom
        </p>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-2xl overflow-hidden mb-12"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`${slide.bgcolor} h-[350px] flex flex-col justify-center items-center text-white rounded-2xl`}
            >
              <h1 className="text-4xl font-bold mb-4">
                {slide.title}
              </h1>

              <p className="text-lg">
                Find internships & jobs from top companies
              </p>

              <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
                Explore Now
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">

        <button
          onClick={() => setSelectedCategory("")}
          className="px-4 py-2 rounded-full bg-gray-200 hover:bg-indigo-500 hover:text-white"
        >
          All
        </button>

        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className="px-4 py-2 rounded-full bg-gray-200 hover:bg-indigo-500 hover:text-white"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mb-12">

        <h2 className="text-3xl font-bold text-center mb-8">
          Latest internships on Career Bloom
        </h2>
        <div className="flex flex-wrap gap-4">
          <span className="text-grey-700 font-medium">Popular Categories</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-grey-100 text-gray-700 hover:bg-gray-200"
                }`
              }>
              {category}
            </button>
          ))}
        </div>
      </div><br></br>
      <h2 className="text-3xl font-bold text-center mb-8">
        Latest Internships
      </h2>
      {/* internship grid*/}
      <div className="grid md:grid-cols-3 gap-8">

        {filteredInternships.map((internship:any, index:any) => (

          <div
            key={index}
            className="border rounded-2xl p-8 shadow-lg bg-white min-h-[350px]"
          >

            {/* Hiring */}
            <div className="flex items-center gap-2 text-green-600 mb-3">
              <ArrowUpRight className="w-4 h-4" />
              <span>Actively Hiring</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2">
              {internship.title}
            </h3>

            {/* Company */}
            <p className="text-gray-600 mb-4">
              {internship.company}
            </p>

            {/* Details */}
            <div className="space-y-3">

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{internship.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4" />
                <span>{internship.stipend}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{internship.duration}</span>
              </div>

            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between mt-5">

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                Internship
              </span>

              <Link
                href={`/detailinternship/${internship._id}`}
                className="text-indigo-600 font-medium hover:underline"
              >
                View details
              </Link>
            </div>

          </div>

        ))}

      </div>

      {/* Job grid*/}
      <h2 className="text-3xl font-bold text-center mt-16 mb-8">
        Latest Jobs
      </h2>
      <div className="grid md:grid-cols-3 gap-8">

        {filteredJobs.map((job:any, index:any) => (

          <div
            key={index}
            className="border rounded-2xl p-8 shadow-lg bg-white min-h-[350px]"
          >

            {/* Hiring */}
            <div className="flex items-center gap-2 text-green-600 mb-3">
              <ArrowUpRight className="w-4 h-4" />
              <span>Actively Hiring</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2">
              {job.title}
            </h3>

            {/* Company */}
            <p className="text-gray-600 mb-4">
              {job.company}
            </p>

            {/* Details */}
            <div className="space-y-3">

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4" />
                <span>{job.CTC}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{job.Experience}</span>
              </div>

            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between mt-5">

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                Job
              </span>

              <Link
                href={`/detailinternship/${job._id}`}
                className="text-indigo-600 font-medium hover:underline"
              >
                View details
              </Link>

            </div>

          </div>

        ))}

      </div>
      {/*Stats Section*/}

      <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index)=>
          <div key={index} className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {stat.number}
            </div>
            <div className="text-gery-600">{stat.label}</div>
          </div> )}

        </div>

      </div>
    </div>
      

  
  );
}

/*import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return null
}
*/
