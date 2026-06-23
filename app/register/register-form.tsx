"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "../(components)/(authentication-layout)/authentication/sign-up/actions";

export default function RegisterForm({ redirect = "/sahibinden" }: { redirect?: string }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  function validate(): string | null {
    if (!username.trim() || !email.trim() || !password) return "Tüm alanlar zorunludur.";
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) return "Kullanıcı adı yalnızca harf, rakam, - ve _ içerebilir.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "Geçerli bir e-posta girin.";
    if (password.length < 8) return "Şifre en az 8 karakter olmalı.";
    return null;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    start(async () => {
      try {
        const res = await signUp({ username: username.trim(), email: email.trim(), password });
        if (res?.error) setError(res.error);
        else router.push(redirect);
      } catch {
        setError("Beklenmeyen bir hata oluştu.");
      }
    });
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Sol: marka paneli */}
      <div className="relative hidden lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(17,24,39,.75), rgba(202,138,4,.6)), url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200')",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-10 text-white">
          <Link href="/" className="inline-flex w-fit items-center gap-1.5">
            <span className="rounded bg-yellow-400 px-2 py-1 text-lg font-extrabold leading-none text-gray-900">
              emlak
            </span>
          </Link>
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">
              Aramıza katıl, <br /> ilanını yayınla.
            </h2>
            <p className="mt-3 max-w-md text-gray-100">
              Ücretsiz üye ol; ilan ver, favorilerini takip et, ilan sahipleriyle mesajlaş ve
              güvenli kapora ile anlaş.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-gray-100">
              <li>✓ Sınırsız ücretsiz ilan</li>
              <li>✓ Favoriler & kayıtlı arama alarmı</li>
              <li>✓ Mağaza vitrini & doping</li>
            </ul>
          </div>
          <p className="text-xs text-gray-200">© {new Date().getFullYear()} emlak</p>
        </div>
      </div>

      {/* Sağ: form */}
      <div className="flex items-center justify-center bg-gray-50 px-4 py-10">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-6 inline-flex items-center gap-1.5 lg:hidden">
            <span className="rounded bg-yellow-400 px-2 py-1 text-lg font-extrabold leading-none text-gray-900">
              emlak
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-800">Üye Ol</h1>
          <p className="mt-1 text-sm text-gray-500">Birkaç saniyede ücretsiz hesabını oluştur.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">Kullanıcı Adı</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="kullaniciadi"
                autoComplete="username"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@eposta.com"
                autoComplete="email"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">Şifre</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="En az 8 karakter"
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-10 text-sm outline-none focus:border-yellow-400"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-black hover:text-gray-700"
                >
                  {show ? "Gizle" : "Göster"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {pending ? "Hesap oluşturuluyor..." : "Üye Ol"}
            </button>

            <p className="text-center text-[11px] text-black">
              Üye olarak kullanım koşullarını kabul etmiş sayılırsın.
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Zaten hesabın var mı?{" "}
            <Link href={`/login?redirect=${encodeURIComponent(redirect)}`} className="font-semibold text-blue-600 hover:underline">
              Giriş Yap
            </Link>
          </p>
          <p className="mt-2 text-center text-xs text-black">
            <Link href="/" className="hover:text-gray-700">← Anasayfaya dön</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
