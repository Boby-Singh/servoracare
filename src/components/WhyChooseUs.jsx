import {
  ShieldCheck,
  Clock3,
  BadgeCheck,
  Wallet
} from "lucide-react"

const features = [

  {
    title: "Verified Technicians",
    desc: "All professionals are background verified.",
    icon: <ShieldCheck size={40} />
  },

  {
    title: "Fast Response",
    desc: "Quick booking and rapid service delivery.",
    icon: <Clock3 size={40} />
  },

  {
    title: "Affordable Pricing",
    desc: "Transparent pricing without hidden charges.",
    icon: <Wallet size={40} />
  },

  {
    title: "Quality Guarantee",
    desc: "Reliable and professional workmanship.",
    icon: <BadgeCheck size={40} />
  }

]

function WhyChooseUs() {

  return (
    <section className="bg-white py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-blue-900 mb-4">
            Why Choose Us
          </h2>

          <p className="text-gray-600 text-lg">
            Trusted services designed for your comfort and safety.
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-gray-100 p-8 rounded-3xl text-center hover:shadow-xl transition"
            >

              <div className="text-orange-500 flex justify-center mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default WhyChooseUs