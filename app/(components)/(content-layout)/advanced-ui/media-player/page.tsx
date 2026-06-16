"use client";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { FC, Fragment } from "react";
import ReactAudioPlayer from 'react-audio-player';
import dynamic from "next/dynamic";
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

interface MediaPlayerProps { }

const MediaPlayer: FC<MediaPlayerProps> = () => {
    interface VideoSource {
        src: string;
        type: string;
      }

    const videoSources: VideoSource[] = [
        {
          src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
          type: 'video/mp4',
        },
        {
          src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
          type: 'video/mp4',
        },
        {
          src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
          type: 'video/mp4',
        },
      ];
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Media Player" />
            <Pageheader Heading="Media Player" breadcrumbs={['Advanced Ui']} currentpage="Media Player" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                VIDEO PLAYER
                            </div>
                        </div>
                        <div className="box-body">
                        <Plyr
                                source={{
                                type: 'video',
                                sources: videoSources,
                                poster: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg", // Poster image
                                }}
                                    id="player"
                        />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-header">
                            <div className="box-title">YOUTUBE VIDEO</div>
                        </div>
                        <div className="box-body">
                            <div className="plyr__video-embed" id="player1">
                                <iframe width="100%" height="340" src="https://www.youtube.com/embed/-lDlbQ7DiCI?si=EerYCepJFDTb5xOl" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                AUDIO PLAYER
                            </div>
                        </div>
                        <div className="box-body audio-control">
                            <ReactAudioPlayer id="player2" className="w-full" src="../../assets/audio/perfect-beauty.mp3" autoPlay controls />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default MediaPlayer;