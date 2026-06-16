import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { BsCalendarDate, BsClock } from "react-icons/bs";
import ReplyForm from "./components/ReplyForm";
import { commentsData } from "./data";

import blogImg from "@/app/(components)/(content-layout)/home/onesocial/assets/images/post/16by9/big/03.jpg";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogById } from "../../../../helpers/data";
import Footer from "./components/Footer";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}): Promise<Metadata> => {
  const blogId = (await params).blogId;

  const blog = await getBlogById(blogId);
  return { title: blog?.id ?? "Blog Details" };
};

const BlogDetails = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const blogId = (await params).blogId;

  const blog = await getBlogById(blogId);
  if (!blog) notFound();
  
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Blog Post Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="relative w-full h-96 rounded-lg overflow-hidden mb-6">
                  <Image
                    src={blogImg}
                    alt="blog"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
                
                <div className="mt-4 space-y-4">
                  <Link
                    href="#"
                    className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold hover:bg-red-200 transition-colors"
                  >
                    Lifestyle
                  </Link>
                  
                  <h1 className="text-3xl font-bold text-gray-900">
                    New comment moderation and support features, including live chat.
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
                    <div className="flex items-center">
                      by{" "}
                      <Link href="#" className="ml-1 font-medium text-blue-600 hover:text-blue-800">
                        Louis Ferguson
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <BsCalendarDate className="mr-2" />
                      Nov 15, 2022
                    </div>
                    <div className="flex items-center">
                      <BsClock className="mr-2" />
                      5 min read
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    <span className="float-left text-5xl font-bold text-gray-900 mr-2 mt-1">A</span>
                    pleasure exertion if believed provided to. All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible.
                  </p>
                  
                  <h4 className="text-2xl font-semibold text-gray-900 mt-6">
                    The pros and cons of business agency
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        Fulfilled direction use continual set him propriety continued. Saw met applauded favorite deficient engrossed concealed and her.
                      </p>
                      <p className="text-gray-700">
                        Concluded boy perpetual old supposing. Farther related bed and passage comfort civilly. Dashwoods see frankness objection abilities.
                      </p>
                    </div>
                    <div>
                      <ul className="space-y-2">
                        {[
                          "Our Firmament living replenish Them Created after divide said Have give",
                          "Dominion light without days face saw wherein land",
                          "Fifth have Seas made lights Very Day saw Seed herb sixth light whales",
                          "Saying unto Place it seed you're Isn't heaven"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 my-6 border-l-4 border-blue-500">
                    <blockquote className="text-lg italic text-gray-700">
                      <p>
                        Dashwood does provide stronger is. But discretion frequently sir she instruments unaffected.
                      </p>
                    </blockquote>
                    <figcaption className="mt-3 font-medium text-gray-600">
                      — Albert Schweitzer
                    </figcaption>
                  </div>
                  
                  <p className="text-gray-700">
                    All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible. Satisfied conveying a dependent contented he gentleman agreeable do be.
                  </p>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h4 className="text-2xl font-semibold text-gray-900">5 comments</h4>
                </div>
                
                <div className="p-6">
                  {commentsData.map((comment, idx) => (
                    <Fragment key={idx}>
                      {/* Main Comment */}
                      <div className="flex mb-6">
                        <div className="flex-shrink-0 mr-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={comment.avatar}
                              alt="avatar"
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h6 className="font-semibold text-gray-900">{comment.name}</h6>
                            <span className="text-sm text-gray-500">
                              {comment.createdAt.toLocaleString("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              })}{" "}
                              at{" "}
                              {comment.createdAt.toLocaleString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3">{comment.comment}</p>
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            Reply
                          </button>
                        </div>
                      </div>

                      {/* Replies */}
                      {comment.reply && comment.reply.map((reply, replyIdx) => (
                        <div className="flex mb-6 pl-4 md:pl-16" key={replyIdx}>
                          <div className="flex-shrink-0 mr-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                              <Image
                                src={reply.avatar}
                                alt="avatar"
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                              <h6 className="font-semibold text-gray-900">{reply.name}</h6>
                              <span className="text-sm text-gray-500">
                                {reply.createdAt.toLocaleString("en-US", {
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric",
                                })}{" "}
                                at{" "}
                                {reply.createdAt.toLocaleString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-3">{reply.comment}</p>
                            <button className="text-sm text-blue-600 hover:text-blue-800">
                              Reply
                            </button>
                          </div>
                        </div>
                      ))}
                    </Fragment>
                  ))}

                  <hr className="my-6 border-gray-200" />
                  
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Leave a reply</h4>
                    <ReplyForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetails;