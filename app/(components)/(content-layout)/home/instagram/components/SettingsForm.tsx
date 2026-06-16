'use client';

import { updateProfile } from "../actions";
import { ProfileInstagram } from "@prisma/client";
import { Button, Switch, TextArea, TextField } from "@radix-ui/themes";
import { CloudUploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SettingsForm({ profile }: { profile: ProfileInstagram | null }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || "");

  // Cloudinary upload
  useEffect(() => {
    if (!file) return;

    const uploadFile = async () => {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/instagram/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (json.secure_url) {
        setAvatarUrl(json.secure_url);
      }
    };

    uploadFile();
  }, [file]);

  return (
    <form
      action={async (formData: FormData) => {
        formData.set("avatar", avatarUrl);
        await updateProfile(formData);
        router.push("/home/instagram/profile");
        router.refresh();
      }}
    >
      <input type="hidden" name="avatar" value={avatarUrl} />

      <div className="flex gap-4 items-center">
        <div className="bg-gray-400 w-24 h-24 rounded-full overflow-hidden shadow-md shadow-gray-400">
          {avatarUrl && <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />}
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button type="button" variant="surface" onClick={() => fileInputRef.current?.click()}>
            <CloudUploadIcon />
            Change avatar
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <label className="font-bold">Username</label>
        <TextField.Root name="username" defaultValue={profile?.username || ""} placeholder="your_username" />

        <label className="font-bold mt-2">Name</label>
        <TextField.Root name="name" defaultValue={profile?.name || ""} placeholder="John Doe" />

        <label className="font-bold mt-2">Subtitle</label>
        <TextField.Root name="subtitle" defaultValue={profile?.subtitle || ""} placeholder="Graphic designer" />

        <label className="font-bold mt-2">Bio</label>
        <TextArea name="bio" defaultValue={profile?.bio || ""} />

        <label className="flex gap-2 items-center mt-2">
          <span>Dark mode</span>
          <Switch
            defaultChecked={localStorage.getItem("theme") === "dark"}
            onCheckedChange={(isDark) => {
              const html = document.querySelector("html");
              const theme = isDark ? "dark" : "light";
              if (html) html.dataset.theme = theme;
              localStorage.setItem("theme", theme);
              window.location.reload();
            }}
          />
        </label>
      </div>

      <div className="mt-4 flex justify-center">
        <Button variant="solid">Save settings</Button>
      </div>
    </form>
  );
}
