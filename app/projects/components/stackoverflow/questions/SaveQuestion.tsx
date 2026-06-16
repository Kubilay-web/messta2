"use client";
import toast from "react-hot-toast";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { UserInfo } from "@/app/queries/user";

// SaveQuestion bileşeni
const SaveQuestion = ({
  questionId,
  hasSaved: initialHasSaved,
}: {
  questionId: string;
  hasSaved: boolean;
}) => {
  const [user, setUser] = useState<any>(null);

  // Kullanıcı bilgilerini al
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await UserInfo();
      setUser(userData);
    };

    fetchUser();
  }, []);

  // Sorunun kaydedilip kaydedilmediğini tutan state
  const [hasSaved, setHasSaved] = useState(initialHasSaved);
  const [isLoading, setIsLoading] = useState(false);

  // Soruyu kaydetme/çıkarmayı işleyen fonksiyon
  const handleSave = async () => {
    if (isLoading) return; // Eğer işlem yapılıyorsa başka işlem yapma
    if (!user) {
      return toast.error("You need to be logged in to save question"); // Toast mesajını string olarak yazıyoruz
    }

    setIsLoading(true);

    try {
      // PATCH isteği gönder
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/collection/${questionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to save question");
      }

      setHasSaved(data.saved); // Kaydetme durumunu güncelle
      toast.success(
        `Question ${data.saved ? "saved" : "unsaved"} successfully`,
      ); // Başarı durumunda success toast mesajı
    } catch (error) {
      toast.error("Error occurred while saving the question"); // Hata durumunda error toast mesajı
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Image
      src={
        hasSaved
          ? "/assets/stackoverflow/icons/star-filled.svg"
          : "/assets/stackoverflow/icons/star-red.svg"
      }
      width={18}
      height={18}
      alt="save"
      className={`cursor-pointer ${isLoading && "opacity-50"}`}
      aria-label="Save question"
      onClick={handleSave}
    />
  );
};

export default SaveQuestion;
