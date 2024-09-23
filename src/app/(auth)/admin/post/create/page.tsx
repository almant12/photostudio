export default function CreatePost(){

    return (
        <div className="container mx-auto p-4">
          <h1 className="font-bold text-3xl text-white text-center">Create Car</h1>
          <form>
            <div className="mb-6">
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
                placeholder="Upload Image"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
                placeholder="BMW"
              />
            </div>
      
            <div className="mb-6">
              <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
                placeholder="X5"
              />
            </div>
      
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
                  placeholder="2020"
                />
              </div>
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
                  placeholder="50,000$"
                />
              </div>
            </div>
      
            <div className="mb-6">
              <label htmlFor="engine_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Engine Type
              </label>
              <select id="engine_type" name="engine_type" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5">
                <option value="">Select Engine Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
      
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      );
      
}