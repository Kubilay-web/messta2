"use client";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  BsBookmarkCheck,
  BsCalendar2EventFill,
  BsCameraReels,
  BsCameraReelsFill,
  BsCameraVideoFill,
  BsEmojiSmileFill,
  BsEnvelope,
  BsFileEarmarkText,
  BsGeoAltFill,
  BsImageFill,
  BsImages,
  BsPencilSquare,
  BsTagFill,
  BsThreeDots,
} from "react-icons/bs";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useToggle from "../../hooks/useToggle";
import DropzoneFormInput from "../form/DropzoneFormInput";
import TextFormInput from "../form/TextFormInput";
import TextAreaFormInput from "../form/TextAreaFormInput";
import DateFormInput from "../form/DateFormInput";
import ChoicesFormInput from "../form/ChoicesFormInput";
import Link from "next/link";

// Default avatar
import avatar3 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/03.jpg";
import avatar1 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/01.jpg";
import avatar2 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/02.jpg";
import avatar4 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/04.jpg";
import avatar5 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/05.jpg";
import avatar6 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/06.jpg";
import avatar7 from "@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/07.jpg";
import usePostStore from "@/app/social-store/post";
import { useSession } from "@/app/SessionProvider";

interface SimpleFileUploadProps {
  accept: string;
  multiple?: boolean;
  onFilesSelected: (files: File[], previewUrls: string[]) => void;
}

const SimpleFileUpload = ({
  accept,
  multiple = true,
  onFilesSelected,
}: SimpleFileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const previewUrls = files.map((file) => URL.createObjectURL(file));

    onFilesSelected(files, previewUrls);

    // Aynı dosya tekrar seçilebilsin diye
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
        id="photo-upload"
      />

      <label
        htmlFor="photo-upload"
        className="flex flex-col items-center justify-center
                   border-2 border-dashed border-gray-300
                   rounded-lg p-6 cursor-pointer
                   hover:border-blue-400 transition"
      >
        <BsImageFill className="text-2xl text-gray-400 mb-2" />
        <span className="text-sm text-gray-600">Click or drag images here</span>
      </label>
    </>
  );
};

