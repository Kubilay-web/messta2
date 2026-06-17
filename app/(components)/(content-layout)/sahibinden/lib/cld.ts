// Cloudinary URL'lerine otomatik format/kalite + boyut dönüşümü ekler.
// res.cloudinary.com dışındaki URL'ler değişmeden döner.

export function cldThumb(url?: string | null, width = 600, height?: number): string {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  // Zaten dönüşüm eklenmişse tekrar ekleme
  const t = [`f_auto`, `q_auto`, `w_${width}`, height ? `h_${height}` : null, `c_fill`, `g_auto`]
    .filter(Boolean)
    .join(",");
  return url.replace("/upload/", `/upload/${t}/`);
}
