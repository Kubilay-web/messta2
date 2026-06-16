import { validateRequest } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import streamServerClient from "@/app/lib/stream";
 import { createUploadthing, FileRouter } from "uploadthing/next";
 import { UploadThingError, UTApi } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
  avatar: f({
    image: { maxFileSize: "512KB" },
  })
    .middleware(async () => {
      const { user } = await validateRequest();

      if (!user) throw new UploadThingError("Unauthorized");

      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const oldAvatarUrl = metadata.user.avatarUrl;

      // Önceki avatar URL'sini kontrol et
      if (oldAvatarUrl) {
        const key = oldAvatarUrl.split(`/a/`)[1]; // "/a/" kısmından sonrası alınır

        // Eski avatar dosyasını sil
        await new UTApi().deleteFiles(key);
      }

      // Yeni avatar URL'sini "/a/" yerine "/f/" olarak değiştiriyoruz
      const newAvatarUrl = file.url.replace(
        `/a/`, // "/a/" kısmını "/f/" ile değiştiriyoruz
        "/f/",
      );

      // Veritabanında kullanıcı avatarını güncelle
      await Promise.all([
        prisma.user.update({
          where: { id: metadata.user.id },
          data: {
            avatarUrl: newAvatarUrl,
          },
        }),
        streamServerClient.partialUpdateUser({
          id: metadata.user.id,
          set: {
            image: newAvatarUrl,
          },
        }),
      ]);

      return { avatarUrl: newAvatarUrl };
    }),

  attachment: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
    video: { maxFileSize: "64MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const { user } = await validateRequest();

      if (!user) throw new UploadThingError("Unauthorized");

      return {};
    })
    .onUploadComplete(async ({ file }) => {
      // Yüklenen dosyanın URL'sindeki "/a/" kısmını "/f/" ile değiştiriyoruz
      const newFileUrl = file.url.replace("/a/", `/f/`); // "/a/" kısmı "/f/" ile değiştirildi

      const media = await prisma.media.create({
        data: {
          url: newFileUrl, // "/a/" yerine "/f/" kullanılıyor
          type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
        },
      });

      return { mediaId: media.id };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;
