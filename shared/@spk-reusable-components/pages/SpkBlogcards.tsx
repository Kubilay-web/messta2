
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react'

const SpkBlogcards = ({ card }: any) => {
    return (
        <Fragment>
            <div className="box">
                <Link className='relative' scroll={false} href="#!">
                    <Image fill src={card.imageSrc} className="card-img-top w-full" alt={card.title} />
                </Link>
                <div className="box-body">
                    <Link scroll={false} href="/pages/blog/blog-details/" className="h6 font-semibold mb-2 block lh-base">
                        {card.title}
                    </Link>
                    <p className="mb-4">
                        {card.description}
                        <Link scroll={false} href="#!" className="font-medium text-textmuted dark:text-textmuted/50 ms-2 align-middle text-[0.75rem] text-Augoration-underline">
                            Read More ?
                        </Link>
                    </p>
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex items-center">
                            <div className="avatar avatar-xs avatar-rounded relative me-2">
                                <Image fill src={card.authorImg} alt={card.author} />
                            </div>
                            <div>
                                <p className="mb-0 font-medium">{card.author}</p>
                            </div>
                        </div>
                        <span className="text-textmuted dark:text-textmuted/50 text-[0.75rem] mb-0">{card.date}</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SpkBlogcards