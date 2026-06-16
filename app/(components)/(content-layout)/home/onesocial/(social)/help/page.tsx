import { popularArticles, recommendedTopics, type ArticleType, type TopicType } from './data'
import { FaAngleRight, FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import Link from 'next/link'
import LoadMoreButton from './components/LoadMoreButton'


const PopularQuestions = () => {
  const popularQuestions = [
    'How can we help?',
    'How to edit my Profile?',
    'How much should I offer the sellers?',
    'Installation Guide?',
    'Additional Options and Services?',
    "What's are the difference between a social?",
    'View all question',
  ]

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 text-center">
        <h4 className="text-xl font-semibold text-gray-900">Popular questions</h4>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {popularQuestions.map((question, idx) => (
          <Link
            href="/help/details"
            key={idx}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-light text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            {question}
          </Link>
        ))}
        <button className="rounded-full bg-blue-50 px-4 py-2 text-sm font-light text-blue-600 transition-colors hover:bg-blue-100">
          View all question
        </button>
      </div>
    </div>
  )
}

const TopicCard = ({ topic }: { topic: TopicType }) => {
  const { features, icon: Icon, title, variant } = topic
  
  const variantColors: Record<string, string> = {
    primary: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    info: 'text-cyan-600',
    secondary: 'text-gray-600',
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-6 pb-0">
        <Icon className={`h-12 w-12 ${variantColors[variant] || variantColors.primary}`} />
        <h3 className="mt-3 text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="flex-1 p-6">
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx}>
              <Link
                href="/help/details"
                className="group flex items-center text-gray-600 hover:text-gray-900"
              >
                <FaAngleRight className="mr-3 h-5 w-5 text-blue-500 transition-transform group-hover:translate-x-1" />
                <span className="text-sm">{feature}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const ArticleCard = ({ description, title, id }: ArticleType) => {
  const upVotes = Math.floor(Math.random() * (700 - 200) + 200)
  const downVotes = Math.floor(Math.random() * 10)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between md:flex-row md:items-start">
        <div className="mb-4 md:mb-0 md:mr-6">
          <h5 className="mb-2 text-lg font-medium text-gray-900">
            <Link href="#" className="hover:text-blue-600">
              {title}
            </Link>
          </h5>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <label className="flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
            <input
              type="radio"
              name={`article${id}`}
              className="sr-only"
              defaultChecked
            />
            <FaThumbsUp className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{upVotes}</span>
          </label>
          <label className="flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
            <input
              type="radio"
              name={`article${id}`}
              className="sr-only"
            />
            <span className="text-gray-700">{downVotes.toString().padStart(2, '0')}</span>
            <FaThumbsDown className="ml-2 h-4 w-4 text-gray-500" />
          </label>
        </div>
      </div>
    </div>
  )
}

const Help = () => {
  return (
    <>
      <div className="mb-8">
        <PopularQuestions />
      </div>
      
      <div className="py-8">
        <h4 className="mb-8 text-center text-2xl font-semibold text-gray-900">
          Recommended topics
        </h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendedTopics.map((topic, idx) => (
            <TopicCard topic={topic} key={idx} />
          ))}
        </div>
      </div>
      
      <div className="pb-8">
        <h4 className="mb-8 text-center text-2xl font-semibold text-gray-900">
          Popular articles
        </h4>
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {popularArticles.map((article, idx) => (
              <ArticleCard {...article} key={idx} />
            ))}
            <div className="pt-4 text-center">
              <LoadMoreButton />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Help