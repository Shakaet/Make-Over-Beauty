import { Play } from "lucide-react"

const videos = [
    { link: "https://youtube.com/shorts/26AnmVvUGgk?si=GImic5PwKq9uqgb1" },
    { link: "https://youtube.com/shorts/U9ShAcDqug0?si=-fyCF-mLyMAxspC9" },
    { link: "https://youtube.com/shorts/aJLSyZLUNBs?si=ylyUc8EKf94AsmGm" },
    { link: "https://youtube.com/shorts/RkPo1sSwCBc?si=loD-H0n3CNV0MC9p" },
]

const getYoutubeId = (url) => {
    const match = url.match(/(?:shorts\/|v=)([^?&]+)/)
    return match ? match[1] : null
}

const LiveVideos = () => {
    return (
        <section className="bg-[var(--blush)] py-16">
            <div className="mx-auto px-10 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                {videos.map((v, i) => {
                    const videoId = getYoutubeId(v.link)
                    const thumbnail = videoId
                        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                        : ""

                    return (
                        <a
                            key={i}
                            href={v.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative rounded-2xl overflow-hidden shadow-lg group"
                        >
                            <img
                                src={thumbnail}
                                alt="Live Video"
                                className="w-full h-[360px] object-cover group-hover:scale-105 transition"
                            />

                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <span className="bg-[var(--pink)] p-3 rounded-full text-white shadow-lg">
                                    <Play size={18} />
                                </span>
                            </div>
                        </a>
                    )
                })}
            </div>
        </section>
    )
}

export default LiveVideos
