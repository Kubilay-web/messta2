
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface SpkTimelineProps {
    avatar?: string;
    title?: string;
    titleClass?: string;
    description?: string;
    timestamp?: string;
    media?: string[];
    sharedWith?: string[];
    desClass?: string;
    SpanContent?: string;
    color?: string;
    imgclass?: string;
    Textafter?: boolean;
    avatartext?: boolean;
}

const SpkprojectTimeline: React.FC<SpkTimelineProps> = ({
    avatar,
    titleClass = '',
    title = '',
    description = '',
    desClass = '',
    imgclass = "",
    timestamp,
    Textafter = false,
    avatartext = false,
    media = [],
    sharedWith = [],
    SpanContent,
    color = ''
}) => {
    // Hydration-safe check (client-side only content can go here)
    if (typeof window !== 'undefined') {
        // You can safely run client-specific logic here, like interacting with the DOM
    }

    return (
        <li>
            <div>
                <span className="avatar avatar-sm shadow-sm avatar-rounded profile-timeline-avatar">
                    {avatar ? (
                        <Image fill src={avatar} alt="Avatar" />
                    ) : SpanContent ? (
                        <span className={`avatar avatar-sm shadow-sm  bg-${color}/[0.15] text-${color}  avatar-rounded profile-timeline-avatar`}>
                            {SpanContent}
                        </span>
                    ) : null}
                </span>

                <div className={`mb-2 ${titleClass}`}>
                    <span className="font-medium" dangerouslySetInnerHTML={{ __html: title }} />
                    {timestamp && (
                        <span className="float-end text-[0.6875rem] text-textmuted dark:text-textmuted/50">{timestamp}</span>
                    )}
                </div>

                {description && (
                    <p className={`text-textmuted dark:text-textmuted/50 mb-0 ${desClass}`}>{description}</p>
                )}

                {media.length > 0 && (
                    <div className={`profile-activity-media mb-0 ${imgclass}`}>
                        {media.map((src, index) => (
                            <Link className='relative' scroll={false} key={index} href="#!">
                                <Image fill src={src} alt={`Media ${index}`} />
                            </Link>
                        ))}
                        {Textafter && (
                            <span className="text-[11px] text-textmuted dark:text-textmuted/50">512.34KB</span>
                        )}
                    </div>
                )}

                {sharedWith.length > 0 && (
                    <div className="avatar-list-stacked mt-1">
                        {sharedWith.map((src, index) => (
                            <span key={index} className="avatar avatar-sm avatar-rounded">
                                <Image fill src={src} alt="Shared Avatar" />
                            </span>
                        ))}
                        {avatartext && "4 People reacted"}
                    </div>
                )}
            </div>
        </li>
    );
};

export default SpkprojectTimeline;
