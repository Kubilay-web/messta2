import { getAllCelebrations } from '../../../../../helpers/data'
import { Fragment } from 'react'
import CelebrationCard from './CelebrationCard'

const Celebrations = async () => {
  const allCelebrations = await getAllCelebrations()
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Celebration</h1>
      </div>
      
      {/* Card Body */}
      <div className="p-6">
        {allCelebrations.slice(0, 5).map((celebration, idx) => (
          <Fragment key={idx}>
            <CelebrationCard celebration={celebration} />
            {allCelebrations.slice(0, 5).length - 1 !== idx && (
              <hr className="my-4 border-gray-200 dark:border-gray-700" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default Celebrations