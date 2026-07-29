import profilePhoto from "../assets/profile.jpg";
import heroImage from "../assets/page.png"; 
import StoryImage from "../assets/Story.jfif"
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
              src={heroImage}
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
                src={StoryImage}
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

{/* ================= Founder Section ================= */}

<section className="max-w-7xl mx-auto px-8 py-24">

  <div className="grid lg:grid-cols-2 gap-16 items-center">

    {/* Founder Image */}

    <div className="flex justify-center">

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-[360px]">

        <img
          src={profilePhoto}
          alt="Founder"
          className="w-full h-[480px] object-cover"
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

      <h2 className="text-5xl font-bold text-blue-900 mt-3 mb-8">
        Message From Our Founder
      </h2>

      <p className="text-gray-700 text-lg leading-9">

        ServoraCare was founded with a simple vision—to make
        trusted home services easily accessible for every family.
        We believe customers deserve professional service,
        transparent pricing and complete peace of mind.

      </p>

      <p className="mt-8 text-gray-700 text-lg leading-9">

        By combining technology with skilled professionals,
        we are creating a platform where homeowners receive
        dependable services while technicians gain meaningful
        employment opportunities.

      </p>

      <p className="mt-8 text-gray-700 text-lg leading-9">

        Our commitment is to build one of India's most trusted
        home service brands through innovation, integrity,
        customer satisfaction and operational excellence.

      </p>

    </div>

  </div>

</section>

{/* ================= Core Values ================= */}

<section className="bg-gray-50 py-24">

  <div className="max-w-7xl mx-auto px-8">

    <h2 className="text-5xl font-bold text-center text-blue-900">
      Our Core Values
    </h2>

    <p className="text-center text-gray-600 mt-5 max-w-3xl mx-auto text-lg">
      The principles that guide every decision and every
      service we deliver.
    </p>

    <div className="grid md:grid-cols-4 gap-8 mt-16">

      <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:-translate-y-2 transition">

        <h3 className="text-2xl font-bold text-blue-900">
          Trust
        </h3>

        <p className="mt-4 text-gray-600">
          Verified professionals with complete transparency.
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:-translate-y-2 transition">

        <h3 className="text-2xl font-bold text-blue-900">
          Quality
        </h3>

        <p className="mt-4 text-gray-600">
          Consistent service standards and customer satisfaction.
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:-translate-y-2 transition">

        <h3 className="text-2xl font-bold text-blue-900">
          Innovation
        </h3>

        <p className="mt-4 text-gray-600">
          Technology-driven solutions for modern households.
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:-translate-y-2 transition">

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

{/* ================= CTA ================= */}

<section className="bg-blue-900 text-white py-24">

  <div className="max-w-5xl mx-auto text-center px-8">

    <h2 className="text-5xl font-bold">
      Ready to Experience Professional Home Services?
    </h2>

    <p className="mt-6 text-xl text-blue-100">
      Book trusted professionals with ServoraCare and enjoy
      reliable, safe and hassle-free home services.
    </p>

    <button className="mt-10 bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-xl text-xl font-semibold transition">

      Book a Service

    </button>

  </div>

</section>

    </div>
  );
}

export default About;

    
