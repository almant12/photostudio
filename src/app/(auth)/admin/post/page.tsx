'use client'
import { useState ,useEffect} from "react";

export default function PostIndex() {


    const [posts,setPost] = useState([]);

    const fetchPosts = async()=>{
        try{
            const response = await fetch('/api/post/auth-post',{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                  },
            });
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchPosts()
    },[])

    return (
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white border border-gray-200 rounded-md shadow-md">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-4 px-4 text-left font-semibold">Id</th>
                <th className="py-4 px-4 text-left font-semibold">Image</th>
                <th className="py-4 px-4 text-left font-semibold">Name</th>
                <th className="py-4 px-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="py-4 px-4">1</td>
                <td className="py-4 px-4">
                  <img src="/example-image.jpg" alt="Car Name" className="w-24 rounded-md shadow-sm" />
                </td>
                <td className="py-4 px-4">Car Name</td>
                <td className="py-4 px-4 flex space-x-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  