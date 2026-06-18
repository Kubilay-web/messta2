"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "../(components)/(authentication-layout)/authentication/sign-in/actions";

export default function LoginForm({ redirect = "/sahibinden" }: { redirect?: string }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password) {
      setError("Kullanıcı adı ve şifre zorunludur.");
      return;
    }
    start(async () => {
      try {
        const res = await login({ username: username.trim(), password });
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
              "linear-gradient(to bottom, rgba(17,24,39,.75), rgba(37,99,235,.65)), url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200')",
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
              Hayalindeki eve <br /> giriş yap.
            </h2>
            <p className="mt-3 max-w-md text-gray-200">
              İlan ver, favorilerini takip et, ilan sahibiyle mesajlaş, gezme randevusu al ve güvenli
              kapora ile anlaş.
            </p>
          </div>
          <p className="text-xs text-gray-300">© {new Date().getFullYear()} emlak — Eğitim amaçlı demo.</p>
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

          <h1 className="text-2xl font-bold text-gray-800">Giriş Yap</h1>
          <p className="mt-1 text-sm text-gray-500">Hesabına erişmek için bilgilerini gir.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
            )}

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
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-600">Şifre</label>
                <Link href="/authentication/reset-password/cover/" className="text-xs font-medium text-yellow-600 hover:underline">
                  Şifremi unuttum
                </Link>
              </div>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-10 text-sm outline-none focus:border-yellow-400"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
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
              {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Hesabın yok mu?{" "}
            <Link href={`/register?redirect=${encodeURIComponent(redirect)}`} className="font-semibold text-blue-600 hover:underline">
              Üye Ol
            </Link>
          </p>
          <p className="mt-2 text-center text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-700">← Anasayfaya dön</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
