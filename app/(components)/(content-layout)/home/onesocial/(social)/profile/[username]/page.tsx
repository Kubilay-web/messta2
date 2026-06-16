"use client";

import { useState, useEffect } from "react";
import GlightBox from "../../../components/GlightBox";
import { ChildrenType } from "../../../types/component";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  BsActivity,
  BsBookmark,
  BsBriefcase,
  BsCalendar2Plus,
  BsCalendarDate,
  BsCalendarEvent,
  BsChatLeftText,
  BsEnvelope,
  BsFileEarmarkPdf,
  BsGear,
  BsGeoAlt,
  BsHeart,
  BsImage,
  BsLock,
  BsPatchCheckFill,
  BsPencilFill,
  BsPersonX,
  BsPlayBtn,
  BsThreeDots,
} from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

import { PROFILE_MENU_ITEMS } from "../../../assets/data/menu-items";
import EditProfileModal from "../../../components/EditProfileModal";
import avatar7 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/07.jpg";
import background5 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/bg/05.jpg";

import album1 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/albums/01.jpg";
import album2 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/albums/02.jpg";
import album3 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/albums/03.jpg";
import album4 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/albums/04.jpg";
import album5 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/albums/05.jpg";
import About from "../about/page";
import Videos from "../videos/page";
import Feed from "../feed/page";
import PostList from "../../feed/(container)/posts/page";
import FriendsPage from "../../feed/(container)/friends/page";
import { useSession } from "@/app/SessionProvider";

// Tab tiplerini tanımlayalım
type TabType =
  | "feed"
  | "about"
  | "connections"
  | "friends"
  | "media"
  | "videos"
  | "events"
  | "activity";

const AboutContent = () => (
  <div>
    <About />
  </div>
);

const FriendsContent = () => (
  <div>
    <FriendsPage />
  </div>
);

const FeedContent = () => (
  <div>
    <PostList />
  </div>
);

const VideosContent = () => (
  <div>
    <Videos />
  </div>
);

// Experience component


