'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type StoryItem = {
  id: string
  src: string
  type: string
  preview?: string
  length: number
  text?: string
  link: string
  linkText: boolean
  time: number
  isViewed?: boolean
  onView?: () => void
}

type Story = {
  id: string
  name: string
  photo: string
  time: number
  items: StoryItem[]
}

type StoryComponentProps = {
  stories: Story[]
  onStoryView?: (storyId: string) => void
}

const StoryComponent = ({ stories, onStoryView }: StoryComponentProps) => {
  const [currentStory, setCurrentStory] = useState<Story | null>(null)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const router = useRouter()

  // Story açma fonksiyonu
  const openStory = (story: Story, itemIndex = 0) => {
    setCurrentStory(story)
    setCurrentItemIndex(itemIndex)
    setProgress(0)
    setIsPlaying(true)
    
    // Story görüntülendi olarak işaretle
    if (onStoryView && story.items[itemIndex]?.onView) {
      story.items[itemIndex].onView()
    }
  }

  // Story kapatma fonksiyonu
  const closeStory = () => {
    setCurrentStory(null)
    setCurrentItemIndex(0)
    setProgress(0)
    setIsPlaying(false)
  }

  // Sonraki story/item'a geç
  const nextStory = () => {
    if (!currentStory) return

    const currentStoryIndex = stories.findIndex(s => s.id === currentStory.id)
    const nextItemIndex = currentItemIndex + 1

    if (nextItemIndex < currentStory.items.length) {
      // Aynı story'nin sonraki item'ına geç
      setCurrentItemIndex(nextItemIndex)
      setProgress(0)
      if (onStoryView && currentStory.items[nextItemIndex]?.onView) {
        currentStory.items[nextItemIndex].onView()
      }
    } else {
      // Sonraki story'ye geç
      const nextStoryIndex = currentStoryIndex + 1
      if (nextStoryIndex < stories.length) {
        setCurrentStory(stories[nextStoryIndex])
        setCurrentItemIndex(0)
        setProgress(0)
        if (onStoryView && stories[nextStoryIndex].items[0]?.onView) {
          stories[nextStoryIndex].items[0].onView()
        }
      } else {
        // Son story'deysek kapat
        closeStory()
      }
    }
  }

  // Önceki story/item'a geç
  const prevStory = () => {
    if (!currentStory) return

    const currentStoryIndex = stories.findIndex(s => s.id === currentStory.id)
    const prevItemIndex = currentItemIndex - 1

    if (prevItemIndex >= 0) {
      // Aynı story'nin önceki item'ına geç
      setCurrentItemIndex(prevItemIndex)
      setProgress(0)
    } else {
      // Önceki story'ye geç
      const prevStoryIndex = currentStoryIndex - 1
      if (prevStoryIndex >= 0) {
        setCurrentStory(stories[prevStoryIndex])
        setCurrentItemIndex(stories[prevStoryIndex].items.length - 1)
        setProgress(0)
        if (onStoryView && stories[prevStoryIndex].items[0]?.onView) {
          stories[prevStoryIndex].items[0].onView()
        }
      }
    }
  }

  // Progress bar animasyonu
  useEffect(() => {
    if (!currentStory || !isPlaying) return

    const currentItem = currentStory.items[currentItemIndex]
    if (!currentItem) return

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          nextStory()
          return 0
        }
        return prev + (100 / (currentItem.length * 10)) // Her saniye için 10 birim
      })
    }, 100)

    return () => clearInterval(interval)
  }, [currentStory, currentItemIndex, isPlaying])

  // Klavye kontrolleri
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentStory) return

      switch (e.key) {
        case 'Escape':
          closeStory()
          break
        case 'ArrowRight':
          nextStory()
          break
        case 'ArrowLeft':
          prevStory()
          break
        case ' ':
          setIsPlaying(prev => !prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStory])

  const currentItem = currentStory?.items[currentItemIndex]

  return (
    <>
      {/* Story List */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {stories.map((story) => {
          const firstItem = story.items[0]
          const hasUnviewed = story.items.some(item => !item.isViewed)
          
          return (
            <div
              key={story.id}
              className="relative cursor-pointer group"
              onClick={() => openStory(story, 0)}
            >
              <div className="w-[120px] h-[150px] rounded-lg overflow-hidden relative">
                {/* Story görseli */}
                <Image
                  src={firstItem.preview || firstItem.src || '/default-story.jpg'}
                  alt={story.name}
                  width={120}
                  height={150}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Kullanıcı avatarı */}
                <div className="absolute top-3 left-3">
                  <div className={`w-10 h-10 rounded-full border-2 ${hasUnviewed ? 'border-blue-500' : 'border-gray-300'} overflow-hidden`}>
                    <Image
                      src={story.photo}
                      alt={story.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Kullanıcı adı */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-semibold truncate">
                    {story.name}
                  </p>
                </div>
                
                {/* Görülmemiş story işareti */}
                {hasUnviewed && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-blue-500 rounded-full" />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Story Viewer Modal */}
      {currentStory && currentItem && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
            {currentStory.items.map((item, index) => (
              <div
                key={item.id}
                className="h-1 flex-1 bg-gray-600 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full ${index === currentItemIndex ? 'bg-white' : index < currentItemIndex ? 'bg-white' : 'bg-gray-400'}`}
                  style={{
                    width: index === currentItemIndex ? `${progress}%` : index < currentItemIndex ? '100%' : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={closeStory}
            className="absolute top-4 right-4 z-10 text-white text-2xl"
          >
            ×
          </button>

          {/* Play/Pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-14 right-4 z-10 text-white p-2"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          {/* Story content */}
          <div className="h-full flex items-center justify-center">
            {currentItem.type === 'video' ? (
              <video
                src={currentItem.src}
                className="max-h-full max-w-full"
                autoPlay
                controls
                onEnded={nextStory}
              />
            ) : (
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src={currentItem.src || '/default-story.jpg'}
                  alt="Story"
                  width={800}
                  height={800}
                  className="max-h-full max-w-full object-contain"
                />
                {currentItem.text && (
                  <div className="absolute bottom-20 left-0 right-0 text-center">
                    <p className="text-white text-xl font-semibold bg-black/50 p-4 rounded-lg mx-4">
                      {currentItem.text}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevStory}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl p-2"
          >
            ←
          </button>
          <button
            onClick={nextStory}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl p-2"
          >
            →
          </button>

          {/* User info */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image
                src={currentStory.photo}
                alt={currentStory.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-white font-semibold">{currentStory.name}</p>
              <p className="text-gray-300 text-sm">
                {new Date(currentItem.time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StoryComponent