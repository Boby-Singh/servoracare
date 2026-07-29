import profilePhoto from "../assets/profile.jpg";

function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/about-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-blue-950/70"></div>

        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-8">

            <span className="bg-orange-500 text-white px-6 py-2 rounded-full uppercase tracking-widest text-sm font-semibold">
              ABOUT SERVORACARE
            </span>

            <h1 className="text-6xl md:text-7xl font-extrabold text-white mt-8 leading-tight">
              Building India's
              <br />
              Trusted Home
              <span className="text-orange-400">
                {" "}Service Platform
              </span>
            </h1>

            <p className="text-xl text-gray-200 mt-8 max-w-3xl leading-9">
              ServoraCare connects homeowners with trusted,
              verified and skilled professionals using
              technology, transparency and exceptional service.
            </p>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-24">

        {/* Who We Are */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>

            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Who We Are
            </h2>

            <p className="text-gray-700 leading-8 text-lg">
              ServoraCare is a technology-driven home service platform
              connecting homeowners with skilled and verified
              professionals for electrical, plumbing, AC repair,
              CCTV installation, appliance servicing, painting,
              cleaning and many other household services.
            </p>

            <p className="mt-6 text-gray-700 leading-8 text-lg">
              We combine skilled technicians, transparent pricing,
              secure digital booking and customer support to
              deliver a seamless service experience.
            </p>

          </div>

          <div>

            <img
              src="/home-service.jpg"
              className="rounded-3xl shadow-xl"
              alt="Home Service"
            />

          </div>

        </div>

        {/* Our Story */}
        <section className="mt-24">

          <h2 className="text-5xl font-bold text-blue-900 mb-10 text-center">
            Our Story
          </h2>

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>

              <img
                src="/about-story.jpg"
                className="rounded-3xl shadow-2xl"
                alt="Our Story"
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

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mt-24">

          {/* Mission */}
          <div className="bg-blue-900 text-white rounded-3xl p-10 shadow-xl">

            <h2 className="text-3xl font-bold mb-5">
              🚀 Our Mission
            </h2>

            <p className="leading-8 text-lg">
              To simplify home maintenance by delivering
              trusted, affordable and high-quality services
              through technology while empowering skilled
              professionals across India.
            </p>

          </div>

          {/* Vision */}
          <div className="bg-orange-500 text-white rounded-3xl p-10 shadow-xl">

            <h2 className="text-3xl font-bold mb-5">
              🌍 Our Vision
            </h2>

            <p className="leading-8 text-lg">
              To become India's most trusted digital
              home service platform by setting new standards
              in customer experience, innovation and
              professional excellence.
            </p>

          </div>

        </div>

      </div>

      {/* Founder Section */}
      <div className="max-w-7xl mx-auto px-8 mt-20">

        {/* Keep your founder section here */}

      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-8 mt-20">

          <img
              src={profilePhoto}
              alt="Founder"
              className="w-[320px] h-[420px] object-cover rounded-lg shadow-2xl"
          />
          <div className="p-6 text-center">

              <h2 className="text-2xl font-bold text-blue-900">
                  Boby Singh
              </h2>

              <p className="text-orange-500 font-semibold mt-2">
                  Founder & CEO
              </p>

          </div>
           <div className="md:col-span-2">

              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                  Message From Our Founder
              </h2>

              <p className="text-gray-700 text-lg leading-8">

                  At ServoraCare, our vision is to redefine how
                  households access trusted professional services.
                  We believe every family deserves safe, affordable,
                  and reliable home solutions delivered with complete
                  transparency.

              </p>

              <p className="mt-6 text-gray-700 text-lg leading-8">

                  Our goal is to empower skilled technicians with
                  digital opportunities while ensuring customers
                  receive exceptional service quality every time.

              </p>

          </div>

      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-8 mt-20 mb-20">

        {/* Keep your CTA here */}

      </div>

    </div>
  );
}

export default About;

    
