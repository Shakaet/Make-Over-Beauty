import { Truck, BadgeCheck, RefreshCcw, Phone } from "lucide-react"

const items = [
    { icon: Truck, title: "Free Shipping", desc: "সারা দেশে হোম ডেলিভারি" },
    { icon: RefreshCcw, title: "Money-back", desc: "১০০% মানি ব্যাক গ্যারান্টি" },
    { icon: BadgeCheck, title: "100% Authentic", desc: "অরিজিনাল প্রোডাক্ট" },
    { icon: Phone, title: "24/7 Support", desc: "সার্বক্ষণিক সাপোর্ট" },
]

const WhyChooseUs = () => {
    return (
        <section className="bg-[var(--blush)] py-14">
            <div className="flex px-7 md:px-14 md:flex-row flex-col-reverse justify-center items-center gap-14 mx-auto">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="bg-[var(--light)] rounded-xl p-6 shadow-sm w-[80%] md:w-52"
                    >
                        <item.icon className="mx-auto mb-3 text-left mr-52" />
                        <h4 className="font-semibold text-xl text-gray-800">{item.title}</h4>
                        <p className="text-sm text-[var(--rose)] mt-1">{item.desc}</p>
                    </div>
                ))}
                <div className="text-right">
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--pink)]">Blooming Beauty <br /><span className="font-normal">Cares About YOU</span></h1>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
