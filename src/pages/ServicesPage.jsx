import { Link, useNavigate } from "react-router-dom"
import {
  Zap,
  Wrench,
  ShieldCheck,
  AirVent,
  PaintBucket,
  Sparkles,
  CheckCircle,
} from "lucide-react"

function ServicesPage() {

  const navigate = useNavigate()

  const services = [

    {
      title: "Electrician",
      desc: "Professional electrical repair, wiring, switch installation and fault fixing.",
      icon: <Zap size={42} />
    },

    {
      title: "Plumber",
      desc: "Leak repair, pipe fitting, bathroom installation and plumbing maintenance.",
      icon: <Wrench size={42} />
    },

    {
      title: "CCTV Installation",
      desc: "Complete CCTV camera installation with secure monitoring setup.",
      icon: <ShieldCheck size={42} />
    },

    {
      title: "AC Repair",
      desc: "AC servicing, gas filling, installation and maintenance.",
      icon: <AirVent size={42} />
    },

    {
      title: "Painting",
      desc: "Interior & exterior painting with premium quality finish.",
      icon: <PaintBucket size={42} />
    },

    {
      title: "Room Cleaning",
      desc: "Professional room cleaning services for homes, apartments, offices, kitchens, bathrooms, and deep cleaning.",
      icon: <Sparkles size={42} />
    }

  ]

  return (

    <div className="bg-gray-100 min-h-screen">

      <div className="mb-8">

        <Link
          to="/"
          className="text-blue-700 hover:text-orange-500 font-medium"
        >
          Home
        </Link>

        <span className="mx-2 text-gray-500">/</span>

        <span className="text-gray-600">
          Services
        </span>

      </div>

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-6">
            Our Professional Services
          </h1>

          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            We provide trusted, verified and experienced professionals
            for all your home maintenance and repair needs.
          </p>

        </div>

      </section>

      {/* Services */}

      <section className="max-w-7xl mx-auto py-20 px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >

              <div className="text-orange-500 mb-6">
                {service.icon}
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {service.title}
              </h2>

              <p className="text-gray-600 mb-6">
                {service.desc}
              </p>

              <ul className="space-y-3 mb-8">

                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={18} />
                  Verified Technician
                </li>

                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={18} />
                  Affordable Pricing
                </li>

                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={18} />
                  Fast Doorstep Service
                </li>

                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={18} />
                  Quality Guarantee
                </li>

              </ul>

              <button
                onClick={() =>
                  navigate("/book-service", {
                    state: {
                      service: service.title
                    }
                  })
                }
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
              >
                Book Now
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
            Why Choose Servora Care?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <div className="text-center">

              <h3 className="text-5xl font-bold text-orange-500">
                500+
              </h3>

              <p className="mt-3 text-gray-600">
                Happy Customers
              </p>

            </div>

            <div className="text-center">

              <h3 className="text-5xl font-bold text-orange-500">
                50+
              </h3>

              <p className="mt-3 text-gray-600">
                Skilled Technicians
              </p>

            </div>

            <div className="text-center">

              <h3 className="text-5xl font-bold text-orange-500">
                24×7
              </h3>

              <p className="mt-3 text-gray-600">
                Customer Support
              </p>

            </div>

            <div className="text-center">

              <h3 className="text-5xl font-bold text-orange-500">
                100%
              </h3>

              <p className="mt-3 text-gray-600">
                Service Guarantee
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>

  )

}

export default ServicesPage