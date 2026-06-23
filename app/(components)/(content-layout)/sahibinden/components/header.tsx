"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Flag from "react-world-flags";
import store from "@/shared/redux/store";
import { ThemeChanger } from "@/shared/redux/action";
import SearchBar from "./search-bar";
import { logout } from "../actions";
import type { CategoryNode } from "../data";

export interface HeaderUser {
  id: string;
  name: string;
  avatarUrl: string | null;
  isAdmin?: boolean;
}

export default function Header({
  user,
  categories,
  unread = 0,
  notifUnread = 0,
}: {
  user: HeaderUser | null;
  categories: CategoryNode[];
  unread?: number;
  notifUnread?: number;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Sidebar toggle fonksiyonu (shared header'dan kopyalandı)
  const toggleSidebar = () => {
    const theme = store.getState().reducer;
    let sidemenuType = theme.dataNavLayout;
    if (window.innerWidth >= 992) {
      if (sidemenuType === "vertical") {
        let verticalStyle = theme.dataVerticalStyle;
        const navStyle = theme.dataNavStyle;
        switch (verticalStyle) {
          case "closed":
            dispatch(ThemeChanger({ ...theme, dataNavStyle: "" }) as any);
            if (theme.toggled === "close-menu-close") {
              dispatch(ThemeChanger({ ...theme, toggled: "" }) as any);
            } else {
              dispatch(ThemeChanger({ ...theme, toggled: "close-menu-close" }) as any);
            }
            break;
          case "overlay":
            dispatch(ThemeChanger({ ...theme, dataNavStyle: "" }) as any);
            if (theme.toggled === "icon-overlay-close") {
              dispatch(ThemeChanger({ ...theme, toggled: "", iconOverlay: "" }) as any);
            } else {
              if (window.innerWidth >= 992) {
                dispatch(
                  ThemeChanger({
                    ...theme,
                    toggled: "icon-overlay-close",
                    iconOverlay: "",
                  }) as any,
                );
              }
            }
            break;
          case "icontext":
            dispatch(ThemeChanger({ ...theme, dataNavStyle: "" }) as any);
            if (theme.toggled === "icon-text-close") {
              dispatch(ThemeChanger({ ...theme, toggled: "" }) as any);
            } else {
              dispatch(ThemeChanger({ ...theme, toggled: "icon-text-close" }) as any);
            }
            break;
          case "doublemenu":
            dispatch(ThemeChanger({ ...theme, dataNavStyle: "" }) as any);
            if (theme.toggled === "double-menu-open") {
              dispatch(ThemeChanger({ ...theme, toggled: "double-menu-close" }) as any);
            } else {
              let sidemenu = document.querySelector(".side-menu__item.active");
              if (sidemenu) {
                dispatch(ThemeChanger({ ...theme, toggled: "double-menu-open" }) as any);
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add("double-menu-active");
                } else {
                  dispatch(ThemeChanger({ ...theme, toggled: "double-menu-close" }) as any);
                }
              }
            }
            break;
          case "detached":
            if (theme.toggled === "detached-close") {
              dispatch(ThemeChanger({ ...theme, toggled: "", iconOverlay: "" }) as any);
            } else {
              dispatch(
                ThemeChanger({
                  ...theme,
                  toggled: "detached-close",
                  iconOverlay: "",
                }) as any,
              );
            }
            break;
          default:
            dispatch(ThemeChanger({ ...theme, toggled: "" }) as any);
        }
      }
    } else {
      if (theme.toggled === "close") {
        dispatch(ThemeChanger({ ...theme, toggled: "open" }) as any);
      } else {
        dispatch(ThemeChanger({ ...theme, toggled: "close" }) as any);
      }
    }
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Üst şerit */}
      <div className="border-b border-gray-100 bg-gray-50 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-3 whitespace-nowrap px-3 py-1.5 text-gray-500 sm:gap-4">
          {/* Dil Seçimi — yalnız mobil (üst şerit; sm+ ana satırdaki kullanılır) */}
          <div className="header-country hs-dropdown ti-dropdown me-auto sm:!hidden [--placement:bottom-left]">
            <button
              id="dropdown-flag-mobile"
              type="button"
              className="hs-dropdown-toggle flex items-center gap-1 hover:text-gray-800"
              aria-label="Dil seçimi"
            >
              <span className="leading-none">
                <Flag code="TR" style={{ width: 18, height: 18 }} />
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <ul className="main-header-dropdown ti-dropdown-menu hs-dropdown-menu hidden !z-[60]">
              <li>
                <Link
                  scroll={false}
                  className="ti-dropdown-item flex items-center !py-[0.6rem] !px-4 !border-b dark:!border-defaultborder/10"
                  href="#!"
                >
                  <span className="avatar avatar-rounded avatar-xs leading-none me-2">
                    <Flag code="US" style={{ width: "20px", height: "20px" }} />
                  </span>
                  English
                </Link>
              </li>
              <li>
                <Link
                  scroll={false}
                  className="ti-dropdown-item flex items-center !py-[0.6rem] !px-4 dark:!border-defaultborder/10"
                  href="#!"
                >
                  <span className="avatar avatar-rounded avatar-xs leading-none me-2">
                    <Flag code="TR" style={{ width: "20px", height: "20px" }} />
                  </span>
                  Türkçe
                </Link>
              </li>
            </ul>
          </div>

          <Link href="/sahibinden/yardim" className="hidden hover:text-gray-800 sm:block">
            Yardım
          </Link>
          <Link href="/sahibinden/hesabim/favorilerim" className="hover:text-gray-800">
            Favorilerim
          </Link>
          {user && (
            <Link href="/sahibinden/hesabim/mesajlarim" className="relative hover:text-gray-800">
              Mesajlarım
              {unread > 0 && (
                <span className="absolute -right-4 -top-1 rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                  {unread}
                </span>
              )}
            </Link>
          )}
          {user && (
            <Link href="/sahibinden/hesabim/bildirimler" className="relative hover:text-gray-800" aria-label="Bildirimler">
              🔔
              {notifUnread > 0 && (
                <span className="absolute -right-3 -top-1 rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                  {notifUnread}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>

      {/* Ana satır */}
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5 sm:gap-4 lg:gap-5">
        {/* Sidebar Toggle (shared header'dan kopyalandı) */}
        <Link
          scroll={false}
          aria-label="Hide Sidebar"
          className="sidemenu-toggle animated-arrow hor-toggle horizontal-navtoggle inline-flex items-center !z-40 !me-2 sm:!me-4"
          onClick={() => toggleSidebar()}
          href="#!"
        >
          <span></span>
        </Link>

        {/* Soldan ikinci toggle (mobil kategori drawer hamburger'ı) — yorum satırına alındı */}
        {/* <button
          className="md:hidden"
          aria-label="Menü"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button> */}

        <Link href="/sahibinden" className="flex shrink-0 items-center gap-1">
          <span className="rounded bg-yellow-400 px-1.5 py-1 text-base font-extrabold leading-none text-gray-900 sm:px-2 sm:text-lg">
            sahibinden
          </span>
          <span className="hidden text-xs font-semibold text-gray-600 sm:inline">.com</span>
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBar
            categories={categories.map((c) => ({ name: c.name, slug: c.slug }))}
          />
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Dil Seçimi (shared header'dan kopyalandı) */}
          <div className="header-element header-country hs-dropdown ti-dropdown !hidden sm:!block [--placement:bottom-right] rtl:[--placement:bottom-left]">
            <button
              id="dropdown-flag"
              type="button"
              className="hs-dropdown-toggle ti-dropdown-toggle !p-0 flex-shrink-0 !border-0 !rounded-full !shadow-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="header-link-icon"
                width="32"
                height="32"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none" />
                <polygon points="136 184 216 184 176 104 136 184" opacity="0.2" />
                <path
                  d="M88,127.56A95.78,95.78,0,0,1,56,56h64a95.78,95.78,0,0,1-32,71.56Z"
                  opacity="0.2"
                />
                <polyline
                  points="231.97 216 175.97 104 119.97 216"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <line
                  x1="135.97"
                  y1="184"
                  x2="215.97"
                  y2="184"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <line
                  x1="87.97"
                  y1="32"
                  x2="87.97"
                  y2="56"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <line
                  x1="23.97"
                  y1="56"
                  x2="151.97"
                  y2="56"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <path
                  d="M120,56a96,96,0,0,1-96,96"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <path
                  d="M61.44,88A96,96,0,0,0,152,152"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
              </svg>
            </button>

            <ul className="main-header-dropdown ti-dropdown-menu hs-dropdown-menu hidden">
              <li>
                <Link
                  scroll={false}
                  className="ti-dropdown-item flex items-center bg-white !py-[0.6rem] !px-4 !border-b dark:!border-defaultborder/10"
                  href="#!"
                >
                  <span className="avatar avatar-rounded avatar-xs leading-none me-2">
                    <Flag code="US" style={{ width: "20px", height: "20px" }} />
                  </span>
                  English
                </Link>
              </li>
              <li>
                <Link
                  scroll={false}
                  className="ti-dropdown-item flex items-center !py-[0.6rem] !px-4 !border-b dark:!border-defaultborder/10"
                  href="#!"
                >
                  <span className="avatar avatar-rounded avatar-xs leading-none me-2">
                    <Flag code="TR" style={{ width: "20px", height: "20px" }} />
                  </span>
                  Türkçe
                </Link>
              </li>
            </ul>
          </div>

          {user ? (
            <div className="group relative">
              <button className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">
                {user.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatarUrl} alt="" className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-gray-900">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                )}
                <span className="hidden max-w-[100px] truncate sm:inline">{user.name}</span>
              </button>
              <div className="invisible absolute right-0 top-full z-50 w-52 rounded-lg border border-gray-100 bg-white py-1 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                <MenuLink href="/sahibinden/hesabim">Hesabım</MenuLink>
                <MenuLink href="/sahibinden/hesabim/ilanlarim">İlanlarım</MenuLink>
                <MenuLink href="/sahibinden/hesabim/favorilerim">Favorilerim</MenuLink>
                <MenuLink href="/sahibinden/hesabim/mesajlarim">Mesajlarım</MenuLink>
                <MenuLink href="/sahibinden/hesabim/magaza">Mağazam</MenuLink>
                {user.isAdmin && <MenuLink href="/sahibinden/admin">🛡️ Admin Panel</MenuLink>}
                <div className="my-1 border-t border-gray-100" />
                <form action={logout}>
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Çıkış Yap
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="shrink-0 whitespace-nowrap rounded-lg px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <span className="sm:hidden">Giriş</span>
              <span className="hidden sm:inline">Giriş / Üye Ol</span>
            </Link>
          )}

          <Link
            href="/sahibinden/ilan-ver"
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:px-4"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span className="hidden sm:inline">Ücretsiz İlan Ver</span>
            <span className="sm:hidden">İlan Ver</span>
          </Link>
        </div>
      </div>

      {/* Mobil arama */}
      <div className="px-3 pb-2.5 md:hidden">
        <SearchBar categories={categories.map((c) => ({ name: c.name, slug: c.slug }))} />
      </div>

      {/* Kategori şeridi (desktop, mega menü) */}
      <nav className="hidden border-t border-gray-100 bg-white md:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-1 px-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="relative"
              onMouseEnter={() => setOpenCat(cat.id)}
              onMouseLeave={() => setOpenCat(null)}
            >
              <Link
                href={`/sahibinden/kategori/${cat.slug}`}
                className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-yellow-600"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
              {openCat === cat.id && cat.children.length > 0 && (
                <div className="absolute left-0 top-full z-50 w-64 rounded-b-lg border border-gray-100 bg-white py-2 shadow-xl">
                  {cat.children.map((sub) => (
                    <div key={sub.id} className="px-2 py-1">
                      <Link
                        href={`/sahibinden/kategori/${sub.slug}`}
                        className="block px-2 py-1 text-sm font-semibold text-gray-800 hover:text-yellow-600"
                      >
                        {sub.name}
                      </Link>
                      {sub.children.map((leaf) => (
                        <Link
                          key={leaf.id}
                          href={`/sahibinden/kategori/${leaf.slug}`}
                          className="block px-4 py-1 text-xs text-gray-500 hover:text-yellow-600"
                        >
                          {leaf.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobil menü drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute left-0 top-0 h-full w-[80vw] max-w-xs overflow-y-auto bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-bold text-gray-800">Kategoriler</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Kapat">
                ✕
              </button>
            </div>
            {categories.map((cat) => (
              <details key={cat.id} className="border-b border-gray-100 py-1">
                <summary className="flex cursor-pointer items-center gap-2 py-2 text-sm font-medium text-gray-700">
                  <span>{cat.icon}</span> {cat.name}
                </summary>
                <div className="pb-2 pl-6">
                  {cat.children.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/sahibinden/kategori/${sub.slug}`}
                      className="block py-1 text-sm text-gray-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function MenuLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
      {children}
    </Link>
  );
}
