"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { ImGit } from "react-icons/im";

// Type definitions for dummy data
type NavLink = {
  name: string;
  href: string;
};

type Stat = {
  value: string;
  label: string;
};

type NewsItem = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type Event = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: {
    day: string;
    month: string;
  };
  time: string;
  location: string;
};

type FooterLink = {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
};

type SocialLink = {
  name: string;
  href: string;
};

// Dummy data arrays
const navLinks: NavLink[] = [
  { name: "About ABC", href: "#about" },
  { name: "Admissions", href: "#admissions" },
  { name: "Academics", href: "#academics" },
  { name: "Infrastructure", href: "#infrastructure" },
  { name: "Gallery", href: "#gallery" },
  { name: "News", href: "#news" },
  { name: "Contact", href: "#contact" },
];

const stats: Stat[] = [
  { value: "2100+", label: "Students" },
  { value: "95%", label: "Sports" },
  { value: "235+", label: "Staffs" },
  { value: "100%", label: "Discipline" },
];

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Our Student Have sit amet egestas",
    description:
      "Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Et tortor consectetuer.",
    image: "/news1.jpg",
  },
  {
    id: 2,
    title: "Our Student Have sit amet egestas",
    description:
      "Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Et tortor consectetuer.",
    image: "/news2.jpg",
  },
  {
    id: 3,
    title: "Our Student Have sit amet egestas",
    description:
      "Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Et tortor consectetuer.",
    image: "/news3.jpg",
  },
];

const events: Event[] = [
  {
    id: 1,
    title: "Mindfulness Meditation",
    description:
      "A weekly breathing meditation session led by counselors to help students learn mindfulness.",
    image: "/event1.jpg",
    date: { day: "12", month: "DEC" },
    time: "09:30 am - 3:30 pm",
    location: "Main Hall",
  },
  {
    id: 2,
    title: "Concert Series presents Eric",
    description:
      "A weekly breathing meditation session led by counselors to help students learn mindfulness.",
    image: "/event2.jpg",
    date: { day: "15", month: "DEC" },
    time: "10:30 am - 1:00 pm",
    location: "Event Hall",
  },
  {
    id: 3,
    title: "Book Workshop",
    description:
      "A weekly breathing meditation session led by counselors to help students learn mindfulness.",
    image: "/event3.jpg",
    date: { day: "19", month: "DEC" },
    time: "10:30 am - 1:00 pm",
    location: "B-Block",
  },
];

const footerLinks: FooterLink[] = [
  {
    title: "About Us",
    links: [
      { name: "Overview", href: "#" },
      { name: "Admissions", href: "#" },
      { name: "Academics", href: "#" },
      { name: "Infrastructure", href: "#" },
      { name: "Gallery", href: "#" },
      { name: "News", href: "#" },
    ],
  },
  {
    title: "Admin",
    links: [
      { name: "Calendar", href: "#" },
      { name: "Portal Login", href: "#" },
      { name: "Email Login", href: "#" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  { name: "Facebook", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "Instagram", href: "#" },
];

const DemoPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-emerald-600"></div>
            <span className="text-lg font-semibold text-emerald-700">
              ABC Matric High School
            </span>
          </div>

          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <button className="text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-emerald-600">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                ABC School debuts for arts, discovery, and connections.
              </h1>
              <p className="text-emerald-50 mb-6">
                The ABC School is rooted in the belief that every student should
                be challenged, engaged, and supported in a learning environment
                that places no limits on what they can achieve.
              </p>
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50">
                Learn more
              </Button>
            </div>
            <div className="relative h-64 md:h-80 lg:h-96">
              <div className="relative h-full w-full">
                <img
                  src="/api/placeholder/600/400"
                  alt="Students in classroom"
                  className="rounded-lg object-cover"
                
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden h-64 md:h-80">
              <Image
                src="/api/placeholder/500/400"
                alt="Classroom"
                className="object-cover"
                fill
              />
              <div className="absolute bottom-4 left-4 flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 rounded-full p-0"
                >
                  &lt;
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 rounded-full p-0"
                >
                  &gt;
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">About Our School</h2>
              <p className="text-gray-600 mb-4">
                ABC Institution offers courses of study that are on the
                frontiers of knowledge and it connects the spiritual and
                practical dimensions of intellectual life.
              </p>
              <p className="text-gray-600 mb-8">
                School for Advanced Studies is committed to a comprehensive
                academic and cultural program which prompts its community to
                become ethical, global consciousness.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-white rounded-lg shadow-sm"
                  >
                    <h3 className="text-2xl font-bold text-emerald-600 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Headmaster's Quote Section */}
      <section className="py-12 bg-yellow-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="bg-teal-700 p-4 rounded-lg md:col-span-1">
              <div className="relative h-60 w-full rounded-lg overflow-hidden">
                <Image
                  src="/api/placeholder/300/400"
                  alt="Headmaster"
                  className="object-cover"
                  fill
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-4">
                Build your legacy without changing your style.
              </h2>
              <p className="text-lg">
                Create digital products and impact the lives of many, without
                compromising who you are, your principles or values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">School News & Updates</h2>
            <Link href="#" className="text-emerald-600 hover:text-emerald-700">
              View all news →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      item.image !== ""
                        ? item.image
                        : "/api/placeholder/400/300"
                    }
                    alt={item.title}
                    className="object-cover"
                    fill
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Link
                    href="#"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Read more
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Section */}
      <section id="admissions" className="bg-emerald-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
              <Image
                src="/api/placeholder/500/400"
                alt="Student writing"
                className="object-cover"
                fill
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Apply for Admission</h2>
              <p className="text-xl mb-4">Fall applications are now open</p>
              <p className="mb-6">
                We don't just give students an education and experiences that
                set them up for success in a career. We help them succeed in
                their career and in life.
              </p>
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link href="#" className="text-emerald-600 hover:text-emerald-700">
              View all events →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      event.image !== ""
                        ? event.image
                        : "/api/placeholder/400/300"
                    }
                    alt={event.title}
                    className="object-cover"
                    fill
                  />
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white p-2 rounded text-center w-12">
                    <span className="text-lg font-bold block">
                      {event.date.day}
                    </span>
                    <span className="text-xs">{event.date.month}</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-emerald-600 py-12 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 max-w-2xl mx-auto">
            Get ABC Newsletter delivered straight to your inbox.
          </h2>
          <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white text-gray-900"
            />
            <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-300">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 pt-16 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-emerald-600"></div>
                <span className="text-lg font-semibold text-emerald-700">
                  ABC School
                </span>
              </div>
              <div className="text-gray-600 space-y-1">
                <p>Box 34590</p>
                <p>4828 Township Lane</p>
                <p>Seattle, WA 98101-5948</p>
                <p>Division 1</p>
                <div className="pt-4 space-y-1">
                  <p className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    030-0980456321
                  </p>
                  <p className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    abc../..school.org
                  </p>
                </div>
              </div>
            </div>

            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-emerald-600"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
              <ul className="space-y-2">
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-emerald-600"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>© 2023 ABC School. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-emerald-600">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-emerald-600">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DemoPage;
