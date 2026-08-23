import profilePhoto from "../assets/profile.jpg";
import heroImage from "../assets/page.png";
import StoryImage from "../assets/Story.jfif";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  ArrowRight,
  Award,
  CheckCircle,
  Globe2,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

function About() {
  const navigate = useNavigate();

  return (
    <>
      {/* =========================================================
          SEO
      ========================================================= */}

      <Helmet>
        <title>
          About ServoraCare | Trusted Home Services in India
        </title>

        <meta
          name="description"
          content="Learn about ServoraCare, our mission, vision and commitment to providing trusted, reliable and professional home services across India."
        />

        <link
          rel="canonical"
          href="https://www.servoracare.in/about"
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="About ServoraCare | Trusted Home Services"
        />

        <meta
          property="og:description"
          content="Discover ServoraCare's mission to make professional, reliable and trusted home services accessible to every family."
        />

        <meta
          property="og:url"
          content="https://www.servoracare.in/about"
        />

        <meta
          property="og:image"
          content="https://www.servoracare.in/about-banner.jpg"
        />

        <meta
          property="og:site_name"
          content="ServoraCare"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="About ServoraCare | Trusted Home Services"
        />

        <meta
          name="twitter:description"
          content="Learn about ServoraCare and our mission to provide trusted home services."
        />

        <meta
          name="twitter:image"
          content="https://www.servoracare.in/about-banner.jpg"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ServoraCare",
            url: "https://www.servoracare.in",
            logo: "https://www.servoracare.in/logo.png",
            description:
              "ServoraCare is a technology-driven home service platform connecting customers with skilled professionals.",
            founder: {
              "@type": "Person",
              name: "Boby Singh",
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">

        {/* =========================================================
            HERO
        ========================================================= */}

        <section className="relative min-h-[650px] lg:min-h-[720px] flex items-center overflow-hidden">

          {/* Background */}
          <img
            src={heroImage}
            alt="ServoraCare professional home services"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/90 to-blue-900/60" />

          {/* Decorative glow */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 py-24">

            <div className="max-w-4xl">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold">
                <Sparkles
                  size={16}
                  className="text-orange-400"
                />

                About ServoraCare
              </div>

              {/* Heading */}
              <h1 className="mt-7 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight">

                Building a More

                <span className="block">
                  Trusted Home
                </span>

                <span className="text-orange-400">
                  Service Experience
                </span>
              </h1>

              {/* Description */}
              <p className="mt-7 text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl leading-8">
                ServoraCare connects homeowners with trusted,
                verified and skilled professionals through
                technology, transparency and exceptional service.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-col sm:flex-row gap-4">

                <button
                  onClick={() => navigate("/book-service")}
                  className="group inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-semibold shadow-xl transition duration-300"
                >
                  Book a Service

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition"
                  />
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("our-story")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold backdrop-blur-sm transition"
                >
                  Discover Our Story
                </button>

              </div>

            </div>
          </div>
        </section>


        {/* =========================================================
            TRUST STRIP
        ========================================================= */}

        <section className="relative -mt-10 z-20 px-5">

          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100">

            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">

              <div className="p-6 sm:p-8 text-center">
                <Users className="mx-auto text-orange-500 mb-3" size={28} />

                <h3 className="text-2xl sm:text-3xl font-bold text-blue-900">
                  500+
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Customers Served
                </p>
              </div>

              <div className="p-6 sm:p-8 text-center">
                <ShieldCheck
                  className="mx-auto text-orange-500 mb-3"
                  size={28}
                />

                <h3 className="text-2xl sm:text-3xl font-bold text-blue-900">
                  50+
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Skilled Professionals
                </p>
              </div>

              <div className="p-6 sm:p-8 text-center">
                <Award
                  className="mx-auto text-orange-500 mb-3"
                  size={28}
                />

                <h3 className="text-2xl sm:text-3xl font-bold text-blue-900">
                  100%
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Service Commitment
                </p>
              </div>

              <div className="p-6 sm:p-8 text-center">
                <HeartHandshake
                  className="mx-auto text-orange-500 mb-3"
                  size={28}
                />

                <h3 className="text-2xl sm:text-3xl font-bold text-blue-900">
                  24×7
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Customer Support
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* =========================================================
            WHO WE ARE
        ========================================================= */}

        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-24 lg:py-32">

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Image */}
            <div className="relative">

              <div className="absolute -top-5 -left-5 w-24 h-24 bg-orange-100 rounded-2xl -z-10" />

              <img
                src={heroImage}
                alt="Professional home service by ServoraCare"
                loading="lazy"
                className="w-full h-[400px] sm:h-[500px] object-cover rounded-3xl shadow-2xl"
              />

              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 max-w-[240px]">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                    <CheckCircle
                      className="text-orange-500"
                      size={24}
                    />
                  </div>

                  <div>
                    <p className="font-bold text-blue-900">
                      Trusted Service
                    </p>

                    <p className="text-xs text-gray-500">
                      Quality & transparency
                    </p>
                  </div>

                </div>
              </div>
            </div>


            {/* Content */}
            <div>

              <span className="text-orange-500 uppercase tracking-[0.2em] font-bold text-sm">
                Who We Are
              </span>

              <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-blue-900 leading-tight">
                Making Home Services
                <span className="text-orange-500">
                  {" "}Simple & Reliable
                </span>
              </h2>

              <p className="mt-7 text-gray-600 text-lg leading-8">
                ServoraCare is a technology-driven home service
                platform connecting homeowners with skilled and
                verified professionals for everyday repair,
                maintenance and improvement needs.
              </p>

              <p className="mt-5 text-gray-600 text-lg leading-8">
                From electrical and plumbing work to AC repair,
                CCTV installation, painting and cleaning, our goal
                is to make professional home services easier to
                discover, book and manage.
              </p>

              {/* Features */}
              <div className="mt-8 space-y-4">

                {[
                  "Verified and skilled professionals",
                  "Transparent and convenient booking",
                  "Professional customer support",
                  "Technology-driven service experience",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle
                      size={21}
                      className="text-green-500 shrink-0"
                    />

                    <span className="text-gray-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>
        </section>


        {/* =========================================================
            OUR STORY
        ========================================================= */}

        <section
          id="our-story"
          className="bg-slate-50 py-24 lg:py-32"
        >

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="text-center max-w-3xl mx-auto">

              <span className="text-orange-500 uppercase tracking-[0.2em] font-bold text-sm">
                Our Journey
              </span>

              <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-blue-900">
                The Story Behind ServoraCare
              </h2>

              <p className="mt-5 text-gray-600 text-lg">
                Built around a simple idea: reliable home services
                should be accessible, transparent and stress-free.
              </p>

            </div>


            <div className="mt-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              <div className="order-2 lg:order-1">

                <div className="space-y-6">

                  <div className="flex gap-5">

                    <div className="shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                      <Target
                        className="text-orange-500"
                        size={24}
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-blue-900">
                        A Simple Beginning
                      </h3>

                      <p className="mt-2 text-gray-600 leading-7">
                        ServoraCare was founded with one simple
                        belief — finding reliable home service
                        professionals should be easy, transparent
                        and stress-free.
                      </p>
                    </div>

                  </div>


                  <div className="flex gap-5">

                    <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Zap
                        className="text-blue-700"
                        size={24}
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-blue-900">
                        Technology Meets Expertise
                      </h3>

                      <p className="mt-2 text-gray-600 leading-7">
                        We combine digital technology with skilled
                        professionals to create a smoother service
                        experience for customers.
                      </p>
                    </div>

                  </div>


                  <div className="flex gap-5">

                    <div className="shrink-0 w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <Globe2
                        className="text-green-600"
                        size={24}
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-blue-900">
                        Building for India
                      </h3>

                      <p className="mt-2 text-gray-600 leading-7">
                        Our ambition is to build a trusted,
                        technology-driven home service platform
                        serving families across India.
                      </p>
                    </div>

                  </div>

                </div>

              </div>


              <div className="order-1 lg:order-2">

                <img
                  src={StoryImage}
                  alt="The story behind ServoraCare"
                  loading="lazy"
                  className="w-full h-[400px] sm:h-[500px] object-cover rounded-3xl shadow-2xl"
                />

              </div>

            </div>

          </div>
        </section>


        {/* =========================================================
            MISSION & VISION
        ========================================================= */}

        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-24">

          <div className="text-center">

            <span className="text-orange-500 uppercase tracking-[0.2em] font-bold text-sm">
              What Drives Us
            </span>

            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-blue-900">
              Mission & Vision
            </h2>

          </div>


          <div className="mt-14 grid md:grid-cols-2 gap-8">

            {/* Mission */}
            <div className="relative overflow-hidden bg-blue-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl">

              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/5" />

              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-7">
                <Target size={28} />
              </div>

              <h3 className="text-3xl font-bold">
                Our Mission
              </h3>

              <p className="mt-5 text-blue-100 text-lg leading-8">
                To simplify home maintenance by delivering
                trusted, affordable and high-quality services
                through technology while empowering skilled
                professionals across India.
              </p>

            </div>


            {/* Vision */}
            <div className="relative overflow-hidden bg-orange-500 text-white rounded-3xl p-8 sm:p-10 shadow-xl">

              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10" />

              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-7">
                <Globe2 size={28} />
              </div>

              <h3 className="text-3xl font-bold">
                Our Vision
              </h3>

              <p className="mt-5 text-orange-50 text-lg leading-8">
                To become India's most trusted digital home
                service platform by setting new standards in
                customer experience, innovation and professional
                excellence.
              </p>

            </div>

          </div>

        </section>


        {/* =========================================================
            FOUNDER
        ========================================================= */}

        <section className="bg-slate-50 py-24 lg:py-32">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-20 items-center">

              {/* Founder Card */}
              <div className="flex justify-center">

                <div className="w-full max-w-[380px] bg-white rounded-3xl overflow-hidden shadow-2xl">

                  <div className="relative">

                    <img
                      src={profilePhoto}
                      alt="Boby Singh - Founder and CEO of ServoraCare"
                      loading="lazy"
                      className="w-full h-[460px] object-cover"
                    />

                    <div className="absolute top-5 left-5 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Founder
                    </div>

                  </div>

                  <div className="p-6 text-center">

                    <h3 className="text-2xl font-bold text-blue-900">
                      Boby Singh
                    </h3>

                    <p className="text-orange-500 font-semibold mt-1">
                      Founder & CEO
                    </p>

                    <p className="text-gray-500 text-sm mt-3">
                      Building the future of professional home services.
                    </p>

                  </div>

                </div>

              </div>


              {/* Message */}
              <div>

                <span className="text-orange-500 uppercase tracking-[0.2em] font-bold text-sm">
                  Leadership
                </span>

                <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-blue-900 leading-tight">
                  A Message From
                  <span className="block text-orange-500">
                    Our Founder
                  </span>
                </h2>

                <div className="mt-8 space-y-6 text-gray-600 text-lg leading-8">

                  <p>
                    ServoraCare was founded with a simple vision —
                    to make trusted home services easily accessible
                    for every family.
                  </p>

                  <p>
                    We believe customers deserve professional
                    service, transparent pricing and complete peace
                    of mind. At the same time, skilled professionals
                    deserve meaningful opportunities to grow.
                  </p>

                  <p>
                    By combining technology with skilled
                    professionals, we are creating a platform where
                    homeowners receive dependable services while
                    technicians build sustainable careers.
                  </p>

                  <p>
                    Our commitment is to build a trusted home
                    service brand through innovation, integrity,
                    customer satisfaction and operational excellence.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================================================
            CORE VALUES
        ========================================================= */}

        <section className="py-24 lg:py-32">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="text-center max-w-3xl mx-auto">

              <span className="text-orange-500 uppercase tracking-[0.2em] font-bold text-sm">
                What We Believe
              </span>

              <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-blue-900">
                Our Core Values
              </h2>

              <p className="mt-5 text-gray-600 text-lg">
                The principles that guide every decision and every
                service we deliver.
              </p>

            </div>


            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Trust */}
              <div className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300">

                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-900 transition">

                  <ShieldCheck
                    size={28}
                    className="text-blue-700 group-hover:text-white transition"
                  />

                </div>

                <h3 className="mt-6 text-xl font-bold text-blue-900">
                  Trust
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  Verified professionals and transparent service
                  practices customers can rely on.
                </p>

              </div>


              {/* Quality */}
              <div className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300">

                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-500 transition">

                  <Award
                    size={28}
                    className="text-orange-500 group-hover:text-white transition"
                  />

                </div>

                <h3 className="mt-6 text-xl font-bold text-blue-900">
                  Quality
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  Consistent service standards focused on customer
                  satisfaction and dependable results.
                </p>

              </div>


              {/* Innovation */}
              <div className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300">

                <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-600 transition">

                  <Lightbulb
                    size={28}
                    className="text-purple-600 group-hover:text-white transition"
                  />

                </div>

                <h3 className="mt-6 text-xl font-bold text-blue-900">
                  Innovation
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  Technology-driven solutions designed for modern
                  households.
                </p>

              </div>


              {/* Integrity */}
              <div className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300">

                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center group-hover:bg-green-600 transition">

                  <HeartHandshake
                    size={28}
                    className="text-green-600 group-hover:text-white transition"
                  />

                </div>

                <h3 className="mt-6 text-xl font-bold text-blue-900">
                  Integrity
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  Honest pricing, ethical practices and accountability
                  in every interaction.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =========================================================
            CTA
        ========================================================= */}

        <section className="relative bg-blue-950 overflow-hidden">

          <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-24 text-center">

            <div className="inline-flex items-center gap-2 text-orange-400 text-sm font-bold uppercase tracking-[0.2em]">
              <Sparkles size={16} />
              ServoraCare
            </div>

            <h2 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Your Home Deserves
              <span className="block text-orange-400">
                Professional Care
              </span>
            </h2>

            <p className="mt-6 text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto leading-8">
              Book trusted professionals with ServoraCare and
              experience reliable, safe and hassle-free home services.
            </p>

            <button
              onClick={() => navigate("/book-service")}
              className="group mt-9 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl transition duration-300"
            >
              Book a Service

              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition"
              />
            </button>

          </div>

        </section>

      </div>
    </>
  );
}

export default About;