
import Image from 'next/image';
import React, { Fragment } from 'react'
interface SpklandingTestimonialsProps {
    object?: any;
}

const SpklandingTestimonials: React.FC<SpklandingTestimonialsProps> = ({ object }) => {
    return (
        <Fragment>
            <div className="box featured-card-1">
                <div className="box-body !p-6">
                    <span className="review-quote">
                        <i className="bi bi-quote"></i>
                    </span>
                    <span className="review-quote">
                        <i className="bi bi-quote"></i>
                    </span>
                    <div className="flex mb-2 items-center">
                        <span className="avatar avatar-lg avatar-rounded me-2">
                            <Image fill src={object.src} alt="" />
                        </span>
                        <div>
                            <p className="mb-0 font-semibold text-[1rem] text-primary">{object.name}</p>
                            <p className="text-[0.625rem] mb-0 font-semibold text-textmuted dark:text-textmuted/50">{object.role}  </p>
                        </div>
                    </div>
                    <span>{object.text}</span>
                </div>
            </div>
        </Fragment>
    )
}
export default SpklandingTestimonials
