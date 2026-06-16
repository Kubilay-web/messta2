'use client'
import dynamic from 'next/dynamic'
const Plyr = dynamic(() => import('plyr-react'))
import 'plyr-react/plyr.css'

const VideoPlayer = () => {
  const plyrConfig = {
    source: {
      type: 'video',
      poster: '/videos/poster.jpg',
      sources: [
        { 
          src: '/videos/video-feed.mp4',
          type: 'video/mp4'
        }
      ],
    },
    options: {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume',
        'settings',
        'pip',
        'airplay',
        'fullscreen'
      ],
      settings: ['quality', 'speed'],
      keyboard: { focused: true, global: true },
      tooltips: { controls: true, seek: true },
      autoplay: false,
      clickToPlay: true,
      disableContextMenu: true,
      hideControls: true,
      resetOnEnd: false,
      ratio: '16:9'
    }
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
      <Plyr
        crossOrigin="anonymous"
        source={plyrConfig.source}
        options={plyrConfig.options}
        className="w-full aspect-video"
      />
      
      {/* Custom overlay (optional) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-20"></div>
      </div>
    </div>
  )
}

export default VideoPlayer