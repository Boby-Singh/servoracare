import profilePhoto from "../assets/profile.jpg";
import heroImage from "../assets/page.png";
import StoryImage from "../assets/Story.jfif";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function About() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        {/* ================= SEO ================= */}

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

        {/* ================= OPEN GRAPH ================= */}

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

        {/* ================= TWITTER ================= */}

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

        {/* ================= STRUCTURED DATA ================= */}

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

      <div className="min-h-screen bg-white">

        {/* =====================================================
            HERO SECTION
        ===================================================== */}

        <section
          className="relative min-h-[650px] md:h-[600px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/about-banner.jpg')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-blue-950/70"></div>

          <div className="relative z-10 flex items-center h-full">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8">

              <span className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full uppercase tracking-widest text-sm font-semibold">
                About ServoraCare
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mt-6 md:mt-8 leading-[1.1]">

                Building India's
                <br />

                Trusted Home
                <span className="text-orange-400">
                  {" "}Service Platform
                </span>

              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-200 mt-6 md:mt-8 max-w-3xl leading-7 md:leading-9">

                ServoraCare connects homeowners with trusted,
                verified and skilled professionals using
                technology, transparency and exceptional service.

              </p>

              <button
                onClick={() => navigate("/book-service")}
                className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold transition shadow-lg"
              >
                Book a Service
              </button>

            </div>
          </div>
        </section>


        {/* =====================================================
            WHO WE ARE
        ===================================================== */}

        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-24">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>

              <span className="text-orange-500 uppercase tracking-widest font-bold text-sm">
                About Us
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mt-3 mb-6">
                Who We Are
              </h2>

              <p className="text-gray-700 leading-8 text-lg">
                ServoraCare is a technology-driven home service
                platform connecting homeowners with skilled and
                verified professionals for electrical, plumbing,
                AC repair, CCTV installation, appliance servicing,
                painting, cleaning and many other household services.
              </p>

              <p className="mt-6 text-gray-700 leading-8 text-lg">
                We combine skilled technicians, transparent pricing,
                secure digital booking and customer support to
                deliver a seamless service experience.
              </p>

            </div>

            <div>

              <img
                src={heroImage}
                className="rounded-3xl shadow-xl w-full"
                alt="Professional home services by ServoraCare"
                loading="lazy"
              />

            </div>

          </div>


          {/* =================================================
              OUR STORY
          ================================================= */}

          <section className="mt-24">

            <div className="text-center mb-12">

              <span className="text-orange-500 uppercase tracking-widest font-bold text-sm">
                Our Journey
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mt-3">
                Our Story
              </h2>

            </div>

            <div className="grid lg:grid-cols-2 gap-14 items-center">

              <div>

                <img
                  src={StoryImage}
                  className="rounded-3xl shadow-2xl w-full"
                  alt="ServoraCare home service story"
                  loading="lazy"
                />

              </div>

              <div>

                <p className="text-gray-700 text-lg leading-9">
                  ServoraCare was founded with one simple belief —
                  finding reliable home service professionals should
                  be easy, transparent and stress-free.
                </p>

                <p className="mt-8 text-gray-700 text-lg leading-9">
                  Our platform connects verified technicians with
                  customers through a seamless digital experience,
                  ensuring quality, safety and trust in every service.
                </p>

                <p className="mt-8 text-gray-700 text-lg leading-9">
                  From electrical work and plumbing to AC repair,
                  CCTV installation and appliance servicing,
                  ServoraCare aims to become India's most trusted
                  technology-driven home service company.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              MISSION & VISION
          ================================================= */}

          <div className="grid md:grid-cols-2 gap-8 mt-24">

            {/* Mission */}

            <div className="bg-blue-900 text-white rounded-3xl p-10 shadow-xl">

              <div className="text-4xl mb-5">
                🚀
              </div>

              <h2 className="text-3xl font-bold mb-5">
                Our Mission
              </h2>

              <p className="leading-8 text-lg text-blue-100">
                To simplify home maintenance by delivering
                trusted, affordable and high-quality services
                through technology while empowering skilled
                professionals across India.
              </p>

            </div>


            {/* Vision */}

            <div className="bg-orange-500 text-white rounded-3xl p-10 shadow-xl">

              <div className="text-4xl mb-5">
                🌍
              </div>

              <h2 className="text-3xl font-bold mb-5">
                Our Vision
              </h2>

              <p className="leading-8 text-lg text-orange-50">
                To become India's most trusted digital home
                service platform by setting new standards
                in customer experience, innovation and
                professional excellence.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            FOUNDER SECTION
        ===================================================== */}

        <section className="bg-slate-50 py-20 md:py-24">

          <div className="max-w-7xl mx-auto px-6 sm:px-8">

            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Founder Image */}

              <div className="flex justify-center">

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-[360px]">

                  <img
                    src={profilePhoto}
                    alt="Boby Singh - Founder and CEO of ServoraCare"
                    className="w-full h-[480px] object-cover"
                    loading="lazy"
                  />

                  <div className="bg-blue-900 text-white text-center py-6">

                    <h3 className="text-3xl font-bold">
                      Boby Singh
                    </h3>

                    <p className="text-orange-300 mt-2 text-lg">
                      Founder & CEO
                    </p>

                  </div>

                </div>

              </div>


              {/* Founder Message */}

              <div>

                <span className="uppercase tracking-widest text-orange-500 font-semibold">
                  Leadership
                </span>

                <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mt-3 mb-8">
                  Message From Our Founder
                </h2>

                <p className="text-gray-700 text-lg leading-9">
                  ServoraCare was founded with a simple vision—to
                  make trusted home services easily accessible
                  for every family. We believe customers deserve
                  professional service, transparent pricing and
                  complete peace of mind.
                </p>

                <p className="mt-8 text-gray-700 text-lg leading-9">
                  By combining technology with skilled professionals,
                  we are creating a platform where homeowners receive
                  dependable services while technicians gain meaningful
                  employment opportunities.
                </p>

                <p className="mt-8 text-gray-700 text-lg leading-9">
                  Our commitment is to build one of India's most
                  trusted home service brands through innovation,
                  integrity, customer satisfaction and operational
                  excellence.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            CORE VALUES
        ===================================================== */}

        <section className="bg-white py-20 md:py-24">

          <div className="max-w-7xl mx-auto px-6 sm:px-8">

            <div className="text-center">

              <span className="text-orange-500 uppercase tracking-widest font-bold text-sm">
                What We Believe
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mt-3">
                Our Core Values
              </h2>

              <p className="text-center text-gray-600 mt-5 max-w-3xl mx-auto text-lg">
                The principles that guide every decision and
                every service we deliver.
              </p>

            </div>


            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

              {/* Trust */}

              <div className="bg-slate-50 rounded-2xl shadow-lg p-10 text-center hover:-translate-y-2 transition">

                <div className="text-4xl mb-5">
                  🤝
                </div>

                <h3 className="text-2xl font-bold text-blue-900">
                  Trust
                </h3>

                <p className="mt-4 text-gray-600">
                  Verified professionals with complete transparency.
                </p>

              </div>


              {/* Quality */}

              <div className="bg-slate-50 rounded-2xl shadow-lg p-10 text-center hover:-translate-y-2 transition">

                <div className="text-4xl mb-5">
                  ⭐
                </div>

                <h3 className="text-2xl font-bold text-blue-900">
                  Quality
                </h3>

                <p className="mt-4 text-gray-600">
                  Consistent service standards and customer satisfaction.
                </p>

              </div>


              {/* Innovation */}

              <div className="bg-slate-50 rounded-2xl shadow-lg p-10 text-center hover:-translate-y-2 transition">

                <div className="text-4xl mb-5">
                  💡
                </div>

                <h3 className="text-2xl font-bold text-blue-900">
                  Innovation
                </h3>

                <p className="mt-4 text-gray-600">
                  Technology-driven solutions for modern households.
                </p>

              </div>


              {/* Integrity */}

              <div className="bg-slate-50 rounded-2xl shadow-lg p-10 text-center hover:-translate-y-2 transition">

                <div className="text-4xl mb-5">
                  🛡️
                </div>

                <h3 className="text-2xl font-bold text-blue-900">
                  Integrity
                </h3>

                <p className="mt-4 text-gray-600">
                  Honest pricing, ethical practices and accountability.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="bg-blue-900 text-white py-20 md:py-24">

          <div className="max-w-5xl mx-auto text-center px-6">

            <span className="text-orange-300 uppercase tracking-widest font-semibold">
              ServoraCare
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Ready to Experience Professional Home Services?
            </h2>

            <p className="mt-6 text-lg md:text-xl text-blue-100">
              Book trusted professionals with ServoraCare and enjoy
              reliable, safe and hassle-free home services.
            </p>

            <button
              onClick={() => navigate("/book-service")}
              className="mt-10 bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-xl text-lg font-semibold transition shadow-lg"
            >
              Book a Service
            </button>

          </div>

        </section>

      </div>
    </>
  );
}

export default About;