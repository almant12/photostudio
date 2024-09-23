
export default function PostIndex(){


    return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">Car List</h1>
          <table className="min-w-full bg-gray-800 border text-white border-gray-200 rounded-md shadow-md">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-4 px-4 text-left text-white font-semibold">Id</th>
                <th className="py-4 px-4 text-left text-white font-semibold">Image</th>
                <th className="py-4 px-4 text-left text-white font-semibold">Name</th>
                <th className="py-4 px-4 text-left text-white font-semibold">Model</th>
                <th className="py-4 px-4 text-left text-white font-semibold">Year</th>
                <th className="py-4 px-4 text-left text-white font-semibold">Price</th>
                <th className="py-4 px-4 text-left text-white font-semibold">Engine Type</th>
                <th className="py-4 px-4 text-left text-white font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="py-4 px-4">1</td>
                <td className="py-4 px-4"><img src="/example-image.jpg" alt="Car Name" className="w-24" /></td>
                <td className="py-4 px-4">Car Name</td>
                <td className="py-4 px-4">Car Model</td>
                <td className="py-4 px-4">2023</td>
                <td className="py-4 px-4">$20,000</td>
                <td className="py-4 px-4">Petrol</td>
                <td className="py-4 px-4 flex space-x-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-4 px-4">2</td>
                <td className="py-4 px-4"><img src="/example-image2.jpg" alt="Car Name" className="w-24" /></td>
                <td className="py-4 px-4">Car Name 2</td>
                <td className="py-4 px-4">Car Model 2</td>
                <td className="py-4 px-4">2022</td>
                <td className="py-4 px-4">$25,000</td>
                <td className="py-4 px-4">Diesel</td>
                <td className="py-4 px-4 flex space-x-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm mb-10">
              <li>
                <button className="flex items-center justify-center px-3 h-8 text-gray-400 cursor-not-allowed bg-white border border-e-0 border-gray-300 rounded-s-lg">
                  Previous
                </button>
              </li>
              <li>
                <button className="flex items-center justify-center px-3 h-8 text-blue-600 bg-blue-50 border border-gray-300">
                  1
                </button>
              </li>
              <li>
                <button className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-e-lg">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      );
      
}