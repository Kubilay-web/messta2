import type { Metadata } from "next";
import LatestBlogs from "./components/LatestBlogs";
import SidePanel from "./components/SidePenal";
import Footer from "./components/Footer";

export const metadata: Metadata = { 
  title: "Blogs | Social Platform",
  description: "Explore the latest blog posts and articles on our platform."
};

const Blogs = () => {
  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <LatestBlogs />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-6 space-y-6">
                <SidePanel />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Blogs;