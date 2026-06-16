// Playlist verisi tipini manuel olarak tanımlıyoruz
export interface Playlist {
  id: string;
  name: string;
  thumbnailUrl?: string;
  videoCount: number;
}

export interface PlaylistGetManyOutput {
  items: Playlist[];
  nextCursor: string | null;
}