const CreatePostCard = () => {
  const guests = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
  ];

  const { isTrue: isOpenPhoto, toggle: togglePhotoModel } = useToggle();
  const { isTrue: isOpenVideo, toggle: toggleVideoModel } = useToggle();
  const { isTrue: isOpenEvent, toggle: toggleEvent } = useToggle();
  const { isTrue: isOpenPost, toggle: togglePost } = useToggle();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Photo modal için state'ler
  const [photoContent, setPhotoContent] = useState("");
  const [uploadedImageFiles, setUploadedImageFiles] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [isPostingPhoto, setIsPostingPhoto] = useState(false);
  const [cursorPositionPhoto, setCursorPositionPhoto] = useState<number | null>(
    null
  );

  // Video modal için state'ler
  const [videoContent, setVideoContent] = useState("");
  const [uploadedVideoFiles, setUploadedVideoFiles] = useState<File[]>([]);
  const [videoPreviewUrls, setVideoPreviewUrls] = useState<string[]>([]);
  const [isPostingVideo, setIsPostingVideo] = useState(false);
  const [cursorPositionVideo, setCursorPositionVideo] = useState<number | null>(
    null
  );

  // Ana textarea için cursor state
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const { user } = useSession();
  const [isPosting, setIsPosting] = useState(false);

  const { prependPost } = usePostStore();

  // Ana textarea ref'i
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const photoTextareaRef = useRef<HTMLTextAreaElement>(null);
  const videoTextareaRef = useRef<HTMLTextAreaElement>(null);

  // File'ı base64'e çevirme fonksiyonu
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Kullanıcı avatarını fetch et
  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/onesocial/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user?.avatarUrl) {
            setUserAvatar(data.user.avatarUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching user avatar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAvatar();
  }, []);

  // Ana textarea için cursor kontrolü
  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target;
      const { selectionStart, value } = textarea;

      setCursorPosition(selectionStart);
      setPostContent(value);
    },
    []
  );

  // Photo modal textarea için cursor kontrolü
  const handlePhotoTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target;
      const { selectionStart, value } = textarea;

      setCursorPositionPhoto(selectionStart);
      setPhotoContent(value);
    },
    []
  );

  // Video modal textarea için cursor kontrolü
  const handleVideoTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target;
      const { selectionStart, value } = textarea;

      setCursorPositionVideo(selectionStart);
      setVideoContent(value);
    },
    []
  );

  // Cursor pozisyonlarını restore et
  useEffect(() => {
    if (textareaRef.current && cursorPosition !== null) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [postContent, cursorPosition]);

  useEffect(() => {
    if (photoTextareaRef.current && cursorPositionPhoto !== null) {
      photoTextareaRef.current.focus();
      photoTextareaRef.current.setSelectionRange(
        cursorPositionPhoto,
        cursorPositionPhoto
      );
    }
  }, [photoContent, cursorPositionPhoto]);

  useEffect(() => {
    if (videoTextareaRef.current && cursorPositionVideo !== null) {
      videoTextareaRef.current.focus();
      videoTextareaRef.current.setSelectionRange(
        cursorPositionVideo,
        cursorPositionVideo
      );
    }
  }, [videoContent, cursorPositionVideo]);

  // Photo modal kapandığında state'leri temizle
  useEffect(() => {
    if (!isOpenPhoto) {
      setTimeout(() => {
        setPhotoContent("");
        setUploadedImageFiles([]);
        photoPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
        setPhotoPreviewUrls([]);
        setCursorPositionPhoto(null);
      }, 300);
    }
  }, [isOpenPhoto]);

  // Video modal kapandığında state'leri temizle
  useEffect(() => {
    if (!isOpenVideo) {
      setTimeout(() => {
        setVideoContent("");
        setUploadedVideoFiles([]);
        videoPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
        setVideoPreviewUrls([]);
        setCursorPositionVideo(null);
      }, 300);
    }
  }, [isOpenVideo]);

  const eventFormSchema = yup.object({
    title: yup.string().required("Please enter event title"),
    description: yup.string().required("Please enter event description"),
    duration: yup.string().required("Please enter event duration"),
    location: yup.string().required("Please enter event location"),
    guest: yup
      .string()
      .email("Please enter valid email")
      .required("Please enter event guest email"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(eventFormSchema),
  });

  const Modal = ({ isOpen, onClose, children, title }: any) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
              type="button"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const ModalFooter = ({ children }: any) => (
    <div className="flex justify-end gap-2 p-4 border-t">{children}</div>
  );

  const Tooltip = ({ children, text }: any) => {
    const [show, setShow] = useState(false);

    return (
      <div className="relative inline-block">
        <div
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {children}
        </div>
        {show && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
            {text}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    );
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim() || isPosting) return;

    try {
      setIsPosting(true);

      const res = await fetch("/api/onesocial/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          text: postContent,
          type: "post",
        }),
      });

      if (!res.ok) throw new Error("Post failed");

      const data = await res.json();

      prependPost({
        id: String(data.id),
        createdAt: data.createdAt ?? new Date().toISOString(),
        text: data.text ?? postContent,
        images: [],
        videos: [],
        user: {
          username: user.username ?? "You",
          avatarUrl: user.avatarUrl ?? "/default-avatar.png",
        },
        likesCount: 0,
        isLiked: false,
        comments: [],
        commentsCount: 0,
      });

      setPostContent("");
      setCursorPosition(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPosting(false);
    }
  };

  // Photo dosya seçimi handler'ı
  const handlePhotoFilesSelected = (files: File[], previewUrls: string[]) => {
    setUploadedImageFiles(files);
    setPhotoPreviewUrls(previewUrls);
  };

  // Photo Modal için post işlemi
  const handlePhotoPostSubmit = async () => {
    if (!photoContent.trim() && uploadedImageFiles.length === 0) return;

    try {
      setIsPostingPhoto(true);

      const base64Images = await Promise.all(
        uploadedImageFiles.map(fileToBase64)
      );

      const res = await fetch("/api/onesocial/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          text: photoContent,
          images: base64Images,
          type: "post",
        }),
      });

      if (!res.ok) throw new Error("Photo post failed");

      const data = await res.json();

      prependPost({
        id: String(data.id),
        createdAt: data.createdAt ?? new Date().toISOString(),
        text: data.text ?? photoContent,
        images: data.images ?? [],
        videos: [],
        user: {
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
        likesCount: 0,
        isLiked: false,
        comments: [],
        commentsCount: 0,
      });

      // Modal'ı kapat ve state'leri temizle
      togglePhotoModel();
      setPhotoContent("");
      setUploadedImageFiles([]);
      photoPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
      setPhotoPreviewUrls([]);
      setCursorPositionPhoto(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPostingPhoto(false);
    }
  };

  // Video dosya seçimi handler'ı
  const handleVideoFilesSelected = (files: File[], previewUrls: string[]) => {
    setUploadedVideoFiles(files);
    setVideoPreviewUrls(previewUrls);
  };

  // Video Modal için post işlemi
  const handleVideoPostSubmit = async () => {
    if (!videoContent.trim() && uploadedVideoFiles.length === 0) {
      alert("Please add text or video to your post");
      return;
    }

    try {
      setIsPostingVideo(true);

      const base64Videos = await Promise.all(
        uploadedVideoFiles.map(fileToBase64)
      );

      const response = await fetch("/api/onesocial/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          text: videoContent,
          videos: base64Videos,
          type: "post",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${errorText}`);
      }

      const data = await response.json();

      prependPost({
        id: String(data.id),
        createdAt: data.createdAt ?? new Date().toISOString(),
        text: data.text ?? videoContent,
        images: [],
        videos: data.videos ?? [],
        user: {
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
        likesCount: 0,
        isLiked: false,
        comments: [],
        commentsCount: 0,
      });

      // Modal'ı kapat ve state'leri temizle
      toggleVideoModel();
      setVideoContent("");
      setUploadedVideoFiles([]);
      videoPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
      setVideoPreviewUrls([]);
      setCursorPositionVideo(null);

      alert("Video posted successfully!");
    } catch (error) {
      console.error("Error posting video:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsPostingVideo(false);
    }
  };

  const { setFeedMode, fetchPosts } = usePostStore();

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex mb-3">
          <div className="relative w-8 h-8 mr-2 flex-shrink-0">
            <span role="button" className="cursor-pointer">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : (
                <Image
                  className="rounded-full object-cover w-full h-full"
                  src={userAvatar || avatar3}
                  alt="User avatar"
                  width={32}
                  height={32}
                  priority
                />
              )}
            </span>
          </div>

          <form className="w-full" onSubmit={handlePostSubmit}>
            <textarea
              ref={textareaRef}
              className="w-full p-2 border-0 focus:outline-none focus:ring-0 resize-none placeholder-gray-500"
              rows={2}
              placeholder="Share your thoughts..."
              onChange={handleTextareaChange}
              value={postContent}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const textarea = e.target as HTMLTextAreaElement;
                  setCursorPosition(textarea.selectionStart + 1);
                }
              }}
              onSelect={(e) => {
                const textarea = e.target as HTMLTextAreaElement;
                setCursorPosition(textarea.selectionStart);
              }}
            />

            {/* Post butonu - yazı yazılınca görünür */}
            {postContent.trim() && (
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={isPosting}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2
                    ${
                      isPosting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }
                    text-white transition-colors`}
                >
                  {isPosting && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {isPosting ? "Posting..." : "Post"}
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="flex flex-wrap gap-2 text-sm font-normal">
          <button
            className="flex items-center bg-gray-100 hover:bg-gray-200 py-1 px-2 rounded transition-colors"
            onClick={togglePhotoModel}
            type="button"
          >
            <BsImageFill size={20} className="text-green-500 mr-2" />
            Photo
          </button>
          <button
            className="flex items-center bg-gray-100 hover:bg-gray-200 py-1 px-2 rounded transition-colors"
            onClick={toggleVideoModel}
            type="button"
          >
            <BsCameraReelsFill size={20} className="text-blue-500 mr-2" />
            Video
          </button>
          <button
            className="flex items-center bg-gray-100 hover:bg-gray-200 py-1 px-2 rounded transition-colors"
            onClick={toggleEvent}
            type="button"
          >
            <BsCalendar2EventFill size={20} className="text-red-500 mr-2" />
            Event
          </button>
          <button
            className="flex items-center bg-gray-100 hover:bg-gray-200 py-1 px-2 rounded transition-colors"
            onClick={togglePost}
            type="button"
          >
            <BsEmojiSmileFill size={20} className="text-yellow-500 mr-2" />
            Feeling /Activity
          </button>

          <button
            type="button"
            className="flex items-center bg-gray-100 hover:bg-gray-200 py-1 px-2 rounded transition-colors"
            onClick={async () => {
              setFeedMode("discover");
              await fetchPosts();
            }}
          >
            🌍 Discover One
          </button>

          <div className="relative ml-auto">
            <button
              className="flex items-center bg-gray-100 hover:bg-gray-200 py-1 px-2 rounded transition-colors"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              type="button"
            >
              <BsThreeDots />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border">
                <div className="py-1">
                  <Link
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <BsEnvelope size={21} className="mr-2" />
                    Create a poll
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <BsBookmarkCheck size={21} className="mr-2" />
                    Ask a question
                  </Link>
                  <div className="border-t my-1"></div>
                  <Link
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <BsPencilSquare size={21} className="mr-2" />
                    Help
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      <Modal
        isOpen={isOpenPhoto}
        onClose={togglePhotoModel}
        title="Add post photo"
      >
        <div className="p-4 space-y-4">
          {/* Header / Avatar + Textarea */}
          <div className="flex gap-2">
            <div className="relative w-8 h-8 flex-shrink-0">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : (
                <Image
                  src={userAvatar || avatar3}
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              )}
            </div>

            <textarea
              ref={photoTextareaRef}
              className="w-full p-2 border border-gray-300 rounded-lg resize-none
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Share your thoughts..."
              value={photoContent}
              onChange={handlePhotoTextareaChange}
              onSelect={(e) =>
                setCursorPositionPhoto(
                  (e.target as HTMLTextAreaElement).selectionStart
                )
              }
              disabled={isPostingPhoto}
            />
          </div>

          {/* File Upload */}
          <SimpleFileUpload
            accept="image/*"
            multiple
            onFilesSelected={handlePhotoFilesSelected}
          />

          {/* Preview */}
          {photoPreviewUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {photoPreviewUrls.map((url, i) => (
                <div key={i} className="relative aspect-square">
                  <Image
                    src={url}
                    alt={`preview-${i}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <ModalFooter>
          <button
            type="button"
            onClick={togglePhotoModel}
            disabled={isPostingPhoto}
            className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handlePhotoPostSubmit}
            disabled={
              isPostingPhoto ||
              (!photoContent.trim() && uploadedImageFiles.length === 0)
            }
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md
                 hover:bg-blue-700 disabled:opacity-50"
          >
            {isPostingPhoto ? "Posting..." : "Post"}
          </button>
        </ModalFooter>
      </Modal>

      {/* Video Modal */}

      <Modal
        isOpen={isOpenVideo}
        onClose={toggleVideoModel}
        title="Add post video"
      >
        <div className="p-4 space-y-4">
          {/* Avatar + Textarea */}
          <div className="flex gap-2">
            <div className="relative w-8 h-8 flex-shrink-0">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : (
                <Image
                  src={userAvatar || avatar3}
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              )}
            </div>

            <textarea
              ref={videoTextareaRef}
              className="w-full p-2 border border-gray-300 rounded-lg resize-none
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Share your thoughts..."
              value={videoContent}
              onChange={handleVideoTextareaChange}
              onSelect={(e) =>
                setCursorPositionVideo(
                  (e.target as HTMLTextAreaElement).selectionStart
                )
              }
              disabled={isPostingVideo}
            />
          </div>

          {/* File Upload */}
          <SimpleFileUpload
            accept="video/*"
            multiple
            onFilesSelected={handleVideoFilesSelected}
          />

          {/* Video info list */}
          {uploadedVideoFiles.length > 0 && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-700 mb-1">
                Selected {uploadedVideoFiles.length} video(s)
              </p>
              <ul className="text-xs text-blue-600 space-y-1">
                {uploadedVideoFiles.map((file, i) => (
                  <li key={i} className="truncate">
                    • {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <ModalFooter>
          <button
            type="button"
            disabled={isPostingVideo}
            className="flex items-center px-4 py-2 text-sm bg-gray-100
                 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            <BsCameraVideoFill className="mr-1" />
            Live video
          </button>

          <button
            type="button"
            onClick={handleVideoPostSubmit}
            disabled={
              isPostingVideo ||
              (!videoContent.trim() && uploadedVideoFiles.length === 0)
            }
            className="px-4 py-2 text-sm text-white bg-blue-600
                 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isPostingVideo ? "Posting..." : "Post"}
          </button>
        </ModalFooter>
      </Modal>

      {/* Event Modal */}
      <Modal isOpen={isOpenEvent} onClose={toggleEvent} title="Create event">
        <form onSubmit={handleSubmit(() => {})}>
          <div className="p-4">
            <div className="grid grid-cols-1 gap-4">
              <TextFormInput
                name="title"
                label="Title"
                placeholder="Event name here"
                containerClassName="col-span-full"
                control={control}
              />
              <TextAreaFormInput
                name="description"
                label="Description"
                rows={2}
                placeholder="Ex: topics, schedule, etc."
                containerClassName="col-span-full"
                control={control}
              />

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <DateFormInput
                    options={{ enableTime: false }}
                    className="w-full p-2 border rounded"
                    placeholder="Select date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <DateFormInput
                    options={{ enableTime: true, noCalendar: true }}
                    className="w-full p-2 border rounded"
                    placeholder="Select time"
                  />
                </div>
                <div>
                  <TextFormInput
                    name="duration"
                    label="Duration"
                    placeholder="1hr 23m"
                    containerClassName="w-full"
                    control={control}
                  />
                </div>
              </div>

              <TextFormInput
                name="location"
                label="Location"
                placeholder="Logansport, IN 46947"
                containerClassName="col-span-full"
                control={control}
              />
              <TextFormInput
                name="guest"
                type="email"
                label="Add guests"
                placeholder="Guest email"
                containerClassName="col-span-full"
                control={control}
              />

              <div className="mt-3">
                <div className="flex items-center">
                  {guests.map((avatar, idx) => (
                    <div className="relative w-8 h-8 -mr-2" key={idx}>
                      <Image
                        className="rounded-full object-cover w-full h-full border-2 border-white"
                        src={avatar}
                        alt="avatar"
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                  <div className="ml-3">
                    <span className="text-sm text-gray-500"> +50 </span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <DropzoneFormInput
                  showPreview
                  helpText="Drop presentation and document here or click to upload."
                  icon={BsFileEarmarkText}
                  label="Upload attachment"
                />
              </div>
            </div>
          </div>
          <ModalFooter>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              onClick={toggleEvent}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Create now
            </button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Feeling/Activity Modal */}
      <Modal isOpen={isOpenPost} onClose={togglePost} title="Create post">
        <div className="p-4">
          <div className="flex mb-3">
            <div className="relative w-8 h-8 mr-2 flex-shrink-0">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : (
                <Image
                  className="rounded-full object-cover w-full h-full"
                  src={userAvatar || avatar3}
                  alt="User avatar"
                  width={32}
                  height={32}
                />
              )}
            </div>
            <form className="w-full">
              <textarea
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-gray-500"
                rows={4}
                placeholder="Share your thoughts..."
                defaultValue={""}
              />
            </form>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Tooltip text="Photo">
              <Link
                className="w-10 h-10 flex items-center justify-center bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors"
                href="#"
              >
                <BsImageFill />
              </Link>
            </Tooltip>
            <Tooltip text="Video">
              <Link
                className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                href="#"
              >
                <BsCameraReelsFill />
              </Link>
            </Tooltip>
            <Tooltip text="Events">
              <Link
                className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                href="#"
              >
                <BsCalendar2EventFill />
              </Link>
            </Tooltip>
            <Tooltip text="Feeling/Activity">
              <Link
                className="w-10 h-10 flex items-center justify-center bg-yellow-50 text-yellow-600 rounded-full hover:bg-yellow-100 transition-colors"
                href="#"
              >
                <BsEmojiSmileFill />
              </Link>
            </Tooltip>
            <Tooltip text="Check in">
              <Link
                className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                href="#"
              >
                <BsGeoAltFill />
              </Link>
            </Tooltip>
            <Tooltip text="Tag people on top">
              <Link
                className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                href="#"
              >
                <BsTagFill />
              </Link>
            </Tooltip>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 border-t">
          <div className="w-1/4">
            <ChoicesFormInput
              options={{ searchEnabled: false }}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-position="top"
              data-search-enabled="false"
            >
              <option value="PB">Public</option>
              <option value="PV">Friends</option>
              <option value="PV">Only me</option>
              <option value="PV">Custom</option>
            </ChoicesFormInput>
          </div>
          <div className="w-3/4 text-right">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md mr-2 transition-colors"
            >
              <BsCameraVideoFill className="mr-1" /> Live video
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Post
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreatePostCard;
