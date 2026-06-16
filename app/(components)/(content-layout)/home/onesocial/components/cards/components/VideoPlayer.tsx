'use client'
import dynamic from 'next/dynamic'
const Plyr = dynamic(() => import('plyr-react'))

import 'plyr-react/plyr.css'

const VideoPlayer = () => {
  return (
    <div className="overflow-hidden w-full">
      <Plyr
        crossOrigin="anonymous"
        controls
        source={{
          type: 'video',
          poster: '/videos/poster.jpg',
          sources: [{ src: '/videos/video-feed.mp4' }],
        }}
      />
    </div>
  )
}
export default VideoPlayer