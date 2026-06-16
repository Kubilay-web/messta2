import Footer from './components/Footer'
import CookieAlert from './components/CookieAlert'
import Link from 'next/link'

const PrivacyAndTerms = () => {
  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Card Container */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Card Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Privacy & terms</h1>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Your privacy matters</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Started several mistake joy say painful removed reached end. State burst{' '}
                  <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                    think end are its.
                  </Link>{' '}
                  Arrived off she elderly beloved him affixed noisier yet.
                </p>

                <hr className="my-6 border-gray-300 dark:border-gray-700" />

                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Table of Contents</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Age she way earnestly the fulfilled extremely.</p>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li>Post no so what deal evil rent by real in.</li>
                  <li>But her ready least set lived spite solid.</li>
                  <li>
                    Sex lasted dinner wanted <strong className="font-semibold">indeed wished outlaw.</strong>
                  </li>
                  <li>Affronting imprudence do he he everything.</li>
                </ol>

                <hr className="my-6 border-gray-300 dark:border-gray-700" />

                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Introduction</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  As it so contrasted oh estimating instrument. Size like body someone had. Are conduct{' '}
                  <mark className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">viewing boy minutes warrant the expense?</mark> Tolerably behavior
                  may admit daughters offending her ask own. Praise effect wishes change way and any wanted.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  State burst think end are its.{' '}
                  <u className="underline decoration-gray-400">Arrived off she elderly beloved himaf fixed noisier yet.</u> Course regard to up he
                  hardly. View four has said do men saw find dear shy. Talent men wicket add garden.
                </p>

                <hr className="my-6 border-gray-300 dark:border-gray-700" />

                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Services</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Existence certainly explained how improving the household pretended. Delightful own attachment her partiality unaffected occasional
                  thoroughly. Adieus it no wonders spirit houses.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 dark:text-yellow-200">This website stores cookies on your computer.</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Started several mistake joy say painful removed reached end.{' '}
                  <em className="italic">
                    State burst think end are its. Arrived off she elderly beloved him affixed noisier yet. Course regard to up he hardly. View four
                    has said do men saw find dear shy.
                  </em>{' '}
                  Talent men wicket add garden.
                </p>

                <hr className="my-6 border-gray-300 dark:border-gray-700" />

                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Messages</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  As young ye hopes no he place means. Partiality diminution gay yet entreaties admiration.{' '}
                  <strong className="font-semibold text-gray-700 dark:text-gray-300">In mention perhaps attempt pointed suppose.</strong> Unknown ye
                  chamber of warrant of Norland arrived.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li>Size like body someone had.</li>
                  <li>Are conduct viewing boy minutes warrant the expense.</li>
                  <li>Adieus it no wonders spirit houses.</li>
                  <li>Talent men wicket add garden.</li>
                </ul>

                <hr className="my-6 border-gray-300 dark:border-gray-700" />

                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">How we use your data</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Affronting imprudence do he he everything. Sex lasted dinner wanted indeed wished outlaw.{' '}
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Far advanced settling say finished raillery.
                  </a>{' '}
                  Offered chiefly farther of my no colonel shyness. Such on help ye some door if in. Laughter proposal laughing any son law consider.
                  Needed except up piqued an.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior
                  arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CookieAlert />
    </>
  )
}

export default PrivacyAndTerms