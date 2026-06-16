import LoadContentButton from "../../../../components/LoadContentButton";
import { getAllUsers } from "../../../../helpers/data";
import Image from "next/image";
import Link from "next/link";
import { BsPersonCheckFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

const RecentPost = () => {
  const posts = [
    { id: 51, title: "Ten questions you should answer truthfully", time: "2hr" },
    { id: 52, title: "Five unbelievable facts about money", time: "3hr" },
    { id: 53, title: "Best Pinterest Boards for learning about business", time: "4hr" },
    { id: 54, title: "Skills that you can learn from business", time: "6hr" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent post</h2>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {posts.map((post, idx) => (
          <div key={post.id} className={idx !== posts.length - 1 ? "pb-3 border-b border-gray-100" : ""}>
            <h6 className="font-medium text-gray-900 mb-1">
              <Link 
                href={`/blogs/${post.id}`} 
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
              >
                {post.title}
              </Link>
            </h6>
            <span className="text-xs text-gray-500">{post.time}</span>
          </div>
        ))}

        {/* View All Button */}
        <div className="pt-2">
          <LoadContentButton name="View all latest news" />
        </div>
      </div>
    </div>
  );
};

const Tags = () => {
  const tags = [
    "blog", "business", "theme", "social", "getbootstrap", 
    "design", "news", "magazine", "events"
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h5 className="text-lg font-semibold text-gray-900">Tags</h5>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <button
              key={idx}
              className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 rounded-full transition-colors duration-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Followers = async () => {
  const allFollowers = await getAllUsers();
  const followersToShow = allFollowers.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h5 className="text-lg font-semibold text-gray-900">Who to follow</h5>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {followersToShow.map((follower, idx) => (
          <div 
            key={idx} 
            className={`flex items-center ${idx !== followersToShow.length - 1 ? "pb-4 border-b border-gray-100" : ""}`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0 relative">
              <button className="focus:outline-none">
                <div className={`relative h-10 w-10 rounded-full ${follower.isStory ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}>
                  <Image
                    src={follower.avatar}
                    alt={follower.name}
                    fill
                    className="object-cover rounded-full"
                    sizes="40px"
                  />
                </div>
              </button>
            </div>

            {/* User Info */}
            <div className="ml-3 flex-1 min-w-0">
              <Link 
                href="#" 
                className="block font-medium text-gray-900 hover:text-blue-600 truncate"
              >
                {follower.name}
              </Link>
              <p className="text-sm text-gray-500 truncate">{follower.role}</p>
            </div>

            {/* Follow Button */}
            <button
              className={`ml-3 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                follower.hasRequested 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
              aria-label={follower.hasRequested ? "Following" : "Follow"}
            >
              {follower.hasRequested ? (
                <BsPersonCheckFill size={14} />
              ) : (
                <FaPlus size={12} />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SidePanel = () => {
  return (
    <div className="space-y-6">
      <RecentPost />
      <Tags />
      <Followers />
    </div>
  );
};

export default SidePanel;