
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';


const SpkLandingBlog = ({ card }: any) => {

	return (
		<Fragment>
			<div className="box ">
				<Image fill src={card.imageUrl} className="card-img-top" alt="..." />
				<div className="box-body">
					<span
						className={`badge bg-${card.bg} blog-badge absolute end-4 top-4 text-white`}>{card.badgeText}</span>
					<h5 className="font-semibold mb-1">{card.title}</h5>
					<p className="card-text mb-4">{card.description}</p>
					<Link scroll={false} className="text-primary font-semibold" href="#!">Read this post<i
						className="ri-arrow-right-s-line align-middle rtl:!rotate-180 inline-flex"></i></Link>
				</div>
			</div>
		</Fragment>
	);
}

export default SpkLandingBlog;



