import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <aside id="default-sidebar" className="fixed mt-14 top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
          <Link href={'/admin/dashboard'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 1 0 8 8A8 8 0 0 0 10 2zM10 15a5 5 0 1 1 5-5 5 5 0 0 1-5 5z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
            </Link>

          <Link href={'/admin/post'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 1 0 8 8A8 8 0 0 0 10 2zM10 15a5 5 0 1 1 5-5 5 5 0 0 1-5 5z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Post</span>
            </Link>

            <Link href={'/admin/post/create'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 1 0 8 8A8 8 0 0 0 10 2zM10 15a5 5 0 1 1 5-5 5 5 0 0 1-5 5z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Create Post</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
