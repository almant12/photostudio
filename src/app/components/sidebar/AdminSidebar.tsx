import React from 'react';
import Link from 'next/link';

const AdminSidebar: React.FC = () => {
    return (
      <aside className="bg-gray-800 text-white w-64 min-h-screen p-4 fixed left-0">
        <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
        <ul>
          <li>
            <Link href="/admin/dashboard" className="block py-2 hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/users" className="block py-2 hover:bg-gray-700">
              Manage Users
            </Link>
          </li>
          <li>
            <Link href="/admin/settings" className="block py-2 hover:bg-gray-700">
              Settings
            </Link>
          </li>
        </ul>
      </aside>
    );
  };
  

export default AdminSidebar;
