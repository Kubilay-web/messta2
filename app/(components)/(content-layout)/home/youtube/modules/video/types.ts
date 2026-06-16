// Tek video detayı (getOne)

export interface VideoGetOneOutput {
  id: string;
  title: string;
  description: string;
  muxPlaybackId: string;
  muxStatus: string;
  thumbnailUrl: string;
  viewerSubscribed: boolean; // Kullanıcının abone durumu
  subscriberCount: number;   // Abone sayısı
  user: {
    id: string;
    username: string;
    avatarUrl: string;
    subscriberCount: number;
    viewerSubscribed: boolean; // Kullanıcının abone olup olmadığı
    isOwner: boolean;         // Video sahibi mi
  };
}





// Çoklu video (getMany / öneriler)
export interface VideoGetManyOutput {
  id: string;
  title: string;
  muxPlaybackId: string;
  thumbnailUrl: string;
  previewUrl: string;    // Yeni eklenen alan
  duration: number;      // Yeni eklenen alan
  visibility?: string;   // Gerekli değilse, isteğe bağlı hale getirilebilir
}


export const fetchVideo = async (videoId: string): Promise<VideoGetOneOutput> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video/studio/videos/${videoId}`);
  if (!res.ok) throw new Error("Failed to fetch video");
  return res.json();
};

export const fetchVideoSuggestions = async (videoId: string, limit = 10): Promise<VideoGetManyOutput[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/suggestions?videoId=${videoId}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch suggestions");
  return res.json();
};
