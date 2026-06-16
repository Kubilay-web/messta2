'use client'
import dynamic from 'next/dynamic'
const Plyr = dynamic(() => import('plyr-react'))

import 'plyr-react/plyr.css'

const VideoPlayer = () => {
  return (
    <div className="relative w-full rounded-xl overflow-hidden">
      <Plyr
        crossOrigin="anonymous"
        controls
        source={{
          type: 'video',
          poster: '/videos/poster.jpg',
          sources: [{ src: '/videos/video-feed.mp4' }],
        }}
        options={{
          ratio: '16:9',
          fullscreen: { enabled: true, fallback: true, iosNative: false },
          keyboard: { focused: true, global: false },
          tooltips: { controls: true, seek: true },
          autoplay: false,
        }}
      />
    </div>
  )
}

export default VideoPlayer