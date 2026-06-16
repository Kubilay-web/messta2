
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';


const SpkFollowerCard = ({ card }: any) => {

	return (
		<Fragment>

			<div className="box">
				<div className="box-body contact-action">
					<div className="contact-overlay"></div>
					<div className="flex items-top">
						<div className="flex flex-grow flex-wrap gap-3">
							<div className="avatar avatar-xl avatar-rounded">
								<Image fill src={card.src} alt="" />
							</div>
							<div>
								<h6 className="mb-1 font-semibold">{card.name} </h6>
								<p className="mb-1 text-textmuted dark:text-textmuted/50 contact-mail truncate">{card.email}</p>
								<p className="font-semibold mb-2 text-primary">
									{card.productsCount} Products
								</p>
								{card.followback ? (
									<div className="btn-list">
										<button className="ti-btn ti-btn-sm ti-btn-light me-2">
											<i className="ri-user-add-line me-1"></i>Follow Back
										</button>
										<button className="ti-btn ti-btn-sm ti-btn-soft-danger">
											<i className="ri-close-fill me-1"></i>Cancel
										</button>
									</div>
								) : (
									<div className="btn-list">
										<button className="ti-btn ti-btn-sm ti-btn-soft-danger me-2">
											<i className="ri-user-forbid-line me-1"></i>Block
										</button>
										<button className="ti-btn ti-btn-sm ti-btn-light">
											<i className="ri-user-unfollow-line me-1"></i>Un Follow
										</button>
									</div>
								)}
							</div>
						</div>
						<div>
							<Link scroll={false} href="#!"><i
								className="ri-heart-3-line text-[1rem] text-textmuted dark:text-textmuted/50"></i></Link>
						</div>
					</div>
				</div>
			</div>

		</Fragment>
	);
}

export default SpkFollowerCard;
