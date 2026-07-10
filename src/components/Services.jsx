import { useNavigate } from "react-router-dom"
import {
  Zap,
  Wrench,
  ShieldCheck,
  AirVent,
  PaintBucket,
  Sparkles
} from "lucide-react"

const services = [

  {
    title: "Electrician",
    desc: "Professional electrical repair and installation.",
    icon: <Zap size={42} />
  },

  {
    title: "Plumber",
    desc: "Quick plumbing solutions for homes and offices.",
    icon: <Wrench size={42} />
  },

  {
    title: "CCTV Installation",
    desc: "Secure your property with CCTV setup.",
    icon: <ShieldCheck size={42} />
  },

  {
    title: "AC Repair",
    desc: "Fast AC servicing and maintenance.",
    icon: <AirVent size={42} />
  },

  {
    title: "Painting",
    desc: "Professional home and office painting.",
    icon: <PaintBucket size={42} />
  },

  {
    title: "Room Cleaning",
    desc: "Professional room cleaning services for homes, apartments, and offices.",
    icon: <Sparkles size={42} />
  }

]

function Services() {
  const navigate = useNavigate()

  return (
    
    <section className="bg-gray-100 py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-blue-900 mb-4">
            Our Services
          </h2>

          <p className="text-gray-600 text-lg">
            Professional home services delivered by trusted experts.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <div className="text-orange-500 mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6">
                {service.desc}
              </p>

              <button
                onClick={() =>
                  navigate("/book-service", {
                    state: {
                      service: service.title
                    }
                  })
                }
                className="bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800"
              >
                Book Now
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default Services