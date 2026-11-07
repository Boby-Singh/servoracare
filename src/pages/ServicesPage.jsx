
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
  Clock,
  CalendarCheck,
  Headset,
  ClipboardList,
  Home,
  BadgeCheck,
  MapPin,
  PhoneCall,
  ChevronRight
} from "lucide-react";

function ServicesPage() {
  const navigate = useNavigate();

  // ==========================================
  // SERVICES DATA
  // ==========================================

  const services = [
    {
      title: "Electrician",
      category: "Electrical Solutions",
      desc: "Get assistance with electrical repairs, wiring, installations and common electrical problems. Make your home safer and more functional with ServoraCare.",
      icon: Zap,
      number: "01",
      color: "orange",
      features: [
        "Switch and socket repair",
        "Fan and light installation",
        "Wiring and electrical fittings",
        "Electrical fault diagnosis"
      ]
    },
    {
      title: "Plumber",
      category: "Plumbing Solutions",
      desc: "From leaking taps to pipe fittings, get help with everyday plumbing problems and essential bathroom and kitchen installations.",
      icon: Wrench,
      number: "02",
      color: "blue",
      features: [
        "Tap and pipe leakage repair",
        "Bathroom fittings",
        "Kitchen plumbing assistance",
        "Pipe installation and repair"
      ]
    },
    {
      title: "CCTV Installation",
      category: "Security Solutions",
      desc: "Improve your home and workplace security with CCTV camera installation and configuration assistance.",
      icon: ShieldCheck,
      number: "03",
      color: "purple",
      features: [
        "CCTV camera installation",
        "DVR and NVR configuration",
        "Camera connectivity setup",
        "Security system assistance"
      ]
    },
    {
      title: "AC Repair",
      category: "Cooling Solutions",
      desc: "Get assistance with AC servicing, troubleshooting, installation and maintenance to keep your cooling system working efficiently.",
      icon: AirVent,
      number: "04",
      color: "cyan",
      features: [
        "AC inspection and diagnosis",
        "Cooling problem troubleshooting",
        "AC servicing and maintenance",
        "Installation assistance"
      ]
    },
    {
      title: "Painting",
      category: "Home Improvement",
      desc: "Give your home a fresh look with painting assistance for residential and office spaces, including interior and exterior work.",
      icon: PaintBucket,
      number: "05",
      color: "pink",
      features: [
        "Interior wall painting",
        "Exterior painting",
        "Wall preparation assistance",
        "Repainting and touch-ups"
      ]
    },
    {
      title: "Room Cleaning",
      category: "Cleaning Solutions",
      desc: "Maintain a clean and comfortable environment with room cleaning assistance for homes, apartments and offices.",
      icon: Sparkles,
      number: "06",
      color: "green",
      features: [
        "Room dusting and cleaning",
        "Floor cleaning",
        "Furniture surface cleaning",
        "Kitchen and bathroom cleaning"
      ]
    }
  ];

  // ==========================================
  // COLOR THEMES
  // ==========================================

  const themes = {
    orange: {
      icon: "bg-orange-50 text-orange-500 group-hover:bg-orange-500",
      badge: "bg-orange-50 text-orange-600",
      accent: "group-hover:text-orange-500"
    },
    blue: {
      icon: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
      badge: "bg-blue-50 text-blue-600",
      accent: "group-hover:text-blue-600"
    },
    purple: {
      icon: "bg-purple-50 text-purple-600 group-hover:bg-purple-600",
      badge: "bg-purple-50 text-purple-600",
      accent: "group-hover:text-purple-600"
    },
    cyan: {
      icon: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-500",
      badge: "bg-cyan-50 text-cyan-600",
      accent: "group-hover:text-cyan-600"
    },
    pink: {
      icon: "bg-pink-50 text-pink-600 group-hover:bg-pink-500",
      badge: "bg-pink-50 text-pink-600",
      accent: "group-hover:text-pink-600"
    },
    green: {
      icon: "bg-green-50 text-green-600 group-hover:bg-green-600",
      badge: "bg-green-50 text-green-600",
      accent: "group-hover:text-green-600"
    }
  };

  // ==========================================
  // BOOKING HANDLER
  // ==========================================

  const handleBook = (service) => {
    navigate("/book-service", {
      state: {
        service
      }
    });
  };

  // ==========================================
  // SCROLL HANDLER
  // ==========================================

  const exploreServices = () => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  // ==========================================
  // SEO STRUCTURED DATA
  // ==========================================

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.servoracare.in/#organization",
        name: "ServoraCare",
        url: "https://www.servoracare.in"
      },
      {
        "@type": "ItemList",
        name: "Home Services in Gwalior - ServoraCare",
        description:
          "Home maintenance, repair and cleaning services available through ServoraCare in Gwalior, Madhya Pradesh.",
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.desc,
            provider: {
              "@id": "https://www.servoracare.in/#organization"
            },
            areaServed: {
              "@type": "City",
              name: "Gwalior"
            }
          }
        }))
      }
    ]
  };

  return (
    <>
      {/* ==========================================
          SEO / META TAGS
      ========================================== */}

      <Helmet>
        <title>
          Home Services in Gwalior | Electrician, Plumber, AC Repair | ServoraCare
        </title>

        <meta
          name="description"
          content="Looking for home services in Gwalior? Explore electrician, plumber, AC repair, CCTV installation, painting and room cleaning services with ServoraCare. Book online."
        />

        <meta
          name="keywords"
          content="home services in Gwalior, electrician in Gwalior, plumber in Gwalior, AC repair Gwalior, CCTV installation Gwalior, painting services Gwalior, room cleaning Gwalior, ServoraCare"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://www.servoracare.in/services"
        />

        <meta
          property="og:title"
          content="Professional Home Services in Gwalior | ServoraCare"
        />

        <meta
          property="og:description"
          content="Explore electrician, plumbing, AC repair, CCTV installation, painting and cleaning services with ServoraCare in Gwalior."
        />

        <meta
          property="og:url"
          content="https://www.servoracare.in/services"
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:site_name"
          content="ServoraCare"
        />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50">

        {/* ==========================================
            HERO SECTION
        ========================================== */}

        <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">

          {/* Background Decoration */}

          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full" />

          <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-24 lg:py-28 text-center">

            <div className="inline-flex items-center gap-2 px-5 py-2 mb-7 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">

              <Home size={17} className="text-orange-400" />

              <span className="text-sm font-semibold text-blue-100">
                YOUR HOME, OUR CARE
              </span>

            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">

              Professional Home Services

              <span className="block text-orange-400 mt-2">
                Made Simple in Gwalior
              </span>

            </h1>

            <p className="max-w-3xl mx-auto mt-7 text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed">

              From electrical repairs and plumbing to AC servicing,
              painting and cleaning, discover convenient home service
              booking with ServoraCare.

            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-9">

              <button
                onClick={exploreServices}
                className="inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-900/20 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
              >
                Explore Services

                <ArrowRight size={20} />

              </button>

              <button
                onClick={() => navigate("/book-service")}
                className="inline-flex items-center justify-center gap-3 bg-white/10 border border-white/30 hover:bg-white hover:text-blue-950 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 w-full sm:w-auto"
              >
                Book a Service

                <CalendarCheck size={19} />

              </button>

            </div>

            <div className="flex flex-wrap justify-center gap-5 sm:gap-8 mt-12 text-sm text-blue-100">

              <span className="flex items-center gap-2">
                <CheckCircle size={17} className="text-green-400" />
                Easy Online Booking
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle size={17} className="text-green-400" />
                Booking Confirmation
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle size={17} className="text-green-400" />
                Customer Support
              </span>

            </div>

          </div>

        </section>

        {/* ==========================================
            TRUST / BENEFITS SECTION
        ========================================== */}

        <section className="bg-white border-b border-slate-200">

          <div className="max-w-7xl mx-auto px-6 py-8">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

              {[
                {
                  icon: CalendarCheck,
                  title: "Easy Booking",
                  desc: "Simple online process",
                  color: "blue"
                },
                {
                  icon: Clock,
                  title: "Availability",
                  desc: "Based on technician schedules",
                  color: "orange"
                },
                {
                  icon: ClipboardList,
                  title: "Service Details",
                  desc: "Know booking information",
                  color: "green"
                },
                {
                  icon: Headset,
                  title: "Customer Support",
                  desc: "Assistance when needed",
                  color: "purple"
                }
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-center sm:justify-start gap-3"
                  >

                    <div className={`w-12 h-12 rounded-xl bg-${item.color}-50 flex items-center justify-center shrink-0`}>
                      <Icon
                        size={22}
                        className={`text-${item.color}-600`}
                      />
                    </div>

                    <div>
                      <p className="text-sm sm:text-base font-bold text-slate-900">
                        {item.title}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </section>

        {/* ==========================================
            SERVICES SECTION
        ========================================== */}

        <section
          id="services"
          className="max-w-7xl mx-auto px-6 py-20 lg:py-24"
        >

          <div className="text-center max-w-3xl mx-auto mb-14">

            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-500 mb-4">

              <span className="w-8 h-0.5 bg-orange-500" />

              WHAT WE OFFER

              <span className="w-8 h-0.5 bg-orange-500" />

            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950">

              Explore Our Home Services

            </h2>

            <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">

              Find the right service for your home. ServoraCare brings
              multiple home maintenance and improvement services
              together in one convenient platform in Gwalior.

            </p>

          </div>

          {/* Service Cards */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

            {services.map((service) => {

              const Icon = service.icon;
              const theme = themes[service.color];

              return (

                <div
                  key={service.title}
                  className="group relative bg-white rounded-3xl border border-slate-200 p-7 sm:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden"
                >

                  {/* Decorative Background */}

                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full opacity-60 group-hover:bg-orange-50 transition-colors duration-300" />

                  {/* Card Header */}

                  <div className="relative flex items-center justify-between mb-7">

                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:text-white group-hover:scale-110 ${theme.icon}`}>

                      <Icon size={31} strokeWidth={1.8} />

                    </div>

                    <span className="text-sm font-bold text-slate-300 tracking-widest">
                      {service.number}
                    </span>

                  </div>

                  {/* Category */}

                  <div className="mb-3">

                    <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold ${theme.badge}`}>
                      {service.category}
                    </span>

                  </div>

                  {/* Title */}

                  <h3 className={`text-xl sm:text-2xl font-bold text-blue-950 mb-3 transition-colors duration-300 ${theme.accent}`}>

                    {service.title}

                  </h3>

                  {/* Description */}

                  <p className="text-slate-600 text-sm leading-7 min-h-[105px]">

                    {service.desc}

                  </p>

                  {/* Features */}

                  <div className="mt-6 pt-5 border-t border-slate-100">

                    <h4 className="text-sm font-bold text-slate-900 mb-4">

                      What we can help with

                    </h4>

                    <ul className="space-y-3">

                      {service.features.map((feature, index) => (

                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm text-slate-600"
                        >

                          <CheckCircle
                            size={17}
                            className="text-green-500 shrink-0 mt-0.5"
                          />

                          <span>{feature}</span>

                        </li>

                      ))}

                    </ul>

                  </div>

                  {/* Booking Information */}

                  <div className="mt-6 pt-5 border-t border-slate-100">

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">

                      <BadgeCheck
                        size={17}
                        className="text-blue-600 shrink-0"
                      />

                      Service details shared during booking

                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mt-3">

                      <Clock
                        size={17}
                        className="text-orange-500 shrink-0"
                      />

                      Subject to technician availability

                    </div>

                  </div>

                  {/* Book Button */}

                  <button
                    onClick={() => handleBook(service.title)}
                    className="mt-7 w-full flex items-center justify-center gap-3 bg-blue-950 hover:bg-orange-500 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-sm group/button"
                  >

                    Book {service.title}

                    <ArrowRight
                      size={19}
                      className="group-hover/button:translate-x-1 transition-transform duration-300"
                    />

                  </button>

                </div>

              );

            })}

          </div>

        </section>

        {/* ==========================================
            HOW IT WORKS
        ========================================== */}

        <section className="bg-white border-y border-slate-200">

          <div className="max-w-7xl mx-auto px-6 py-20">

            <div className="text-center max-w-3xl mx-auto mb-14">

              <span className="text-sm font-bold uppercase tracking-wider text-orange-500">
                SIMPLE PROCESS
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 mt-3">
                How ServoraCare Works
              </h2>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Booking a home service is simple. Follow these
                steps to get started.
              </p>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {[
                {
                  number: "01",
                  icon: ClipboardList,
                  title: "Choose a Service",
                  desc: "Explore available services and select the one you need."
                },
                {
                  number: "02",
                  icon: CalendarCheck,
                  title: "Submit Your Booking",
                  desc: "Enter your details and submit your service request online."
                },
                {
                  number: "03",
                  icon: BadgeCheck,
                  title: "Booking Confirmation",
                  desc: "Your request is reviewed and technician availability is coordinated."
                },
                {
                  number: "04",
                  icon: Home,
                  title: "Get Service Assistance",
                  desc: "Receive the requested service after booking and work details are confirmed."
                }
              ].map((step, index) => {

                const Icon = step.icon;

                return (

                  <div
                    key={index}
                    className="relative text-center p-7 rounded-3xl bg-slate-50 hover:bg-blue-50 transition-all duration-300"
                  >

                    <div className="relative mx-auto w-16 h-16 rounded-2xl bg-blue-950 text-white flex items-center justify-center mb-6">

                      <Icon size={28} />

                      <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">
                        {step.number}
                      </span>

                    </div>

                    <h3 className="text-lg font-bold text-blue-950 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-7">
                      {step.desc}
                    </p>

                  </div>

                );

              })}

            </div>

          </div>

        </section>

        {/* ==========================================
            SERVORACARE AT A GLANCE
        ========================================== */}

        <section className="bg-slate-50">

          <div className="max-w-7xl mx-auto px-6 py-20">

            <div className="grid lg:grid-cols-2 gap-12 items-center">

              <div>

                <span className="text-sm font-bold uppercase tracking-wider text-orange-500">
                  WHY SERVORACARE
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 mt-4 leading-tight">

                  Your Home Deserves Convenient Service Solutions

                </h2>

                <p className="mt-5 text-slate-600 leading-8">

                  Managing home repairs and maintenance can take time.
                  ServoraCare makes it easier to explore different
                  service categories and submit booking requests
                  through one online platform.

                </p>

                <div className="mt-8 space-y-5">

                  {[
                    "Multiple home service categories in one place",
                    "Convenient online booking experience",
                    "Service and booking details shared with customers",
                    "Technician availability coordination",
                    "Customer-focused booking assistance"
                  ].map((item, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >

                      <CheckCircle
                        size={20}
                        className="text-green-500 shrink-0 mt-0.5"
                      />

                      <p className="text-slate-700 font-medium text-sm sm:text-base">
                        {item}
                      </p>

                    </div>

                  ))}

                </div>

                <button
                  onClick={() => navigate("/book-service")}
                  className="mt-9 inline-flex items-center gap-3 bg-blue-950 hover:bg-orange-500 text-white px-7 py-4 rounded-xl font-bold transition-all duration-300"
                >

                  Get Started

                  <ArrowRight size={19} />

                </button>

              </div>

              {/* Information Card */}

              <div className="relative">

                <div className="absolute -top-5 -right-5 w-32 h-32 bg-orange-100 rounded-full blur-2xl" />

                <div className="relative bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-lg">

                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-7">

                    <Home size={34} className="text-orange-500" />

                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950">

                    ServoraCare

                  </h3>

                  <p className="text-orange-500 font-bold mt-2">
                    Your Home, Our Care.
                  </p>

                  <p className="text-slate-600 leading-8 mt-6">

                    A convenient online platform for discovering
                    and booking essential home services in Gwalior.

                    Whether it is an electrical issue, plumbing
                    requirement, AC problem or home improvement
                    task, find the service category you need.

                  </p>

                  <div className="border-t border-slate-100 mt-7 pt-7 grid grid-cols-2 gap-5">

                    <div>
                      <p className="text-3xl font-extrabold text-blue-950">
                        06
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Service Categories
                      </p>
                    </div>

                    <div>
                      <p className="text-3xl font-extrabold text-orange-500">
                        01
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Convenient Platform
                      </p>
                    </div>

                  </div>

                  <div className="mt-7 flex items-center gap-2 text-sm text-slate-500">

                    <MapPin size={17} className="text-orange-500" />

                    Serving Gwalior, Madhya Pradesh

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ==========================================
            FINAL CTA SECTION
        ========================================== */}

        <section className="px-6 py-20">

          <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 px-7 sm:px-12 py-14 sm:py-16 text-center text-white shadow-xl">

            <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />

            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />

            <div className="relative">

              <span className="inline-block bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm font-semibold text-blue-100 mb-6">
                SERVORACARE - YOUR HOME, OUR CARE
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">

                Need Help Around Your Home?

              </h2>

              <p className="max-w-2xl mx-auto mt-5 text-blue-100 text-base sm:text-lg leading-relaxed">

                Don't let home maintenance problems take up
                your time. Explore our services and submit your
                booking request with ServoraCare.

              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-9">

                <button
                  onClick={() => navigate("/book-service")}
                  className="inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1"
                >

                  Book a Service

                  <ArrowRight size={20} />

                </button>

                <button
                  onClick={() => navigate("/contact")}
                  className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white hover:text-blue-950 border border-white/30 px-8 py-4 rounded-xl font-bold transition-all duration-300"
                >

                  Contact Us

                  <PhoneCall size={19} />

                </button>

              </div>

              <p className="mt-8 text-sm text-blue-200">
                www.servoracare.in
              </p>

            </div>

          </div>

        </section>

      </div>
    </>
  );
}

export default ServicesPage;
