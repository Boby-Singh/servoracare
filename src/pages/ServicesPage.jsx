import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Zap,
  Wrench,
  ShieldCheck,
  AirVent,
  PaintBucket,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Users,
} from "lucide-react";

function ServicesPage() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Electrician",
      desc: "Professional electrical repair, wiring, switch installation and fault fixing.",
      icon: Zap,
      number: "01",
    },
    {
      title: "Plumber",
      desc: "Leak repair, pipe fitting, bathroom installation and plumbing maintenance.",
      icon: Wrench,
      number: "02",
    },
    {
      title: "CCTV Installation",
      desc: "Complete CCTV camera installation with secure monitoring setup.",
      icon: ShieldCheck,
      number: "03",
    },
    {
      title: "AC Repair",
      desc: "AC servicing, gas filling, installation and maintenance.",
      icon: AirVent,
      number: "04",
    },
    {
      title: "Painting",
      desc: "Interior and exterior painting with a premium quality finish.",
      icon: PaintBucket,
      number: "05",
    },
    {
      title: "Room Cleaning",
      desc: "Professional cleaning for homes, apartments, offices, kitchens, bathrooms and deep cleaning.",
      icon: Sparkles,
      number: "06",
    },
  ];

  const handleBook = (service) => {
    navigate("/book-service", {
      state: {
        service,
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>
          Home Services | Electrician, Plumber, AC Repair | ServoraCare
        </title>

        <meta
          name="description"
          content="Book trusted home services from ServoraCare including electrician, plumber, AC repair, CCTV installation, painting and professional cleaning services."
        />

        <meta
          name="keywords"
          content="electrician service, plumber service, AC repair, CCTV installation, home cleaning, painting service, ServoraCare"
        />

        <link
          rel="canonical"
          href="https://www.servoracare.in/services"
        />

        <meta
          property="og:title"
          content="Professional Home Services | ServoraCare"
        />

        <meta
          property="og:description"
          content="Verified professionals for electrical, plumbing, AC repair, CCTV, painting and cleaning services."
        />

        <meta
          property="og:url"
          content="https://www.servoracare.in/services"
        />

        <meta
          property="og:type"
          content="website"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Home Services",
            provider: {
              "@type": "Organization",
              name: "ServoraCare",
              url: "https://www.servoracare.in",
            },
            serviceType: [
              "Electrician",
              "Plumber",
              "AC Repair",
              "CCTV Installation",
              "Painting",
              "Room Cleaning",
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">

          {/* Background decoration */}

          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-24 lg:py-28 text-center">

            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">

              <Star
                size={16}
                className="text-orange-400 fill-orange-400"
              />

              <span className="text-sm font-medium text-blue-100">
                Trusted Home Service Professionals
              </span>

            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">

              Professional Home

              <span className="block text-orange-400 mt-2">
                Services You Can Trust
              </span>

            </h1>

            <p className="max-w-3xl mx-auto mt-6 text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed">

              From electrical repairs to deep cleaning, ServoraCare connects
              you with skilled professionals for reliable doorstep service.

            </p>

            <button
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="
                mt-9
                inline-flex
                items-center
                gap-2
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-7
                py-3.5
                rounded-xl
                font-semibold
                shadow-lg
                shadow-orange-900/20
                transition
                duration-300
                hover:-translate-y-0.5
              "
            >
              Explore Services

              <ArrowRight size={19} />
            </button>

          </div>
        </section>


        {/* =====================================================
            TRUST BAR
        ===================================================== */}

        <section className="bg-white border-b border-slate-200">

          <div className="max-w-7xl mx-auto px-6 py-6">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="flex items-center justify-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                  <Shield
                    size={20}
                    className="text-blue-700"
                  />

                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Verified
                  </p>

                  <p className="text-xs text-slate-500">
                    Professionals
                  </p>
                </div>

              </div>


              <div className="flex items-center justify-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">

                  <Clock
                    size={20}
                    className="text-orange-500"
                  />

                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Quick
                  </p>

                  <p className="text-xs text-slate-500">
                    Doorstep Service
                  </p>
                </div>

              </div>


              <div className="flex items-center justify-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">

                  <Users
                    size={20}
                    className="text-green-600"
                  />

                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Skilled
                  </p>

                  <p className="text-xs text-slate-500">
                    Technicians
                  </p>
                </div>

              </div>


              <div className="flex items-center justify-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">

                  <CheckCircle
                    size={20}
                    className="text-purple-600"
                  />

                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Quality
                  </p>

                  <p className="text-xs text-slate-500">
                    Service
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            SERVICES
        ===================================================== */}

        <section
          id="services"
          className="max-w-7xl mx-auto px-6 py-20 lg:py-24"
        >

          <div className="text-center max-w-3xl mx-auto mb-14">

            <span className="inline-block text-sm font-bold uppercase tracking-wider text-orange-500 mb-3">
              What We Offer
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950">
              Our Professional Services
            </h2>

            <p className="mt-5 text-slate-600 text-base sm:text-lg">
              Reliable home maintenance and repair services delivered by
              skilled professionals at your doorstep.
            </p>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

            {services.map((service) => {

              const Icon = service.icon;

              return (

                <div
                  key={service.title}
                  className="
                    group
                    relative
                    bg-white
                    rounded-3xl
                    border
                    border-slate-200
                    p-7
                    sm:p-8
                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1.5
                    transition-all
                    duration-300
                  "
                >

                  {/* Number */}

                  <span className="
                    absolute
                    top-6
                    right-7
                    text-xs
                    font-bold
                    text-slate-300
                    tracking-wider
                  ">
                    {service.number}
                  </span>


                  {/* Icon */}

                  <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                    mb-6
                    group-hover:bg-blue-900
                    transition-colors
                    duration-300
                  ">

                    <Icon
                      size={28}
                      className="
                        text-blue-700
                        group-hover:text-white
                        transition
                      "
                    />

                  </div>


                  {/* Title */}

                  <h3 className="
                    text-xl
                    sm:text-2xl
                    font-bold
                    text-blue-950
                    mb-3
                  ">
                    {service.title}
                  </h3>


                  {/* Description */}

                  <p className="
                    text-slate-600
                    text-sm
                    sm:text-base
                    leading-relaxed
                    min-h-[72px]
                  ">
                    {service.desc}
                  </p>


                  {/* Features */}

                  <div className="mt-6 space-y-3">

                    <div className="flex items-center gap-2.5">

                      <CheckCircle
                        size={17}
                        className="text-green-500 shrink-0"
                      />

                      <span className="text-sm text-slate-600">
                        Verified Technician
                      </span>

                    </div>


                    <div className="flex items-center gap-2.5">

                      <CheckCircle
                        size={17}
                        className="text-green-500 shrink-0"
                      />

                      <span className="text-sm text-slate-600">
                        Transparent Pricing
                      </span>

                    </div>


                    <div className="flex items-center gap-2.5">

                      <CheckCircle
                        size={17}
                        className="text-green-500 shrink-0"
                      />

                      <span className="text-sm text-slate-600">
                        Doorstep Service
                      </span>

                    </div>


                    <div className="flex items-center gap-2.5">

                      <CheckCircle
                        size={17}
                        className="text-green-500 shrink-0"
                      />

                      <span className="text-sm text-slate-600">
                        Quality Service
                      </span>

                    </div>

                  </div>


                  {/* Button */}

                  <button
                    onClick={() => handleBook(service.title)}
                    className="
                      mt-7
                      w-full
                      flex
                      items-center
                      justify-center
                      gap-2
                      bg-blue-900
                      hover:bg-blue-800
                      text-white
                      py-3.5
                      rounded-xl
                      font-semibold
                      transition
                      duration-300
                      group-hover:bg-orange-500
                      group-hover:hover:bg-orange-600
                    "
                  >

                    Book {service.title}

                    <ArrowRight size={18} />

                  </button>

                </div>

              );

            })}

          </div>

        </section>


{/* =====================================================
            SERVORACARE AT A GLANCE
        ===================================================== */}

<section className="bg-white border-y border-slate-200">
  <div className="max-w-7xl mx-auto px-6 py-20">

    <div className="text-center mb-12">
      <span className="text-sm font-bold uppercase tracking-wider text-orange-500">
        ServoraCare At A Glance
      </span>

      <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 mt-3">
        Home Services Made Simple
      </h2>

      <p className="max-w-2xl mx-auto mt-4 text-slate-500">
        From everyday repairs to essential home maintenance, ServoraCare
        connects customers with professionals for a convenient service
        experience.
      </p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

      <div className="text-center">
        <p className="text-2xl sm:text-3xl font-extrabold text-blue-900">
          Multiple
        </p>
        <p className="mt-2 text-slate-500 font-medium">
          Home Services
        </p>
      </div>

      <div className="text-center">
        <p className="text-2xl sm:text-3xl font-extrabold text-orange-500">
          Professional
        </p>
        <p className="mt-2 text-slate-500 font-medium">
          Service Partners
        </p>
      </div>

      <div className="text-center">
        <p className="text-2xl sm:text-3xl font-extrabold text-blue-900">
          Easy
        </p>
        <p className="mt-2 text-slate-500 font-medium">
          Booking Experience
        </p>
      </div>

      <div className="text-center">
        <p className="text-2xl sm:text-3xl font-extrabold text-orange-500">
          Customer
        </p>
        <p className="mt-2 text-slate-500 font-medium">
          Focused Support
        </p>
      </div>

    </div>
  </div>
</section>


        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="px-6 py-20">

          <div className="
            max-w-6xl
            mx-auto
            rounded-3xl
            bg-gradient-to-r
            from-blue-950
            to-blue-800
            px-7
            sm:px-12
            py-12
            sm:py-16
            text-center
            text-white
            shadow-xl
          ">

            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Need a Service at Your Doorstep?
            </h2>

            <p className="max-w-2xl mx-auto mt-4 text-blue-100">
              Book a trusted ServoraCare professional and get your home
              service handled with care.
            </p>

            <button
              onClick={() => navigate("/book-service")}
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                bg-orange-500
                hover:bg-orange-600
                px-8
                py-3.5
                rounded-xl
                font-bold
                transition
              "
            >
              Book a Service

              <ArrowRight size={19} />

            </button>

          </div>

        </section>

      </div>
    </>
  );
}

export default ServicesPage;