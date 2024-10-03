import AdminNavbar from "components/navBar/AdminNavbar";
import Sidebar from "components/sidebar/AdminSidebar";
import "../globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <AdminNavbar />
          <main className="flex-grow flex">
            <Sidebar />
            <div className="ml-64 p-4">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
