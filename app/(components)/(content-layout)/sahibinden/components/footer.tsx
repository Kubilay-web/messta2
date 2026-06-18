import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4">
        <div>
          <h4 className="mb-3 text-sm font-bold text-gray-800">Kurumsal</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/sahibinden" className="hover:text-yellow-600">Hakkımızda</Link></li>
            <li><Link href="/sahibinden" className="hover:text-yellow-600">Kariyer</Link></li>
            <li><Link href="/sahibinden" className="hover:text-yellow-600">İletişim</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold text-gray-800">Yardım</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/sahibinden" className="hover:text-yellow-600">Sıkça Sorulanlar</Link></li>
            <li><Link href="/sahibinden/ilan-ver" className="hover:text-yellow-600">İlan Verme Kuralları</Link></li>
            <li><Link href="/sahibinden" className="hover:text-yellow-600">Güvenlik İpuçları</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold text-gray-800">Kategoriler</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/sahibinden/kategori/emlak" className="hover:text-yellow-600">Emlak</Link></li>
            <li><Link href="/sahibinden/kategori/vasita" className="hover:text-yellow-600">Vasıta</Link></li>
            <li><Link href="/sahibinden/kategori/alisveris" className="hover:text-yellow-600">İkinci El</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold text-gray-800">Hesabım</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/sahibinden/hesabim/ilanlarim" className="hover:text-yellow-600">İlanlarım</Link></li>
            <li><Link href="/sahibinden/hesabim/favorilerim" className="hover:text-yellow-600">Favorilerim</Link></li>
            <li><Link href="/sahibinden/hesabim/mesajlarim" className="hover:text-yellow-600">Mesajlarım</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} sahibinden klonu — Eğitim amaçlı demo uygulaması.
      </div>
    </footer>
  );
}
