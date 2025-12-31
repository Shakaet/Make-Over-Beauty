import { CheckmarkIcon } from "react-hot-toast"

const reviews = [
    {
        name: "Sarah M.",
        text:
            "I'm blown away by the quality and style of the clothes I received from Shopco.",
    },
    {
        name: "Alex K.",
        text:
            "Finding clothes that align with my personal style used to be a challenge.",
    },
    {
        name: "James L.",
        text:
            "As someone who's always on the lookout for unique fashion pieces.",
    },
    {
        name: "James M.",
        text:
            "Excellent service and premium quality. Highly recommended!",
    },
]

const HappyCustomers = () => {
    return (
        <section className="bg-[var(--blush)] py-16 ">
            <div className=" mx-auto px-7 md:px-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl  md:text-4xl font-bold text-gray-800">
                        OUR HAPPY CUSTOMERS
                    </h2>
                    <div className="flex gap-2 text-pink-500 text-xl">
                        ← →
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {reviews.map((r, i) => (
                        <div
                            key={i}
                            className="border border-pink-300 rounded-xl p-6 bg-[var(--blush)]"
                        >
                            <div className="text-yellow-400 mb-1 text-lg">★★★★★</div>
                            <h4 className="font-semibold text-pink-600 text-lg flex items-center gap-2">
                                {r.name} <span className="text-green-500 text-xs"><CheckmarkIcon /></span>
                            </h4>
                            <p className="text-base text-gray-600 mt-2">{r.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HappyCustomers
