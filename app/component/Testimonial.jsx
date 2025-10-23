import React from 'react'

const DEFAULT_VIDEOS = [
  'https://videos.pexels.com/video-files/4154241/4154241-uhd_4096_2160_25fps.mp4',
  'https://videos.pexels.com/video-files/3886376/3886376-uhd_4096_2160_25fps.mp4',
  'https://videos.pexels.com/video-files/3181791/3181791-uhd_3840_2160_25fps.mp4',
]
  
  

const Testimonial = ({ title, des, videos }) => {
  return (
    <section className=" py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest text-gray-600 mb-3">{title}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{des}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {(videos?.length ? videos : DEFAULT_VIDEOS).map((src, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-xl ring-1 ring-black/5 bg-black/10">
              {/* 16:9 responsive box */}
              <div className="relative w-full pt-[56.25%]">
                <video
                  suppressHydrationWarning
                  src={src}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial