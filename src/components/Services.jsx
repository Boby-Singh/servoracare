
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Wrench,
  ShieldCheck,
  AirVent,
  PaintBucket,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  BadgeCheck
} from "lucide-react";

const services = [
  {
    title: "Electrician",
    category: "Electrical Solutions",
    desc: "Get professional assistance for electrical repairs, installations and everyday electrical problems at your home.",
    features: [
      "Switch & socket repair",
      "Wiring and installation",
      "Fan and light fitting",
      "Electrical troubleshooting"
    ],
    icon: Zap,
    color: "orange"
  },
  {
    title: "Plumber",
    category: "Plumbing Solutions",
    desc: "From leaking taps to plumbing installations, get assistance with your household plumbing requirements.",
    features: [
      "Tap and pipe leakage",
      "Bathroom fittings",
      "Pipe installation",
      "Drainage solutions"
    ],
    icon: Wrench,
    color: "blue"
  },
  {
    title: "CCTV Installation",
    category: "Home Security",
    desc: "Improve your property security with professional CCTV installation and setup assistance.",
    features: [
      "Camera installation",
      "DVR / NVR setup",
      "Camera configuration",
      "Security system assistance"
    ],
    icon: ShieldCheck,
    color: "purple"
  },
  {
    title: "AC Repair",
    category: "Cooling Solutions",
    desc: "Keep your cooling system running smoothly with AC repair, servicing and maintenance assistance.",
    features: [
      "AC inspection",
      "Cooling problem diagnosis",
      "General servicing",
      "Installation assistance"
    ],
    icon: AirVent,
    color: "cyan"
  },
  {
    title: "Painting",
    category: "Home Improvement",
    desc: "Refresh your living spaces with professional painting assistance for residential and office interiors.",
    features: [
      "Interior painting",
      "Wall preparation",
      "Repainting assistance",
      "Colour consultation"
    ],
    icon: PaintBucket,
    color: "pink"
  },
  {
    title: "Room Cleaning",
    category: "Cleaning Solutions",
    desc: "Maintain a fresh and comfortable space with room cleaning services for homes and offices.",
    features: [
      "Room dusting",
      "Floor cleaning",
      "Surface cleaning",
      "General room cleaning"
    ],
    icon: Sparkles,
    color: "green"
  }
];

const theme = {
  orange: "bg-orange-50 text-orange-500 group-hover:bg-orange-500",
  blue: "bg-blue-50 text-blue-500 group-hover:bg-blue-600",
  purple: "bg-purple-50 text-purple-500 group-hover:bg-purple-600",
  cyan: "bg-cyan-50 text-cyan-500 group-hover:bg-cyan-500",
  pink: "bg-pink-50 text-pink-500 group-hover:bg-pink-500",
  green: "bg-green-50 text-green-500 group-hover:bg-green-600"
};

function Services() {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-50 py-20 px-5 sm:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <span className="inline-block bg-orange-100 text-orange-600 px-5 py-2 rounded-full text-sm font-semibold mb-5">
            SERVORACARE HOME SERVICES
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-blue-950 mb-5">
            Everything Your Home Needs,
            <span className="text-orange-500"> One Place.</span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            From everyday repairs to home improvement, book reliable
            home service assistance through ServoraCare.
            Making home maintenance easier, smarter and more convenient.
          </p>

        </div>

        {/* Service Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => {

            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group bg-white rounded-3xl p-7 sm:p-8
                border border-gray-100 shadow-sm
                hover:shadow-xl hover:-translate-y-2
                transition-all duration-300 flex flex-col"
              >

                {/* Icon and Category */}
                <div className="flex items-center justify-between mb-7">

                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center
                    ${theme[service.color]}
                    group-hover:text-white transition-all duration-300`}>
                    <Icon size={34} strokeWidth={1.8} />
                  </div>

                  <span className="text-xs font-semibold text-gray-500
                    bg-gray-100 px-3 py-2 rounded-full">
                    {service.category}
                  </span>

                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-blue-950 mb-3
                  group-hover:text-orange-500 transition">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-7 mb-6">
                  {service.desc}
                </p>

                {/* Features */}
                <div className="border-t border-gray-100 pt-5 mb-7">

                  <h4 className="font-bold text-gray-800 text-sm mb-4">
                    What we can help with
                  </h4>

                  <ul className="space-y-3">

                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-sm text-gray-600"
                      >
                        <CheckCircle2
                          size={17}
                          className="text-green-500 shrink-0"
                        />
                        {feature}
                      </li>
                    ))}

                  </ul>

                </div>

                {/* Trust Information */}
                <div className="flex flex-wrap items-center gap-4
                  text-xs text-gray-500 mb-7 mt-auto">

                  <span className="flex items-center gap-1.5">
                    <BadgeCheck size={16} className="text-blue-600" />
                    Booking confirmation
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock size={16} className="text-orange-500" />
                    Availability based
                  </span>

                </div>

                {/* Booking Button */}
                <button
                  onClick={() =>
                    navigate("/book-service", {
                      state: {
                        service: service.title
                      }
                    })
                  }
                  className="w-full flex items-center justify-center gap-3
                  bg-blue-950 text-white font-semibold
                  py-4 rounded-xl
                  hover:bg-orange-500
                  transition-all duration-300 group/btn"
                >
                  Book This Service

                  <ArrowRight
                    size={19}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />

                </button>

              </div>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-blue-950 rounded-3xl p-8 sm:p-12
          text-center text-white">

          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Your Home Deserves the Best Care!
          </h3>

          <p className="text-blue-100 mb-7 max-w-2xl mx-auto leading-relaxed">
            Need help with something around your home?
            Explore our services and book the assistance you need
            with ServoraCare.
          </p>

          <button
            onClick={() => navigate("/book-service")}
            className="bg-orange-500 hover:bg-orange-600
            text-white px-8 py-4 rounded-xl font-bold
            transition shadow-lg"
          >
            Book a Service Now
          </button>

        </div>

      </div>

    </section>
  );
}

export default Services;
