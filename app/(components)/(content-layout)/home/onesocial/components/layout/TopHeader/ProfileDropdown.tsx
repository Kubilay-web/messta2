"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  BsCardText,
  BsCircleHalf,
  BsGear,
  BsLifePreserver,
  BsMoonStars,
  BsPower,
  BsSun,
} from "react-icons/bs";
import type { IconType } from "react-icons";

import type { ThemeType } from "../../../types/context";

import avatar7 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/07.jpg";
import { toSentenceCase } from "../../../utils/change-casing";
import { useLayoutContext } from "../../../context/useLayoutContext";
import clsx from "clsx";
import { developedByLink } from "../../../context/constants";
import Link from "next/link";
import { useSession } from "@/app/SessionProvider";

type ThemeModeType = {
  theme: ThemeType;
  icon: IconType;
};

type UserData = {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  role: string;
  createdAt: string;
  location: string | null;
  portfolio: string | null;
};

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltip, setTooltip] = useState<{text: string, visible: boolean, position: {x: number, y: number}} | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {user}=useSession();

  const themeModes: ThemeModeType[] = [
    {
      icon: BsSun,
      theme: "light",
    },
    {
      icon: BsMoonStars,
      theme: "dark",
    },
    {
      icon: BsCircleHalf,
      theme: "auto",
    },
  ];

  const { theme: themeMode, updateTheme } = useLayoutContext();

  // Kullanıcı verilerini fetch et
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/onesocial/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Otomatik olarak cookie'leri gönder
          credentials: 'include'
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError('Please login to view profile');
            return;
          }
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        
        if (data.success && data.user) {
          setUserData(data.user);
        } else {
          setError(data.error || 'Failed to load user data');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error loading profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleMouseEnter = (theme: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      text: toSentenceCase(theme),
      visible: true,
      position: { x: rect.left + rect.width / 2, y: rect.top }
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  // Avatar URL'sini kontrol et ve varsayılan resim kullan
  const getAvatarUrl = () => {
    if (userData?.avatarUrl) {
      return userData.avatarUrl;
    }
    return avatar7; // Varsayılan avatar
  };

  // Kullanıcı adını kontrol et
  const getDisplayName = () => {
    if (userData?.displayName) {
      return userData.displayName;
    }
    return userData?.username || "Guest User";
  };

  // Bio veya rol bilgisini göster
  const getUserBioOrRole = () => {
    if (userData?.bio) {
      return userData.bio;
    }
    // Rolü formatla
    if (userData?.role) {
      return toSentenceCase(userData.role);
    }
    return "Web Developer"; // Varsayılan
  };

  return (
    <li className="relative ml-2 list-none">
      <button
        className="flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open profile menu"
      >
        <div className="w-10 h-10 overflow-hidden rounded-lg">
          {loading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />
          ) : (
            <Image 
              className="object-cover w-full h-full" 
              src={getAvatarUrl()} 
              alt="User avatar" 
              width={40}
              height={40}
              priority
            />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-50">
          <div className="pt-3 px-4">
            <div className="flex items-center relative">
              <div className="w-12 h-12 mr-3">
                <div className="w-full h-full overflow-hidden rounded-full">
                  {loading ? (
                    <div className="w-full h-full bg-gray-200 animate-pulse rounded-full" />
                  ) : (
                    <Image
                      className="object-cover w-full h-full"
                      src={getAvatarUrl()}
                      alt="User avatar"
                      width={48}
                      height={48}
                    />
                  )}
                </div>
              </div>
              <div className="min-w-0">
                {loading ? (
                  <>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-24 mb-2" />
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-16" />
                  </>
                ) : error ? (
                  <>
                    <span className="font-semibold block text-gray-900 dark:text-white">
                      Error
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {error}
                    </p>
                  </>
                ) : (
                  <>
                    <Link 
                      className="font-semibold block hover:text-blue-600 dark:hover:text-blue-400 text-gray-900 dark:text-white truncate"
                      href="home/onesocial/profile/feed"
                    >
                      {getDisplayName()}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {getUserBioOrRole()}
                    </p>
                  </>
                )}
              </div>
            </div>
            <Link
              className="block w-full mt-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-lg text-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              href={`/home/onesocial/profile/${user.username}`}
            >
              View profile
            </Link>
          </div>
          
          <div className="py-2">
            <Link 
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              href="/home/onesocial/settings/account"
            >
              <BsGear className="mr-2" />
              Settings &amp; Privacy
            </Link>
            <Link 
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              <BsLifePreserver className="mr-2" />
              Support
            </Link>
            <Link 
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              <BsCardText className="mr-2" />
              Documentation
            </Link>
            
            <hr className="my-2 border-gray-200 dark:border-gray-700" />
            
            <Link
              className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              href="/"
            >
              <BsPower className="mr-2" />
              Sign Out
            </Link>
            
            {/* <hr className="my-2 border-gray-200 dark:border-gray-700" /> */}
            
            {/* <div className="flex items-center justify-center gap-3 p-2 pt-0">
              <span className="text-sm text-gray-600 dark:text-gray-400">Mode:</span>
              {themeModes.map(({ icon: Icon, theme }, idx) => (
                <div 
                  key={theme + idx}
                  className="relative"
                  onMouseEnter={(e) => handleMouseEnter(theme, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className={clsx(
                      "p-2 rounded-lg transition-colors",
                      theme === themeMode 
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
                        : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                    onClick={() => updateTheme(theme)}
                    aria-label={`Switch to ${theme} mode`}
                  >
                    <Icon />
                  </button>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      )}

      {tooltip?.visible && (
        <div 
          className="fixed z-[60] px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded whitespace-nowrap"
          style={{
            left: tooltip.position.x,
            top: tooltip.position.y - 35,
            transform: 'translateX(-50%)'
          }}
        >
          {tooltip.text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
        </div>
      )}
    </li>
  );
};

export default ProfileDropdown;