'use client';  // Add the 'use client' directive at the top of the file

import { ensureInstagramProfile, getSessionEmailOrThrow, postEntry } from "../actions";
import { Button, TextArea } from "@radix-ui/themes";
import { CloudUploadIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CreatePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Move async logic (fetching session email, ensuring Instagram profile) into useEffect
  useEffect(() => {
    const fetchData = async () => {
      const email = await getSessionEmailOrThrow();
      await ensureInstagramProfile(email);
    };

    fetchData().catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, []);

  // Function to upload the image asynchronously
  const uploadImage = async (file: File) => {
    setIsUploading(true);
    const data = new FormData();
    data.set("file", file);

    try {
      const res = await fetch("/api/instagram/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      setImageUrl(result.secure_url);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (file) {
      uploadImage(file);
    }
  }, [file]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("image", imageUrl);

    try {
      const { id } = await postEntry(formData);
      router.push(`/home/instagram/posts/${id}`);
      router.refresh();
    } catch (error) {
      console.error("Error submitting post", error);
    }
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <input type="hidden" name="image" value={imageUrl} />

      <div className="flex flex-col gap-4">
        <div>
          <div className="min-h-64 p-2 bg-gray-400 rounded-md relative">
            {imageUrl && <img src={imageUrl} className="rounded-md" alt="Uploaded" />}

            <div className="absolute inset-0 flex items-center justify-center">
              <input
                onChange={ev => setFile(ev.target.files?.[0] || null)}
                className="hidden"
                type="file"
                ref={fileInRef}
              />
              <Button
                disabled={isUploading}
                onClick={() => fileInRef?.current?.click()}
                type="button"
                variant="surface"
              >
                {!isUploading && <CloudUploadIcon size={16} />}
                {isUploading ? "Uploading..." : "Choose image"}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <TextArea
            name="description"
            className="h-16"
            placeholder="Add photo description..."
          />
        </div>
      </div>

      <div className="flex mt-4 justify-center">
        <Button type="submit" disabled={isUploading}>
          <SendIcon size={16} />
          Publish
        </Button>
      </div>
    </form>
  );
}
