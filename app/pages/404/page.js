import React from 'react'
import Heading from '../../component/Heading'

const Page = () => {
  return (
    <div>
      <Heading title="404" breadcrumb={['Home', 'Pages', '404']} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-black/80 text-center">
        <h3 className="text-2xl font-semibold mb-2">Page Not Found</h3>
        <p>The page you’re looking for does not exist.</p>
      </div>
    </div>
  )
}

export default Page