// Experience component'ını güncelleyelim
const Experience = ({ experiences = [] }: { experiences?: any[] }) => {
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localExperiences, setLocalExperiences] = useState<any[]>(experiences || []);
  const {user}=useSession();

  // Deneyim verileri değiştiğinde güncelle
  useEffect(() => {
    setLocalExperiences(experiences || []);
  }, []);

  const displayExperiences = showAll 
    ? localExperiences 
    : localExperiences.slice(0, 3);

  const handleAddExperience = async () => {
    // Yeni deneyim ekleme mantığı buraya gelecek
    console.log("Add experience clicked");
  };

  const handleEditExperience = async (experienceId: string) => {
    // Deneyim düzenleme mantığı
    console.log("Edit experience:", experienceId);
  };

  const handleDeleteExperience = async (experienceId: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/onesocial/experience/${experienceId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        // Başarılı silme durumunda listeden kaldır
        setLocalExperiences(prev => prev.filter(exp => exp.id !== experienceId));
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format tarih fonksiyonu
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-700">
        <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
          Experience
        </h5>
        <button 
          onClick={handleAddExperience}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
          title="Add Experience"
        >
          <FaPlus className="h-4 w-4" />
        </button>
      </div>
      <div className="p-6 pt-0">
        {localExperiences.length > 0 ? (
          <>
            {displayExperiences.map((experience) => (
              <div
                className="flex items-start py-4 first:pt-6 last:pb-0"
                key={experience.id}
              >
                <div className="mr-3 flex-shrink-0">
                  <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                      {experience.companyLogo ? (
                        <Image
                          src={experience.companyLogo}
                          alt={experience.companyName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-blue-100 dark:bg-blue-900">
                          <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                            {experience.companyName?.charAt(0)?.toUpperCase() || 'C'}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
                <div className="min-w-0 flex-1">
                  <h6 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {experience.title}
                  </h6>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {experience.companyName}
                    {experience.location && ` • ${experience.location}`}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(experience.startDate)} - {experience.currentlyWorking ? 'Present' : formatDate(experience.endDate)}
                  </p>
                  {experience.description && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {experience.description}
                    </p>
                  )}
                  
                  {/* Edit/Delete Buttons - Sadece kullanıcı kendi profili ise */}
                  {user && (
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => handleEditExperience(experience.id)}
                        className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(experience.id)}
                        disabled={loading}
                        className="rounded-lg bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                      >
                        {loading ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {localExperiences.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {showAll ? 'Show Less' : `Show All (${localExperiences.length})`}
              </button>
            )}
          </>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No experience added yet
            </p>
            {user && (
              <button 
                onClick={handleAddExperience}
                className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Add Experience
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


// Photos component
const Photos = ({ photos }: { photos: string[] }) => {
  const albumImages = [album1, album2, album3, album4, album5];
  const displayPhotos = photos.length > 0 ? photos.slice(0, 9) : albumImages;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col items-start justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-700 sm:flex-row sm:items-center">
        <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
          Photos
        </h5>
        <button className="mt-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 sm:mt-0">
          See all photos
        </button>
      </div>
      <div className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {displayPhotos.map((photo, idx) => (
            <div key={idx} className="col-span-2 sm:col-span-1">
              <GlightBox
                href={typeof photo === "string" ? photo : photo.src}
                data-gallery="image-popup"
              >
                <div className="overflow-hidden rounded-lg">
                  <Image
                    className="h-32 w-full object-cover transition-transform hover:scale-105"
                    src={typeof photo === "string" ? photo : photo}
                    alt={`Album image ${idx + 1}`}
                    width={300}
                    height={128}
                  />
                </div>
              </GlightBox>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Friends component
const Friends = ({ friends }: { friends: any[] }) => {
  const [showAll, setShowAll] = useState(false);

  const displayFriends = showAll ? friends : friends.slice(0, 4);
  const mockFriends = [
    {
      id: 1,
      name: "John Doe",
      avatar: avatar7,
      isStory: true,
      mutualCount: 24,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: avatar7,
      isStory: false,
      mutualCount: 18,
    },
    {
      id: 3,
      name: "Alex Johnson",
      avatar: avatar7,
      isStory: true,
      mutualCount: 32,
    },
    {
      id: 4,
      name: "Sarah Miller",
      avatar: avatar7,
      isStory: false,
      mutualCount: 15,
    },
  ];

  const finalFriends = friends.length > 0 ? friends : mockFriends;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col items-start justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-700 sm:flex-row sm:items-center">
        <div className="flex items-center">
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
            Friends
          </h5>
          <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {finalFriends.length}
          </span>
        </div>
        <button className="mt-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 sm:mt-0">
          See all friends
        </button>
      </div>
      <div className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-3">
          {displayFriends.map((friend) => (
            <div
              key={friend.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="p-3 pb-2 text-center">
                <div
                  className={clsx("relative mx-auto", {
                    "before:absolute before:-inset-1 before:rounded-full before:border-2 before:border-blue-500":
                      friend.isStory,
                  })}
                >
                  <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={friend.avatar || avatar7}
                        alt={friend.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                </div>
                <h6 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
                  <Link
                    href="#"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {friend.name}
                  </Link>
                </h6>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 leading-snug">
                  {friend.mutualCount} mutual connections
                </p>
              </div>
              <div className="flex border-t border-gray-100 dark:border-gray-700 p-2">
                <button
                  className="mr-1 flex-1 rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                  data-tooltip="Send message"
                  title="Send message"
                >
                  <BsChatLeftText className="mx-auto h-4 w-4" />
                </button>
                <button
                  className="ml-1 flex-1 rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                  data-tooltip="Remove friend"
                  title="Remove friend"
                >
                  <BsPersonX className="mx-auto h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {finalFriends.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {showAll
              ? "Show Less"
              : `Load More Friends (${finalFriends.length - 4})`}
          </button>
        )}
      </div>
    </div>
  );
};

// ProfileDropdown component
const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
        aria-expanded={isOpen}
        aria-label="Profile actions"
      >
        <BsThreeDots className="h-5 w-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <BsBookmark className="mr-3 h-4 w-4 text-gray-400" />
              Share profile in a message
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <BsFileEarmarkPdf className="mr-3 h-4 w-4 text-gray-400" />
              Save your profile to PDF
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <BsLock className="mr-3 h-4 w-4 text-gray-400" />
              Lock profile
            </a>
            <div className="my-1 border-t border-gray-100 dark:border-gray-700" />
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <BsGear className="mr-3 h-4 w-4 text-gray-400" />
              Profile settings
            </a>
          </div>
        </>
      )}
    </div>
  );
};

// Main ProfileLayout component
const ProfileLayout = ({ children }: ChildrenType) => {
  const { username } = useParams<{ username: string }>();
  const pathName = usePathname();

  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("feed"); // Aktif tab state'i eklendi

  const [friendStatus, setFriendStatus] = useState<string>(""); // 'not_friends', 'pending', 'friends'
  const [followStatus, setFollowStatus] = useState<boolean>(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  useEffect(() => {
    if (username) {
      fetchProfile();
      checkFriendStatus();
      checkFollowStatus();
    }
  }, [username, pathName]);

  const checkFriendStatus = async () => {
    try {
      const res = await fetch(`/api/onesocial/friends/status/${username}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setFriendStatus(data.status); // 'not_friends', 'pending', 'friends'
      }
    } catch (error) {
      console.error("Error checking friend status:", error);
    }
  };

  const checkFollowStatus = async () => {
    try {
      const res = await fetch(`/api/onesocial/follow/status/${username}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setFollowStatus(data.isFollowing);
      }
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };

  const handleFriendRequest = async () => {
    if (isLoadingAction) return;

    setIsLoadingAction(true);
    try {
      const endpoint =
        friendStatus === "pending"
          ? `/api/onesocial/friends/cancel/${username}`
          : `/api/onesocial/friends/request/${username}`;

      const method = friendStatus === "pending" ? "DELETE" : "POST";

      const res = await fetch(endpoint, {
        method,
        credentials: "include",
      });

      if (res.ok) {
        if (friendStatus === "pending") {
          setFriendStatus("not_friends");
        } else if (friendStatus === "not_friends") {
          setFriendStatus("pending");
        }
      }
    } catch (error) {
      console.error("Error handling friend request:", error);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleFollowToggle = async () => {
    if (isLoadingAction) return;

    setIsLoadingAction(true);
    try {
      const endpoint = followStatus
        ? `/api/onesocial/follow/unfollow/${username}`
        : `/api/onesocial/follow/${username}`;

      const method = followStatus ? "DELETE" : "POST";

      const res = await fetch(endpoint, {
        method,
        credentials: "include",
      });

      if (res.ok) {
        setFollowStatus(!followStatus);
      }
    } catch (error) {
      console.error("Error handling follow:", error);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/onesocial/profile/${username}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Fetch failed");

      const json = await res.json();
      if (json.success) {
        setProfileData(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (data: any) => {
    const res = await fetch("/api/onesocial/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (json.success) {
      setProfileData((prev: any) => ({
        ...prev,
        user: { ...prev.user, ...data },
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  const user = profileData?.user || {};
  const isCurrentUser = profileData?.isCurrentUser || false;
  const experiences = profileData?.experiences


  const friends = profileData?.friends || [];
  const photos = profileData?.photos || [];

  const experienceData = [
    {
      id: 1,
      title: "Lead Developer",
      description: "Google Inc. • 2018 - Present",
      logo: "/default-company.png",
    },
    {
      id: 2,
      title: "Senior Software Engineer",
      description: "Facebook • 2015 - 2018",
      logo: "/default-company.png",
    },
    {
      id: 3,
      title: "Software Engineer",
      description: "Microsoft • 2012 - 2015",
      logo: "/default-company.png",
    },
  ];

  // Tab yapılandırması
  const PROFILE_TABS = [
    {
      key: "feed",
      label: "Feed",
      icon: null,
      badge: null,
    },
    {
      key: "about",
      label: "About",
      icon: null,
      badge: null,
    },
    {
      key: "connections",
      label: "Connections",
      icon: null,
      badge: { text: "300", variant: "success" },
    },
    {
      key: "media",
      label: "Media",
      icon: null,
      badge: null,
    },
    {
      key: "videos",
      label: "Videos",
      icon: null,
      badge: null,
    },
    {
      key: "events",
      label: "Events",
      icon: null,
      badge: null,
    },
    // {
    //   key: "activity",
    //   label: "Activity",
    //   icon: null,
    //   badge: null,
    // },
    {
      key: "friends",
      label: "Friends",
      icon: null,
      badge: null,
    },
  ];

  // Aktif tab'a göre içerik render et
  const renderTabContent = () => {
    switch (activeTab) {
      case "feed":
        return <FeedContent />;
      case "friends":
        return <FriendsContent />;
      case "videos":
        return <VideosContent />;
      case "about":
        return <AboutContent />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Eğer kullanıcı bulunamadıysa
  if (!profileData || !user.username) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile Not Found
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The user "{username}" does not exist or profile data is unavailable.
          </p>
        </div>
      </div>
    );
  }

  // PROFILE_MENU_ITEMS'deki URL'leri güncelle
  const getMenuUrl = (itemUrl: string) => {
    if (itemUrl.includes(":username")) {
      return itemUrl.replace(":username", username);
    }
    return itemUrl;
  };

  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Profile Header Card */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  {/* Cover Photo */}
                  <div
                    className="h-48 rounded-t-xl bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${user.bannerUrl || user.cover || background5.src})`,
                    }}
                  />

                  {/* Profile Info */}
                  <div className="relative px-6 pb-6">
                    <div className="flex flex-col items-start sm:flex-row sm:items-start">
                      {/* Avatar */}
                      <div className="-mt-12 sm:-mt-16">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-gray-800 sm:h-32 sm:w-32">
                          <Image
                            src={user.avatarUrl || avatar7}
                            alt={user.displayName || "User"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Profile Details */}
                      <div className="mt-4 sm:ml-6 sm:mt-3">
                        <h1 className="flex items-center text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                          {user.displayName || user.username}
                          <BsPatchCheckFill className="ml-1 h-4 w-4 text-green-500 sm:h-5 sm:w-5" />
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          {user.stats?.following || 0} connections
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 flex gap-2 sm:ml-auto sm:mt-3">
                        {isCurrentUser ? (
                          <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                          >
                            <BsPencilFill className="mr-2 h-4 w-4" />
                            Edit profile
                          </button>
                        ) : (
                          <>
                            {/* Friend Request Button */}
                            <button
                              onClick={handleFriendRequest}
                              disabled={isLoadingAction}
                              className={clsx(
                                "flex items-center rounded-lg px-2 py-2 text-sm font-medium transition-colors",
                                friendStatus === "pending"
                                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                  : friendStatus === "friends"
                                    ? "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                              )}
                            >
                              {isLoadingAction ? (
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                              ) : (
                                <>
                                  {friendStatus === "pending" && (
                                    <BsPersonX className="mr-2 h-4 w-4" />
                                  )}
                                  {friendStatus === "friends" && (
                                    <BsPatchCheckFill className="mr-2 h-4 w-4" />
                                  )}
                                  {friendStatus === "not_friends" && (
                                    <FaPlus className="mr-2 h-4 w-4" />
                                  )}
                                </>
                              )}
                              {friendStatus === "pending"
                                ? "Cancel Request"
                                : friendStatus === "friends"
                                  ? "Friends"
                                  : "Add Friend"}
                            </button>

                            {/* Follow Button */}
                            <button
                              onClick={handleFollowToggle}
                              disabled={isLoadingAction}
                              className={clsx(
                                "flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                                followStatus
                                  ? "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              )}
                            >
                              {isLoadingAction ? (
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-current"></div>
                              ) : (
                                <BsActivity className="mr-2 h-4 w-4" />
                              )}
                              {followStatus ? "Following" : "Follow"}
                            </button>
                          </>
                        )}

                        <ProfileDropdown />
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 sm:justify-start">
                      {user.job && (
                        <span className="flex items-center">
                          <BsBriefcase className="mr-1.5 h-4 w-4" />
                          {user.job}
                        </span>
                      )}
                      {user.location && (
                        <span className="flex items-center">
                          <BsGeoAlt className="mr-1.5 h-4 w-4" />
                          {user.location}
                        </span>
                      )}
                      <span className="flex items-center">
                        <BsCalendar2Plus className="mr-1.5 h-4 w-4" />
                        Joined on{" "}
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Navigation Tabs */}

                  <div className="border-t border-gray-100 px-6 py-4 dark:border-gray-700">
                    <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                      {PROFILE_TABS.map((tab) => {
                        const isActive = activeTab === tab.key;

                        return (
                          <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as TabType)}
                            className={clsx(
                              "flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                              isActive
                                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            )}
                          >
                            {tab.icon}
                            {tab.label}
                            {tab.badge && (
                              <span className="ml-2 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                {tab.badge.text}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                {renderTabContent()}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div>
              <div className="space-y-6">
                {/* About Card */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-700">
                    <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                      About
                    </h5>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      {user.bio || user.biosocial || "No bio added yet."}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {user.job && (
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <BsBriefcase className="mr-3 h-4 w-4 flex-shrink-0 text-gray-400" />
                          Works at{" "}
                          <span className="ml-1 font-medium text-gray-900 dark:text-white">
                            {user.job}
                          </span>
                        </li>
                      )}
                      {user.relationship && (
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <BsHeart className="mr-3 h-4 w-4 flex-shrink-0 text-gray-400" />
                          Status:{" "}
                          <span className="ml-1 font-medium text-gray-900 dark:text-white capitalize">
                            {user.relationship.replace("_", " ")}
                          </span>
                        </li>
                      )}
                      {/* E-posta sadece kendi profili ise göster */}
                      {user.email && isCurrentUser && (
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <BsEnvelope className="mr-3 h-4 w-4 flex-shrink-0 text-gray-400" />
                          Email:{" "}
                          <span className="ml-1 font-medium text-gray-900 dark:text-white">
                            {user.email}
                          </span>
                        </li>
                      )}
                      {user.college && (
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <BsCalendarDate className="mr-3 h-4 w-4 flex-shrink-0 text-gray-400" />
                          Studied at{" "}
                          <span className="ml-1 font-medium text-gray-900 dark:text-white">
                            {user.college}
                          </span>
                        </li>
                      )}
                      {user.hometown && (
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <BsGeoAlt className="mr-3 h-4 w-4 flex-shrink-0 text-gray-400" />
                          From{" "}
                          <span className="ml-1 font-medium text-gray-900 dark:text-white">
                            {user.hometown}
                          </span>
                        </li>
                      )}
                      {user.currentCity && (
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <BsGeoAlt className="mr-3 h-4 w-4 flex-shrink-0 text-gray-400" />
                          Lives in{" "}
                          <span className="ml-1 font-medium text-gray-900 dark:text-white">
                            {user.currentCity}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Experience */}
                <Experience experiences={experiences} />

                {/* Photos */}
                <Photos photos={photos} />

                {/* Friends */}
                <Friends friends={friends} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal - sadece kendi profili için */}
      {isCurrentUser && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
          onUpdate={handleUpdateProfile}
        />
      )}
    </>
  );
};

export default ProfileLayout;
