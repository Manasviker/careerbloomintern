import { ArrowUpRight, Calendar, Clock,  Filter, Pin, PlayCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
// const internshipData = [
//     {
//       _id: "1",
//       title: "Software Engineering Intern",
//       company: "TCS",
//       StartDate:"April 2026",
//       Duration:"3 Months",
//       location: "Remote",
//       stipend: "15,000Rs/Month",
//       duration: "3 Months",
//       category: "Engineering"
//     },
//     {
//       _id: "2",
//       title: "UI Designer Intern",
//       company: "Wipro",
//       StartDate:"May 2026",
//       Duration:"3 Months",
//       location: "Pune",
//       stipend: "18,000Rs/Month",
//       duration: "3 Months",
//       category: "Design"
//     },
//     {
//       _id: "3",
//       title: "Data Science Intern",
//       company: "Deloitte",
//       StartDate:"May 2026",
//       Duration:"6 Months",
//       location: "Pune",
//       stipend: "20,000Rs/Month",
//       duration: "6 Months",
//       category: "Data Science"
//     },
//   ];
const index = () => {
    const [filteredInternships, setfilteredInterships]=useState<any>([]);
    const [isFiltervisible, setFiltervisible]=useState(false);
    const [filter, setfilters]=useState({
        category:"",
        location:"",
        workFromHome:false,
        partTime:false,
        stipend:50,
    });
 
    const [internshipData,setinternship]=useState<any>([])
    useEffect(() => {
        const fetchdata = async () => {
          try {
            const res = await axios.get("https://careerbloomintern.onrender.com/api/internship");
                
            setinternship(res.data)
            setfilteredInterships(res.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchdata();
      }, []);

    useEffect(() => {
        const filtered =internshipData.filter((internship:any)=>{
            const matchesCategory=internship.category
            .toLowerCase()
            .includes(filter.category.toLowerCase());
            const matchesLocation=internship.location
            .toLowerCase()
            .includes(filter.location.toLowerCase());
            return matchesCategory && matchesLocation;
        });
        setfilteredInterships(filtered);
    },[filter,internshipData]);
    const handlefilterchange=(e:any)=>{
        const {name,value,type,checked}=e.target;
        setfilters((prev)=>({ 
            ...prev,
            [name]:type==="checkbox"? checked:value
        }));
    }

    const clearFilters=()=>{
        setfilters({
            category:"",
            location:"",
            workFromHome:false,
            partTime:false,
            stipend:50,
        });
    };
  return( 
    <div className='min-h-screen bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <div className='flex flex-col md:flex-row gap-8'>
                {/*Filter*/}
                <div className='hidden md:block w-64 bg-white rounded-lg shadow-sm p-6 h-fit'>
                    <div className='flex items-center justify-between mb-6'>
                        <div className='flex items-center space-x-2'>
                            <Filter className='h-5 w-5 text-blue-600'/>
                            <span className='font-medium text-black'>Filters</span>
                        </div>
                        <button onClick={clearFilters}
                            className='text-sm text-blue-600 hover:text-blue-700'>
                            Clear All
                        </button>
                    </div>
                    <div className='space-y-6'>
                        {/* Category*/}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Category 
                            </label>
                            <input 
                            type="text"
                            name='category'
                            value={filter.category}
                            onChange={handlefilterchange}
                            className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700'
                            placeholder='e.g. Web development Intern'
                             />
                        </div>
                        {/*Location*/}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Location 
                            </label>
                            <input 
                            type="text"
                            name='location'
                            value={filter.location}
                            onChange={handlefilterchange}
                            className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700'
                            placeholder='e.g. Pune'
                             />
                        </div>

                        {/* Chechboxes */}
                        <div className='space-y-3'>
                            <label className='flex items-center space-x-2'>
                            
                            <input 
                            type="text"
                            name='workFromHome'
                            checked={filter.workFromHome}
                            onChange={handlefilterchange}
                            className='h-4 w-4 text-blue-600 rounded'
                             />
                            <span className='text-gray-700'>Work From Home</span>
                            </label>
                            <label className='flex items-center space-x-2'>
                            
                            <input 
                            type="text"
                            name='partTime'
                            checked={filter.partTime}
                            onChange={handlefilterchange}
                            className='h-4 w-4 text-blue-600 rounded'
                             />
                            <span className='text-gray-700'>Part Time</span>
                            </label>
                        </div>

                        {/* Stipend */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Monthly Stipend (Rs.)
                            </label>
                            <input 
                            type="range" 
                            name="stipend" 
                            min="0"
                            max="100"
                            value={filter.stipend}
                            onChange={handlefilterchange}
                            className='w-full' 
                            />
                            <div className='flex justify-between text-sm text-gray-700'>
                                <span>Rs.0</span>
                                <span>Rs.50K</span>
                                <span>Rs.100K</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-1'>
                    <div className='md:hidden mb-4'>
                        <button
                        onClick={()=> setFiltervisible(!isFiltervisible)}
                        className='w-full flex items-center justify-center space-x-2 bg-white p-3-rounded-lg shadow-sm text-black'>
                        <Filter className='h-5 w-5'/>
                        <span> Show Filters</span>
                        </button>
                    </div>
                    <div className='bg-white p-4 rounded-lg shadow-am mb-4 '>
                        <p className='text-center font-medium text-black'>
                            {filteredInternships.length} Interships found
                        </p>
                    </div>
                    <div className='space-y-6'> 
                        {filteredInternships.map((internship:any)=>(
                           <div key={internship._id}>
                            <div className= "bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition mb-6">
                            <div className="flex items-center gap-2 text-blue-600 mb-4">
                                <ArrowUpRight/>
                                <span>Actively Hiring</span>
                            </div>
                            <h2 className='text-x1 font-bold text-gray-900 mb-2'>
                                {internship.title}
                            </h2><p className='text-gray-600 mb-4'>{internship.company}</p>
                            
                            <div className='grid grid-cols-3 gap-4 mb-6'>
                                <div className='flex items-center space-x-2 text-gray-600'>
                                    <PlayCircle className="h-5 w-5"/>
                                    <div>
                                        <p className='text-sm font-medium'>Start Date</p>
                                        <p className='text-sm'>{internship.startDate}</p>
                                    </div>
                                </div>
                                <div className='flex items-center space-x-2 text-gray-600'>
                                    <Pin className="h-5 w-5"/>
                                    <div>
                                    <p className='text-sm font-medium'>Location</p>
                                    <p className='text-sm'>{internship.location}</p>
                                    </div>
                                </div>
                                <div className='flex items-center space-x-2 text-gray-600'>
                                <span className="text-green-600 font-bold text-lg">₹</span>
                                    <div>
                                    <p className='text-sm font-medium'>Stipend</p>
                                    <p className='text-sm'>{internship.stipend}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-2'>
                                <span className='px-3 py-1 bg-gray-600 rounded-full text-sm'>
                                    Internship
                                </span>
                                <div className='flex items-center space-x-1 text-green-600'>
                                    <Clock className='h-4 w-4'/>
                                    <span className='text-sm'> Posted Recently</span>
                                </div>
                            </div>
                            <Link 
                            href={`/detailinternship/${internship._id}`}
                            className='text-blue-600 hover:text-blue-700 font-medium'>
                                View Details
                            </Link>
                        </div>
                        </div>
                        </div>
                        ))}
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
};

export default index
